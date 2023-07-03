import {fetchCollection, fetchListQuote, fetchListQuoteFilter} from '../../../store/defaultState/actions';

export default dispatch => ({
  fetchListQuote: (...args) => dispatch(fetchListQuoteFilter(...args)),
});
