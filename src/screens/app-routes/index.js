import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import messaging from "@react-native-firebase/messaging";
import TimeZone from "react-native-timezone";

// Redux
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import states from "./states";
import dispatcher from "./dispatcher";

// Ref routing
import { navigationRef } from "../../shared/navigationRef";
import navigationData from "../../shared/navigationData";
import PropTypes from "prop-types";
// Screen
import WelcomePage from "../welcome-page";
import { navigationLinking } from "../../shared/navigationLinking";
import Register from "../register";
import MainPage from "../main-page";
import { getAppOpenID } from "../../shared/static/adsId";
import AdsOverlay from "../ads-overlay";
import Purchasely from "react-native-purchasely";
import {
  handleSetProfile,
  setAnimationSlideStatus,
} from "../../store/defaultState/actions";
import { iconNameToId, reloadUserProfile } from "../../helpers/user";
import DeviceInfo from "react-native-device-info";
import {
  checkDeviceRegister,
  postRegister,
  selectTheme,
  updateProfile,
} from "../../shared/request";
import store from "../../store/configure-store";

const Stack = createNativeStackNavigator();

function Routes({
  getInitialData,
  userProfile,
  handleAppVersion,
  registerData,
}) {
  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [showAdsOverlay, setAdsOverlay] = useState(false);
  const paywallStatus = useRef(null);
  const openAdsOpened = useRef(false);

  const purchaselyListener = () => {
    Purchasely.addEventListener((event) => {
      paywallStatus.current = event.name;

      if (event.name === "PRESENTATION_CLOSED") {
        setAnimationSlideStatus(true);
      }
    });

    Purchasely.addPurchasedListener((res) => {
      // User has successfully purchased a product, reload content
      console.log("User has purchased", res);
    });
  };

  useEffect(() => {
    purchaselyListener();

    return () => {
      Purchasely.removeEventListener();
    };
  }, []);

  useEffect(() => {
    getUserdata();
    // const getInitial = async () => {
    //   const resLogin = await AsyncStorage.getItem("isLogin");
    //   console.log("Check res resLogin", resLogin);
    //   if (resLogin === "yes") {
    //     setLogin(true);
    //   }
    //   setLoading(false);
    // };
    // getInitial();
  }, []);

  const getUserdata = async () => {
    const goToFirstPage = () => {
      handleAppVersion();
      setTimeout(() => {
        setLoading(false);
        // SplashScreen.hide();
        // handleDidMount();
      }, 2000);
    };
    try {
      if (userProfile?.token) {
        await reloadUserProfile();
        // const resProfile = await reloadUserProfile();
        // handleDidMount(resProfile);
      } else {
        goToFirstPage();
      }
    } catch (err) {
      DeviceInfo.getUniqueId().then(async (uniqueId) => {
        try {
          console.log("Device info running", uniqueId);
          // const fcmToken = await messaging().getToken();
          const isSetBefore = await AsyncStorage.getItem("customIcon");
          // const id = await Purchasely.getAnonymousUserId();

          try {
            const timeZone = await TimeZone.getTimeZone();
            const payload = {
              name: "User",
              anytime: null,
              often: 15,
              start: "08:00",
              end: "20:00",
              gender: "",
              feel: 6,
              ways: [6],
              areas: [1, 2, 3, 4, 5, 6, 7, 8],
              timezone: timeZone,
              fcm_token: 'ooooooooooooooooooo',
              device_id: uniqueId,
              style: iconNameToId(isSetBefore),
              purchasely_id: 'iiiiiiiiii',
            };
            const res = await postRegister(payload);
            const resp = await checkDeviceRegister({
              device_id: uniqueId,
            });

            const currentUserProfile =
              store.getState().defaultState.userProfile;
            store.dispatch(
              handleSetProfile({
                ...currentUserProfile,
                ...resp,
              })
            );
            // handleSubscriptionStatus(resp.data.subscription);
            // handlePaymentTwo("onboarding");
            if (
              resp.data.subscription.type === 1 &&
              resp.data.themes[0].id !== 6
            ) {
              await selectTheme({
                _method: "PATCH",
                themes: [6],
              });
            }
            await updateProfile({
              ...payload,
              _method: "PATCH",
            });
            setTimeout(() => {
              reloadUserProfile();
            }, 2000);
            await AsyncStorage.setItem("isFinishTutorial", "yes");
          } catch (err) {
            console.log("Error register:", err);
          }
        } catch (err) {
          console.log("Err get device info:", err);
        }
      });
      goToFirstPage;
    }
  };

  function getInitialRoute() {
    if (userProfile?.token || registerData?.registerStep === 8) {
      return "MainPage";
    }
    if (registerData) {
      return "Register";
    }
    return "WelcomePage";
  }

  if (isLoading) return null;
  return (
    <NavigationContainer ref={navigationRef} linking={navigationLinking}>
      <Stack.Navigator initialRouteName={getInitialRoute()}>
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="WelcomePage"
          component={WelcomePage}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={navigationData.noHeader.options}
          name="MainPage"
          component={MainPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

Routes.propTypes = {
  getInitialData: PropTypes.func.isRequired,
  handleAppVersion: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  activeVersion: PropTypes.any,
};

Routes.defaultProps = {
  userProfile: {},
  activeVersion: null,
};
export default connect(states, dispatcher)(Routes);
