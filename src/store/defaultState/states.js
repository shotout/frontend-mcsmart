import { STORAGE_STATUS } from "../../shared/static";
import { listTheme } from "../../shared/static-data/listTheme";
import * as types from "./types";

const INITIAL_STATE = {
  storageStatus: STORAGE_STATUS.loading,
  userProfile: {},
  userThemes: listTheme[0],
  showModalPremium: false,
  modalFirstPremium: false,
  runAnimationSlide: false,
  finishInitialLoader: false,
  paywallNotifcation: null,
  animationCounter: true,
  freeUserPremium: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_ANIMATION_COUNTER:
      return {
        ...state,
        animationCounter: action.payload,
      };
    case types.SET_PAYWALL_NOTIFICATION:
      return {
        ...state,
        paywallNotifcation: action.payload,
      };
    case types.SET_INITIAL_FINISH_LOADER:
      return {
        ...state,
        finishInitialLoader: action.payload,
      };
    case types.SET_ANIMATION_SLIDE_DATA:
      return {
        ...state,
        runAnimationSlide: action.payload,
      };
    case types.SET_MODAL_FIRST_PREMIUM:
      return {
        ...state,
        modalFirstPremium: action.payload,
      };
    case types.SET_MODAL_PREMIUM_VISIBILITY:
      return {
        ...state,
        showModalPremium: action.payload,
      };
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
