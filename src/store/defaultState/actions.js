import SplashScreen from 'react-native-splash-screen';
import notifee, {EventType} from '@notifee/react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';
import {
  getListQuotes,
  getListCollection,
  getListPastQuotes,
  getListLiked,
  getListCategory,
  getListFactRegister,
  updateProfile,
  getSetting,
  selectTheme,
} from '../../shared/request';
import {APP_VERSION} from '../../shared/static';
import store from '../configure-store';
import * as types from './types';
import {
  checkIsHasLogin,
  handleSubscriptionStatus,
  handleUpdateTimezone,
  reloadUserProfile,
} from '../../helpers/user';
import {handleModalFirstPremium} from '../../shared/globalContent';
import {scrollToTopQuote} from './selector';

export const setModalFirstPremium = payload => ({
  type: types.SET_MODAL_FIRST_PREMIUM,
  payload,
});

export const setModalPremium = payload => ({
  type: types.SET_MODAL_PREMIUM_VISIBILITY,
  payload,
});

export const setStorageStatus = payload => ({
  type: types.SET_STORAGE_STATUS,
  payload,
});

export const handleSetProfile = payload => ({
  type: types.SET_PROFILE_DATA,
  payload,
});

export const fetchListQuote = params => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('FETCH LIST QUOTE');
      dispatch({type: types.START_FETCH_QUOTES});
      const quote = await getListQuotes({
        length: 15,
        page: 1,
        ...params,
      });
      dispatch({
        type: types.SUCCESS_FETCH_QUOTE,
        payload: quote.data,
      });
      resolve(quote);
    } catch (err) {
      console.log('ERr fetch quote:', err);
      dispatch({type: types.ERROR_FETCH_QUOTES});
      reject(err);
    }
  });

export const fetchCollection = () => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({type: types.START_FETCH_COLLECTION});
      const collection = await getListCollection();
      dispatch({
        type: types.SUCCESS_FETCH_COLLECTION,
        payload: collection.data,
      });
      resolve(collection);
    } catch (err) {
      console.log('ERr fetch collections:', err);
      dispatch({type: types.ERROR_FETCH_COLLECTION});
      reject(err);
    }
  });

export const fetchPastQuotes = () => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({type: types.START_PAST_QUOTES});
      const pastQuote = await getListPastQuotes();
      dispatch({
        type: types.SUCCESS_PAST_QUOTES,
        payload: pastQuote.data,
      });
      resolve(pastQuote);
    } catch (err) {
      console.log('ERr fetch past quotes:', err);
      dispatch({type: types.ERROR_PAST_QUOTES});
      reject(err);
    }
  });

export const fetchListLiked = params => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({type: types.START_LIKE_QUOTE});
      const like = await getListLiked(params);
      dispatch({
        type: types.SUCCESS_LIKE_QUOTE,
        payload: like.data,
      });
      resolve(like);
    } catch (err) {
      console.log('ERr fetch past quotes:', err);
      dispatch({type: types.ERROR_LIKE_QUOTE});
      reject(err);
    }
  });

export const getInitialData = isHasLogin => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      let listFactRegister = [];
      const category = await getListCategory();
      if (!isHasLogin) {
        const resFact = await getListFactRegister();
        listFactRegister = resFact.data;
      }

      dispatch({
        type: types.SET_DEFAULT_DATA,
        categories: category.data,
        listFactRegister,
        // link: link.data,
      });
      resolve('success');
    } catch (err) {
      console.log('Err fetch data:', err);
      reject(err);
    }
  });

export const handleAppVersion = () => async dispatch => {
  const {activeVersion} = store.getState().defaultState;
  if (activeVersion !== APP_VERSION) {
    dispatch({
      type: types.SET_APP_VERSION,
      payload: APP_VERSION,
    });
  }
};

export const handleEndQuote = () => {
  store.dispatch({type: types.SET_END_REACH_QUOTE});
};

export const setQuoteRef = ref => {
  store.dispatch({type: types.SET_LIST_QUOTE_REF, payload: ref});
};

