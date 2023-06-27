import Wrap from "./axiosWrapper";

export const checkDeviceRegister = (data = {}) =>
  Wrap({
    url: "/auth/check-device",
    method: "POST",
    data,
  });

export const getUserProfile = () =>
  Wrap({
    url: "/user/profile",
    method: "get",
  });

export const postRegister = (data) =>
  Wrap({
    url: "/auth/register",
    method: "POST",
    data,
  });
  
export const updateProfile = (data = {}) =>
  Wrap({
    url: "/user/profile",
    method: "POST",
    data,
  });

export const setSubcription = (data = {}) =>
  Wrap({
    url: "/subscription/update",
    method: "POST",
    data,
  });

export const selectTheme = (data) =>
  Wrap({
    url: `/user/update-theme`,
    method: "POST",
    data,
  });

export const unlockByAdmob = (params = {}) =>
  Wrap({
    url: "/admob",
    method: "GET",
    params,
  });

export const updateCategory = (data) =>
  Wrap({
    url: "/user/update-category",
    method: "POST",
    data,
  });

export const getListGroup = (params = {}) =>
  Wrap({
    url: "/list/groups",
    method: "get",
    params,
  });

export const getSetting = () =>
  Wrap({
    url: `/setting/paywall`,
    method: "GET",
  });
