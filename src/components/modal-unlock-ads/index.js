import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import styles from './styles';
import Button from '../button';
import {handleBasicPaywall, handlePayment} from '../../helpers/user';
import {getRewardedCategoryID} from '../../shared/static/adsId';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categoryImg = require('../../assets/icons/unlock_category.png');
const crownIcon = require('../../assets/icons/crown_icon.png');
const playIcon = require('../../assets/icons/play_black.png');
const iconClose = require('../../assets/icons/close.png');

const rewarded = RewardedAd.createForAdRequest(getRewardedCategoryID(), {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const ModalUnlockCategory = ({
  visible,
  handleUnlock,
  handleClose,
  selectedCategory,
  imgSource,
  title,
  label,
  successMessage,
}) => {
  const [loadingAds, setLoadingAds] = useState(false);

  useEffect(() => {
    console.log('rewarded.loaded')
    if (!rewarded.loaded){
      // setLoadingAds(true);
    }
  }, [200]);
  
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('LOAD ADS ModalUnlockCategory');
        setLoadingAds(false);
        rewarded.show();
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        handleUnlock();
        if (Platform.OS === 'ios') {
          Alert.alert(
            successMessage ||
              'Congrats! You have unlocked the selected Premium Category.',
            null,
            [{text: 'OK'}],
          );
        }
        handleClose(selectedCategory);
        setTimeout(() => {
          AsyncStorage.removeItem('interstial');
        }, 1000);
      },
    );

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [selectedCategory]);

  useEffect(() => {
    if (visible) {
      rewarded.load();
    }
  }, [visible]);

  function renderIconClose() {
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={handleClose}>
        <Image source={iconClose} style={styles.btnClose} />
      </TouchableOpacity>
    );
  }
  return (
    <Portal>
      <Modal
        onDismiss={handleClose}
        contentContainerStyle={{justifyContent: 'center'}}
        visible={visible}>
        <View style={styles.ctnRoot}>
          <Image source={imgSource || categoryImg} style={styles.categoryImg} />
          <View style={styles.ctnText}>
            <Text style={styles.txtTitle}>
              {title || 'Unlock\nthis category for free now'}
            </Text>
            <Text style={styles.txtDesc}>
              {label ||
                'Watch a Video to unlock this Category for Free or go Premium for full access!'}
            </Text>
          </View>
          <View style={styles.ctnBtn}>
            <Button
              type="black"
              txtStyle={styles.txtBtnStyle}
              btnStyle={[styles.btnIcon, styles.mgRight]}
              prependIcon={
                <View style={styles.ctnIcon}>
                  <Image source={crownIcon} style={styles.btnImgStyle} />
                </View>
              }
              onPress={handleBasicPaywall}
              label="Go Premium!"
            />
            <View style={styles.ctnWatch}>
              <Button
                type="yellow"
                txtStyle={styles.txtBtnStyle}
                btnStyle={styles.btnIcon}
                prependIcon={
                  <View style={styles.ctnIcon}>
                    <Image
                      source={playIcon}
                      style={[styles.btnImgStyle, styles.icnPlay]}
                    />
                  </View>
                }
                isLoading={loadingAds}
                onPress={() => {
                  AsyncStorage.setItem('interstial', 'yes');
                  if (rewarded.loaded) {
                    rewarded.show();
                  } else {
                    setLoadingAds(true);
                    rewarded.load();
                    setTimeout(() => {
                      if (rewarded.loaded) {
                        rewarded.show();
                        setLoadingAds(false);
                      }
                    }, 2000);
                  }
                }}
                label="Watch Video!"
              />
              <View style={styles.ctnFree}>
                <Text style={styles.txtFree}>FREE</Text>
              </View>
            </View>
          </View>

          {renderIconClose()}
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalUnlockCategory;
