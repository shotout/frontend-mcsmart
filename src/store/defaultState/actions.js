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
