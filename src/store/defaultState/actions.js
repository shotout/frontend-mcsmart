import { APP_VERSION } from '../../shared/static';
import store from '../configure-store';
import * as types from './types';

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

export const setUserTheme = payload => {
  store.dispatch({
    type: types.SET_USER_THEMES,
    payload,
  });
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

export const getInitialData = callbackError => async dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      // const feeling = await getlistFeel();
      // const getWay = await getListWays();
      // const area = await getListArea();
      // const category = await getListGroup();
      // const theme = await getListTheme();
      // const link = await getListLink();
      dispatch({
        type: types.SET_DEFAULT_DATA,
        // feeling: feeling.data,
        // ways: getWay.data,
        // areas: area.data,
        // categories: category.data,
        // themes: theme.data,
        // link: link.data,
      });
      // const preloadTheme = [];
      // if (category.data?.category?.length > 0) {
      //   category.data.category.forEach(item => {
      //     if (item.categories?.length > 0) {
      //       item.categories.forEach(sub => {
      //         preloadTheme.push({uri: `${BACKEND_URL}${sub.icon.url}`});
      //       });
      //     }
      //   });
      // }
      // FastImage.preload(preloadTheme);
      resolve('success');
    } catch (err) {
      if (typeof callbackError === 'function') callbackError();
      console.log('Err fetch data:', err);
      reject(err);
    }
  });

export const handleAppVersion = () => async dispatch => {
  dispatch({
    type: types.SET_APP_VERSION,
    payload: APP_VERSION,
  });
};