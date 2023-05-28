import store from '../configure-store';
import * as types from './types';

export const setStorageStatus = payload => ({
  type: types.SET_STORAGE_STATUS,
  payload,
});

export const setUserTheme = payload => {
  store.dispatch({
    type: types.SET_USER_THEMES,
    payload,
  });
};
