import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';

export const getAppOpenID = () => {
  if (__DEV__) {
    return TestIds.APP_OPEN;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/5459829097';
  }
  return 'ca-app-pub-1891825795064804/1271764500';
};

export const getAdaptiveBannerID = () => {
  if (__DEV__) {
    return TestIds.GAM_BANNER;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/5998562713';
  }
  return 'ca-app-pub-1891825795064804/8992445613';
};

export const getRewardedCategoryID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/9207502414';
  }
  return 'ca-app-pub-1891825795064804/4576568782';
};

export const getRewardedOutOfQuotesID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/6581339078';
  }
  return 'ca-app-pub-1891825795064804/6616370774';
};

export const getRewardedThemeID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/4971893878';
  }
  return 'ca-app-pub-1891825795064804/7801497923';
};

export const getRewardedInsterstialID = () => {
  if (__DEV__) {
    return TestIds.INTERSTITIAL;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/5373512261';
  }
  return 'ca-app-pub-1891825795064804/6244873672';
};

export const getRewardedInsterstialLearnMoreID = () => {
  if (__DEV__) {
    return TestIds.INTERSTITIAL;
  }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/8207883533';
  }
  return 'ca-app-pub-1891825795064804/8614506820';
};