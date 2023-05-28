import {STORAGE_STATUS} from '../../shared/static';
import {listTheme} from '../../shared/static-data/listTheme';
import * as types from './types';

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
  userProfile: {},
  userThemes: listTheme[0],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_STORAGE_STATUS:
      return {
        ...state,
        storageStatus: action.payload,
      };
    case types.SET_USER_THEMES:
      return {
        ...state,
        userThemes: action.payload,
      };
    default:
      return state;
  }
};
