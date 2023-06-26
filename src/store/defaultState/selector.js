import {createSelector} from 'reselect';

const authorizationSelector = state => state.defaultState;

export const userCredentialSelector = createSelector(
  authorizationSelector,
  defaultState => defaultState.userProfile,
);

export const scrollToTopQuote = () => {
  const refQuote = store.getState().defaultState.listQuoteRef;
  const getIndex = isUserPremium() ? 0 : 6;
  if (refQuote && refQuote.scrollToOffset) {
    refQuote.scrollToOffset({
      animated: false,
      offset: sizing.getDimensionHeight(getIndex),
    });
  }
};