import moment from 'moment';
import {Linking} from 'react-native';

export const dateToUnix = date => moment(date).unix();
export const getFutureDate = (defaultDate, day) =>
  moment(defaultDate).add(day, 'days').format('YYYY-MM-DD');

export const openPrivacyPolicy = () => {
  Linking.openURL('https://mooti.app/privacy');
};

export const openTermsofUse = () => {
  Linking.openURL('https://mooti.app/terms');
};

export const openImprint = () => {
  Linking.openURL('https://mooti.app/imprint');
};

export const isUserPremium = () => {
  // const profile = store.getState().defaultState.userProfile;
  // const {type} = profile.data.subscription;
  // if (type === 1) {
  //   return false;
  // }
  // return true;
  console.log('isUserPremium');
  return false;
};

export const handlePayment = async (vendorId, cb) => {
  console.log('handlePayment');

  // new Promise(async (resolve, reject) => {
  //   try {
  //     eventTracking(SHOW_PAYWALL);
  //     const res = await Purchasely.presentPresentationForPlacement({
  //       placementVendorId: vendorId || 'onboarding',
  //       isFullscreen: true,
  //     });
  //     const user = store.getState().defaultState.userProfile;
  //     console.log('Check result:', res);
  //     switch (res.result) {
  //       case ProductResult.PRODUCT_RESULT_PURCHASED:
  //         console.log('Payment success', res);
  //         if (user.token) {
  //           await setSubcription({
  //             subscription_type: vendorId === 'one_month_free' ? 3 : 2,
  //             subscription_data: res,
  //           });
  //           await reloadUserProfile();
  //         }
  //         revenueTracking(res.plan.amount, res.plan.currencyCode);
  //         eventTracking(SUBSCRIPTION_START);
  //         break;
  //       case ProductResult.PRODUCT_RESULT_RESTORED:
  //         console.log('Payment restored');
  //         let message = null;
  //         if (res.plan != null) {
  //           console.log(`User purchased ${res.plan.name}`);
  //           message = res.plan.name;
  //         }

  //         eventTracking(RESTORE_PURCHASED, message);
  //         break;
  //       case ProductResult.PRODUCT_RESULT_CANCELLED:
  //         console.log('Payment cancel');
  //         break;
  //       default:
  //         break;
  //     }
  //     if (typeof cb === 'function') cb();
  //     console.log('Check res:', res);
  //     resolve(res);
  //   } catch (err) {
  //     console.log('error payment:', err);
  //   }
  // });
};