export const changeAskRatingParameter = () => {
  store.dispatch({
    type: types.CHANGE_ASK_RATING_PARAMETER,
  });
};

export const changeQuoteLikeStatus = id => {
  store.dispatch({type: types.SET_LIKE_STATUS, payload: id});
};
export const storeRegistrationData = payload => {
  store.dispatch({type: types.SET_REGISTER_STEP, payload});
};

export const showLoadingModal = () => {
  store.dispatch({
    type: types.SHOW_LOADING_MODAL,
  });
};

export const hideLoadingModal = () => {
  store.dispatch({
    type: types.HIDE_LOADING_MODAL,
  });
};

export const setCounterNumber = payload => {
  store.dispatch({
    type: types.CHANGE_COUNTER_LOADING_MODAL,
    payload,
  });
};

export const setTodayAdsLimit = payload => {
  store.dispatch(fetchListQuote({}, true));
};

export const setNewQuoteData = payload => {
  store.dispatch({
    type: types.SET_NEW_QUOTE_DATA,
    payload,
  });
};

export const resetTodayAdsLimit = payload => {
  store.dispatch({
    type: types.SET_TODAY_ADS_LIMIT,
    payload,
  });
};

export const setAnimationSlideStatus = payload => {
  store.dispatch({
    type: types.SET_ANIMATION_SLIDE_DATA,
    payload,
  });
};

export const setInitialLoaderStatus = payload => {
  store.dispatch({
    type: types.SET_INITIAL_FINISH_LOADER,
    payload,
  });
};

export const setPaywallNotification = payload => {
  store.dispatch({
    type: types.SET_PAYWALL_NOTIFICATION,
    payload,
  });
};

export const setAnimationCounter = payload => {
  store.dispatch({
    type: types.SET_ANIMATION_COUNTER,
    payload,
  });
};

const handleSelectTheme = async res => {
  const profile = store.getState().defaultState.userProfile;
  if (profile.data.themes?.length > 0) {
    if (
      res.themes.length === 0 ||
      profile.data.themes[0].id !== res.themes[0].id
    ) {
      selectTheme({
        _method: 'PATCH',
        themes: [profile.data.themes[0].id],
      });
    }
  }
};

const handleDecrementBadgeCount = () => {
  notifee
    .decrementBadgeCount()
    .then(() => notifee.getBadgeCount())
    .then(count => {
      if (checkIsHasLogin()) {
        updateProfile({
          notif_count: count,
          _method: 'PATCH',
        });
      }
    });
};

const resetNotificationBadge = isHasLogin => {
  notifee.setBadgeCount(0).then(() => {
    if (isHasLogin) {
      updateProfile({
        notif_count: 0,
        _method: 'PATCH',
      });
    }
  });
};

const handleNotificationQuote = async (res, remoteMessage, getInitialURL) => {
  let idQuote = null;
  console.log('FETCH QUOTE:', remoteMessage?.data?.id || idQuote);
  if (getInitialURL) {
    const urlArr = getInitialURL.split('/');
    if (urlArr[3]) {
      idQuote = urlArr[3];
    }
  }
  if (remoteMessage?.data?.id || idQuote) {
    await store.dispatch(
      fetchListQuote({notif: remoteMessage?.data?.id || idQuote || null}),
    );
    if (remoteMessage) {
      handleDecrementBadgeCount();
    } else {
      resetNotificationBadge();
    }
  } else {
    store.dispatch(fetchListQuote());
  }
};

const handleNotificationOpened = resProfile => {
  let isAbleToFetchQuote = true;
  notifee.onForegroundEvent(async ({type, detail}) => {
    if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
      if (detail.notification.data?.id) {
        isAbleToFetchQuote = false;
        handleDecrementBadgeCount();
        if (detail.notification.data?.id) {
          await store.dispatch(
            fetchListQuote({
              notif: detail.notification.data?.id || null,
            }),
          );
          scrollToTopQuote();
        }
      }
      // if (detail.notification.data?.type === 'paywall') {
      //   console.log('Check paywall data:', detail.notification.data);
      //   if (loadingRef.current) {
      //     setPaywallNotification(detail.notification.data);
      //     loadingRef.current = false;
      //   } else {
      //     setTimeout(() => {
      //       handlePayment(detail.notification.data?.placement);
      //     }, 1000);
      //   }
      // }
    }
  });
  setTimeout(async () => {
    if (isAbleToFetchQuote) {
      const getInitialURL = await Linking.getInitialURL();
      handleNotificationQuote(resProfile, null, getInitialURL);
    }
  }, 1000);
};

