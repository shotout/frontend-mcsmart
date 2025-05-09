import Wrap from './axiosWrapper';

export const checkVersion = () =>
  Wrap({
    url: '/list/versions',
    method: 'GET',
  });

export const checkDeviceRegister = (data = {}) =>
  Wrap({
    url: '/auth/check-device',
    method: 'POST',
    data,
  });

export const getlistFeel = () =>
  Wrap({
    url: '/list/feels',
    method: 'get',
  });

export const getUserProfile = () =>
  Wrap({
    url: '/user',
    method: 'get',
  });

export const updateProfile = (data = {}) =>
  Wrap({
    url: '/user',
    method: 'POST',
    data,
  });

export const getListWays = () =>
  Wrap({
    url: '/list/ways',
    method: 'get',
  });

export const getListCategory = (params = {}) =>
  Wrap({
    url: '/list/categories',
    method: 'get',
    params,
  });

export const getListFactRegister = (params = {}) =>
  Wrap({
    url: '/quotes/filter',
    method: 'get',
    params,
  });

export const getListGroup = (params = {}) =>
  Wrap({
    url: '/list/groups',
    method: 'get',
    params,
  });

export const getListArea = (params = {}) =>
  Wrap({
    url: '/list/areas',
    method: 'get',
    params,
  });

export const postRegister = data =>
  Wrap({
    url: '/auth/register',
    method: 'POST',
    data,
  });

export const getListTheme = () =>
  Wrap({
    url: '/list/themes',
    method: 'get',
  });

export const updateCategory = data =>
  Wrap({
    url: '/category',
    method: 'POST',
    data,
  });

export const unlockByAdmob = (params = {}) =>
  Wrap({
    url: '/admob',
    method: 'GET',
    params,
  });

export const getListQuotes = (params = {}) =>
  Wrap({
    url: '/quotes',
    method: 'get',
    params,
  });

export const getNotifQuotes = (params = {}) =>
  Wrap({
    url: '/notif',
    method: 'get',
    params,
  });

export const dislikeQuotes = (data, idQuote) =>
  Wrap({
    url: `/like/${idQuote}`,
    method: 'POST',
    data,
  });

export const selectTheme = data =>
  Wrap({
    url: `/theme`,
    method: 'POST',
    data,
  });

export const getListCollection = () =>
  Wrap({
    url: '/collection',
    method: 'get',
  });

export const addNewCollection = data =>
  Wrap({
    url: '/collection',
    method: 'POST',
    data,
  });

export const addToCollection = ({idCollection, idQuote}) =>
  Wrap({
    url: `/collection/quote/${idCollection}/${idQuote}`,
    method: 'POST',
  });

export const getMyCollection = (id, params = {}) =>
  Wrap({
    url: `/collection/${id}`,
    method: 'get',
    params,
  });

export const renameCollection = (data, idCollection) => {
  Wrap({
    url: `/collection/${idCollection}`,
    method: 'POST',
    data,
  });
};

export const removeQuoteCollection = ({idCollection, idQuote}) => {
  Wrap({
    url: `/collection/quote/${idCollection}/${idQuote}`,
    method: 'DELETE',
  });
};

export const getListPastQuotes = (params = {}) =>
  Wrap({
    url: `/past-quote`,
    method: 'get',
    params,
  });

export const removePastCollection = ({idQuote}) => {
  Wrap({
    url: `/past-quote/${idQuote}`,
    method: 'DELETE',
  });
};

export const repeatQuotes = idQuote => {
  Wrap({
    url: `/repeat/${idQuote}`,
    method: 'POST',
  });
};

export const addPastQuotes = idQuote => {
  Wrap({
    url: `/past-quote/${idQuote}`,
    method: 'POST',
  });
};

export const getListLiked = (params = {}) =>
  Wrap({
    url: `/like`,
    method: 'get',
    params,
  });

export const removeLikeQuote = idQuote => {
  Wrap({
    url: `/user/like-quote/${idQuote}`,
    method: 'DELETE',
  });
};

export const getListRepeat = (params = {}) =>
  Wrap({
    url: `/repeat`,
    method: 'get',
    params,
  });

export const removeRepeat = idQuote => {
  Wrap({
    url: `/repeat/${idQuote}`,
    method: 'DELETE',
  });
};

export const getRatingStatus = () =>
  Wrap({
    url: '/rating',
    method: 'get',
  });

export const giveRating = (data = {}) =>
  Wrap({
    url: '/rating',
    method: 'POST',
    data,
  });

export const getListLink = () =>
  Wrap({
    url: '/list/links',
    method: 'get',
  });

export const setSubcription = (data = {}) =>
  Wrap({
    url: '/subscription/update',
    method: 'POST',
    data,
  });

export const deleteUserCollection = (id = null) =>
  Wrap({
    url: `/collection/${id}`,
    method: 'DELETE',
  });

export const getSetting = () =>
  Wrap({
    url: `/setting/paywall`,
    method: 'GET',
  });

export const resetBadge = (data = {}) =>
  Wrap({
    url: `/notif/reset-badge`,
    method: 'POST',
    data,
  });
