import {
    getInitialData,
    handleAppVersion,
  } from '../../store/defaultState/actions';
  
  export default dispatch => ({
    getInitialData: (...args) => dispatch(getInitialData(...args)),
    handleAppVersion: (...args) => dispatch(handleAppVersion(...args)),
  });
  