export const fetchUserLoginData = async () => {
  store.dispatch(getInitialData());
  store.dispatch(fetchCollection());
  const resProfile = await reloadUserProfile();
  handleNotificationOpened(resProfile);
  await handleSelectTheme(resProfile);
  handleSubscriptionStatus(resProfile.subscription);
  handleUpdateTimezone();
};

export const setUserTheme = payload => {
  store.dispatch({
    type: types.SET_USER_THEMES,
    payload,
  });
};

const handleSubmitPremiumStatusWeekly = async submitObj => {
  handleModalFirstPremium(true);
  const objData = JSON.stringify(submitObj);
  await AsyncStorage.setItem('freePremiumStatusWeekly', objData);
};

const handleSubmitPremiumStatusDaily = async submitObj => {
  const objData = JSON.stringify(submitObj);
  await AsyncStorage.setItem('freePremiumStatusDaily', objData);
};

const handleShowFreePremiumWeekly = async () => {
  const premiumStatus = await AsyncStorage.getItem('freePremiumStatusWeekly');
  if (premiumStatus) {
    const objStatus = JSON.parse(premiumStatus);
    if (
      (objStatus.activeDate !== moment().format('YYYY-MM-DD') &&
        objStatus.activeStatus <= 6) ||
      (objStatus.activeStatus > 7 && objStatus.activeStatus % 3 === 0)
    ) {
      const submitObj = {
        activeDate: moment().format('YYYY-MM-DD'),
        activeStatus: objStatus.activeStatus + 1,
      };
      handleSubmitPremiumStatusWeekly(submitObj);
    }
  } else {
    const submitObj = {
      activeDate: moment().format('YYYY-MM-DD'),
      activeStatus: 1,
    };
    handleSubmitPremiumStatusWeekly(submitObj);
  }
};

const handleShowFreePremiumDaily = async () => {
  const premiumStatus = await AsyncStorage.getItem('freePremiumStatusDaily');
  if (premiumStatus) {
    const objStatus = JSON.parse(premiumStatus);
    if (objStatus.activeDate !== moment().format('YYYY-MM-DD')) {
      const submitObj = {
        activeDate: moment().format('YYYY-MM-DD'),
        activeStatus: 1,
      };
      handleSubmitPremiumStatusDaily(submitObj);
    } else if (objStatus.activeStatus === 5) {
      handleModalFirstPremium(true);
      const submitObj = {
        activeDate: moment().format('YYYY-MM-DD'),
        activeStatus: objStatus.activeStatus + 1,
      };
      handleSubmitPremiumStatusDaily(submitObj);
    } else {
      const submitObj = {
        activeDate: moment().format('YYYY-MM-DD'),
        activeStatus: objStatus.activeStatus + 1,
      };
      handleSubmitPremiumStatusDaily(submitObj);
    }
  } else {
    const submitObj = {
      activeDate: moment().format('YYYY-MM-DD'),
      activeStatus: 1,
    };
    handleSubmitPremiumStatusDaily(submitObj);
  }
};

const getSettingData = async () => {
  const setting = await getSetting();
  if (setting.data.value !== 'true') {
    handleShowFreePremiumWeekly();
    handleShowFreePremiumDaily();
  }
};

export const fetchInitialData = async isHasLogin => {
  resetNotificationBadge(isHasLogin);
  if (isHasLogin) {
    await fetchUserLoginData();
    SplashScreen.hide();
    await getSettingData();
    setAnimationSlideStatus(true);
  } else {
    await store.dispatch(getInitialData(false));
    SplashScreen.hide();
  }
};
