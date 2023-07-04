import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import styles from './styles';
import {colors, sizing} from '../../shared/styling';
import {removeRepeat, repeatQuotes} from '../../shared/request';
import {setAnimationCounter} from '../../store/defaultState/actions';

const lightbulbIcon = require('../../assets/icons/lightbulb.png');
const searchWhiteIcon = require('../../assets/icons/search_white.png');
const lightBulbBlack = require('../../assets/icons/lightbulb_black.png');
const traceWhite = require('../../assets/icons/background_trace_white.png');
const traceYellow = require('../../assets/icons/background_trace_yellow.png');

export default function QuotesContent({
  item,
  themeUser,
  source,
  isActive,
  isAnimationStart,
  showButtonOption,
  isYellowTrace,
  onPressRating,
  handleShowInterstialAdsLearn,
}) {
  const [isRepeat, setRepeat] = useState(!!item.repeat);
  const handleRepeat = () => {
    setRepeat(!isRepeat);
    if (isRepeat) {
      removeRepeat(item.id);
    } else {
      onPressRating();
      repeatQuotes(item.id);
    }
  };
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const activeStatus = useRef(false);

  useEffect(() => {
    if (isActive && isAnimationStart) {
      runAnimation();
      activeStatus.current = true;
    } else {
      stopAnimation();
    }
  }, [isActive, isAnimationStart]);

  const runAnimation = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      counter.current += 1;
      Animated.timing(translateX, {
        toValue: -160,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        if (isAnimationStart && activeStatus.current) {
          const isStopAnimation =
            counter.current !== 0 && counter.current % 2 === 0;
          if (isStopAnimation) {
            setAnimationCounter(false);
            setTimeout(() => {
              Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start(() => {
                setTimeout(() => {
                  setTimeout(() => {
                    setAnimationCounter(true);
                  }, 100);
                  runAnimation();
                }, 3500);
              });
            });
          } else {
            runAnimation();
          }
        }
      });
    });
  };

  const openLink = async () => {
    try {
      const url = encodeURI(`https://www.google.com/search?q=${item.title}`);
      const isAvailable = await InAppBrowser.isAvailable();
      console.log('IS AVAILABLE', isAvailable, url);
      if (isAvailable) {
        const result = await InAppBrowser.open(url, {
          dismissButtonStyle: 'done',
          enableUrlBarHiding: true,
          hasBackButton: false,
          modalPresentationStyle: 'popover',
          ephemeralWebSession: false,
          showTitle: false,
          enableDefaultShare: false,
        });
        if (result.type === 'cancel') {
          setTimeout(() => {
            if (typeof handleShowInterstialAdsLearn === 'function')
              handleShowInterstialAdsLearn();
          }, 500);
        }
        console.log('Check result:', result);
      } else Linking.openURL(url);
    } catch (error) {
      console.log('ERror open browser:', error);
    }
  };

  const stopAnimation = () => {
    if (activeStatus.current) {
      activeStatus.current = false;
      setTimeout(() => {
        console.log('RESET ANIMATION');
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          console.log('SUCCESS RESET ANIMATION');

          translateX.setValue(0);
          Animated.timing(translateX).stop();
        });
      });
    }
  };

  function renderBackgroundImage() {
    if (isActive) {
      return (
        <Image
          source={source}
          style={[styles.ctnBackgroundImage, styles.ctnAbsolute]}
        />
      );
    }
    return null;
  }

  function renderButtonOption() {
    if (showButtonOption) {
      return (
        <View style={styles.ctnRowButton}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.ctnBtn, isRepeat && styles.bgYellow]}
            onPress={handleRepeat}>
            <Image
              source={isRepeat ? lightBulbBlack : lightbulbIcon}
              style={styles.imgBtn}
            />
            <Text style={[styles.txtButton, isRepeat && styles.txtBlack]}>
              Repeat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openLink}
            style={[styles.ctnBtn, styles.mgLeft]}>
            <Image source={searchWhiteIcon} style={styles.imgBtn} />
            <Text style={[styles.txtButton]}>Learn More</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  return (
    <View style={styles.ctnWrapper}>
      {renderBackgroundImage()}
      <Animated.View
        style={{
          width: '100%',
          height: sizing.getDimensionHeight(1),
          transform: [{translateY: translateX}],
        }}>
        <ImageBackground source={source} style={styles.ctnBackgroundImage}>
          <View style={styles.ctnIcon}>
            <View style={styles.quotesWrapper}>
              <View style={styles.txtQuotesWrapper}>
                <View style={styles.ctnBgTrace}>
                  <Image
                    source={isYellowTrace ? traceYellow : traceWhite}
                    style={styles.traceBg}
                  />
                </View>
                <Text
                  style={[
                    styles.ctnQuotes,
                    {
                      fontSize: themeUser.font_size
                        ? moderateScale(Number(themeUser.font_size))
                        : moderateScale(18),
                      backgroundColor: themeUser.background_color || undefined,
                      color: themeUser.text_color || colors.white,
                      fontFamily: themeUser.font_family,
                      // fontFamily: 'Iceberg-Regular',
                      textShadowColor: themeUser.text_shadow,
                      textShadowOffset: themeUser.text_shadow_offset
                        ? JSON.parse(themeUser.text_shadow_offset)
                        : undefined,
                      textShadowRadius: themeUser.text_shadow ? 10 : undefined,
                      lineHeight: themeUser.line_height
                        ? moderateScale(Number(themeUser.line_height))
                        : moderateScale(24),
                      // textShadowOffset: {width: 1, height: 1},
                    },
                  ]}>
                  {item.title}
                </Text>
                {item.author && (
                  <Text
                    style={[
                      styles.ctnQuotes,
                      {
                        backgroundColor:
                          themeUser.background_color || undefined,
                        color: themeUser.text_color || colors.white,
                        fontFamily: themeUser.font_family,
                        // fontFamily: 'Iceberg-Regular',
                        textShadowColor: themeUser.text_shadow,
                        textShadowOffset: themeUser.text_shadow_offset
                          ? JSON.parse(themeUser.text_shadow_offset)
                          : undefined,
                        textShadowRadius: themeUser.text_shadow
                          ? 10
                          : undefined,
                        lineHeight: themeUser.line_height
                          ? moderateScale(Number(themeUser.line_height))
                          : moderateScale(24),
                      },
                    ]}>
                    - {item.author}
                  </Text>
                )}
              </View>
              {renderButtonOption()}
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}
