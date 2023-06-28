import moment from "moment";
import { Linking, Platform } from "react-native";
import Purchasely, { ProductResult } from "react-native-purchasely";
import store from "../store/configure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CANCEL_SUBSCRIBE_AFTER_TRIAL,
  FREE_TRIAL,
  SHOW_PAYWALL,
  SUBSCRIPTION_STARTED,
  eventTracking,
  revenueTracking,
} from "./eventTracking";
import { getUserProfile, setSubcription } from "../shared/request";
import { handleSetProfile } from "../store/defaultState/actions";

export const dateToUnix = (date) => moment(date).unix();
export const getFutureDate = (defaultDate, day) =>
  moment(defaultDate).add(day, "days").format("YYYY-MM-DD");

export const openPrivacyPolicy = () => {
  Linking.openURL("https://mooti.app/privacy");
};

export const openTermsofUse = () => {
  Linking.openURL("https://mooti.app/terms");
};

export const openImprint = () => {
  Linking.openURL("https://mooti.app/imprint");
};

export const handleSubscriptionStatus = async (subscription = {}) => {
  const purchaseId = await Purchasely.getAnonymousUserId();
  if (subscription.type === 2 || subscription.type === 3) {
    const trialDay = subscription.type === 2 ? 3 : 30;
    const dateEndFreeTrial = getFutureDate(subscription.started, trialDay);
    const nowaDay = moment().format("YYYY-MM-DD");
    const objPurchase = JSON.parse(subscription.purchasely_data);
    if (dateToUnix(dateEndFreeTrial) < dateToUnix(nowaDay)) {
      await setSubcription({
        subscription_type: 4,
        purchasely_id: purchaseId,
      });
      await reloadUserProfile();

      eventTracking(SUBSCRIPTION_STARTED);

      if (objPurchase) {
        revenueTracking(
          objPurchase.plan_price_in_customer_currency,
          objPurchase.customer_currency
        );
      }
    }
  }
};
export const iconNameToId = (name) => {
  switch (name) {
    case "second":
      return 2;
    case "third":
      return 3;
    case "fourth":
      return 4;
    default:
      return 1;
  }
};

export const handlePaymentTwo = async (vendorId, cb) =>
  new Promise(async (resolve, reject) => {
    try {
      const purchaseId = await Purchasely.getAnonymousUserId();
      if (vendorId === "onboarding") {
        await setSubcription({
          subscription_type: 5,
          purchasely_id: purchaseId,
        });
      }
      const user = store.getState().defaultState.userProfile;
      if (user.token) {
        await reloadUserProfile();
      }
    } catch (err) {
      console.log("error payment:", err);
    }
  });
export const isUserPremium = () => {
  const profile = store.getState().defaultState.userProfile;
  if (profile?.data != undefined) {
    const { type } = profile?.data?.subscription;
    if (type === 1 || type === 5) {
      return false;
    }
    return true;
  }
  return true;
};
export const isPremiumToday = () => {
  const { freeUserPremium } = store.getState().defaultState;
  if (isUserPremium()) {
    return true;
  }
  if (freeUserPremium) {
    return true;
  }
  return false;
};

export const reloadUserProfile = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await getUserProfile();
      const currentUserProfile = store.getState().defaultState.userProfile;
      store.dispatch(
        handleSetProfile({
          ...currentUserProfile,
          ...res,
        })
      );
      if (res.data.subscription.type !== 5) {
        if (currentUserProfile.data) {
          if (currentUserProfile.data.subscription.type !== 1) {
            if (res.data.subscription.type === 1) {
              eventTracking(CANCEL_SUBSCRIBE_AFTER_TRIAL);
            }
            if (
              currentUserProfile.data.subscription.type !==
              res.data.subscription.type
            ) {
              if (res.data.subscription.type !== 1) {
                eventTracking(SUBSCRIPTION_STARTED);
                const objPurchase = JSON.parse(
                  res.data.subscription.purchasely_data
                );
                if (objPurchase) {
                  revenueTracking(
                    objPurchase.plan_price_in_customer_currency,
                    objPurchase.customer_currency
                  );
                }
              }
            }
          }
        }
      }
      resolve(res.data);
    } catch (err) {
      reject("error get profile");
    }
  });

export const handlePayment = async (vendorId, cb) =>
  new Promise(async (resolve, reject) => {
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const getInstallDate = await AsyncStorage.getItem("firstInstall");
    const endDate = moment(getInstallDate)
      .add(1, "days")
      .format("YYYY-MM-DD HH:mm:ss");
    try {
      eventTracking(SHOW_PAYWALL);
      let stringVendor = vendorId;
      const purchaseId = await Purchasely.getAnonymousUserId();
      if (vendorId === "onboarding") {
        await setSubcription({
          subscription_type: 5,
          purchasely_id: purchaseId,
        });
      } else if (!stringVendor) {
        if (currentDate <= endDate) {
          stringVendor = "offer_no_purchase_after_onboarding_paywall";
        } else {
          stringVendor = "offer_no_purchase_after_onboarding_paywall_2nd";
        }
      }
      const res = await Purchasely.presentPresentationForPlacement({
        placementVendorId:
          currentDate <= endDate
            ? "offer_no_purchase_after_onboarding_paywall"
            : "offer_no_purchase_after_onboarding_paywall_2nd",
        isFullscreen: true,
      });
      const user = store.getState().defaultState.userProfile;
      switch (res.result) {
        case ProductResult.PRODUCT_RESULT_PURCHASED:
          console.log("siniiii");
          if (user.token) {
            await setSubcription({
              subscription_type: vendorId === "one_month_free" ? 3 : 2,
              subscription_data: res,
              purchasely_id: purchaseId,
            });
            await reloadUserProfile();
          }
          eventTracking(FREE_TRIAL);
          break;
        case ProductResult.PRODUCT_RESULT_RESTORED:
          console.log("Payment restored");
          // let message = null;
          // if (res.plan != null) {
          //   console.log(`User purchased ${res.plan.name}`);
          //   message = res.plan.name;
          // }

          eventTracking(RESTORE_PURCHASED, message);
          break;
        case ProductResult.PRODUCT_RESULT_CANCELLED:
          console.log("Payment cancel");
          if (Platform.OS === "android") {
            if (
              !vendorId ||
              vendorId === "onboarding" ||
              vendorId === "offer_no_purchase_after_onboarding_paywall"
            ) {
              // handlePayment(vendorId);
            }
          }
          // await setSubcription({
          //   subscription_type: 1,
          //   purchasely_id: purchaseId,
          // });
          break;
        default:
          break;
      }
      if (typeof cb === "function") cb();
      resolve(res);
    } catch (err) {
      console.log("error payment:", err);
    }
  });

export const handleBasicPaywall = async (cbPaywall) => {
  const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const getInstallDate = await AsyncStorage.getItem("firstInstall");
  const endDate = moment(getInstallDate)
    .add(1, "days")
    .format("YYYY-MM-DD HH:mm:ss");
  const paywallType =
    currentDate > endDate ? "in_app_paywall" : "in_app_paywall_2nd";
  await handlePayment(paywallType, cbPaywall);
};
