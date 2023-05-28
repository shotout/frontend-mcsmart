import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import styles from './styles';
import {colors} from '../../shared/styling';

export default function QuotesContent({item, themeUser, source}) {
  return (
    <ImageBackground source={source} style={styles.ctnBackgroundImage}>
      <View style={styles.ctnIcon}>
        <View style={styles.quotesWrapper}>
          <View style={styles.txtQuotesWrapper}>
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
                  },
                ]}>
                - {item.author}
              </Text>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
