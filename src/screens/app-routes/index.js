import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Redux
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AdEventType, AppOpenAd} from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen';
import Purchasely from 'react-native-purchasely';
import {AppState, Platform, View} from 'react-native';
import states from './states';
import dispatcher from './dispatcher';

// Ref routing
import {navigationRef} from '../../shared/navigationRef';
import navigationData from '../../shared/navigationData';
import PropTypes from 'prop-types';
// Screen
import WelcomePage from '../welcome-page';
import {navigationLinking} from '../../shared/navigationLinking';
import Register from '../register';
import MainPage from '../main-page';
import {
  fetchInitialData,
  resetNotificationBadge,
  setInitialLoaderStatus,
} from '../../store/defaultState/actions';
import {getAppOpenID} from '../../shared/static/adsId';
import {handleUpdateTimezone} from '../../helpers/user';
import AdsOverlay from '../../components/ads-overlay';

const Stack = createNativeStackNavigator();

const adUnitId = getAppOpenID();

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
appOpenAd.load();

function Routes({registerData, userProfile}) {
  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [showAdsOverlay, setAdsOverlay] = useState(false);
  const openAdsOpened = useRef(false);
  const loadingRef = useRef(true);

  const paywallStatus = useRef(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const handleLoadInAppAds = async () => {
    const isFinishTutorial = await AsyncStorage.getItem('isFinishTutorial');
    if (isFinishTutorial === 'yes') {
      if (appOpenAd.loaded) {
        setAdsOverlay(true);
        appOpenAd.show();
      }
    }
  };

  useEffect(() => {
    const getInitial = async () => {
      const resLogin = await AsyncStorage.getItem('isLogin');
      if (resLogin === 'yes') {
        setLogin(true);
      }

      fetchInitialData(resLogin === 'yes', appOpenAd, loadingRef);
      setLoading(false);
    };
    getInitial();

    Purchasely.isReadyToPurchase(true);

    const unsubscribeAppOpenAds = appOpenAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdsOverlay(false);
      },
    );

    const listenerOpenApps = appOpenAd.addAdEventListener(
      AdEventType.OPENED,
      () => {
        console.log('OPEN ADS OPENED');
        SplashScreen.hide();
        setAdsOverlay(true);
        openAdsOpened.current = true;
      },
    );

    const listenerIAPAds = appOpenAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        openAdsOpened.current = false;
        setInitialLoaderStatus(true);
        if (loadingRef.current) {
          loadingRef.current = false;
        }
      },
    );

    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          resetNotificationBadge();
          handleUpdateTimezone();
        }
        if (appState.current.match('background') && nextAppState === 'active') {
          appOpenAd.load();
          if (
            paywallStatus &&
            paywallStatus.current !== 'PRESENTATION_CLOSED'
          ) {
            if (Platform.OS === 'ios') {
              handleLoadInAppAds();
            }
          } else {
            appOpenAd.load();
          }
        } else {
          paywallStatus.current = 'READY';
          appOpenAd.load();
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      },
    );

    return () => {
      subscription.remove();
      unsubscribeAppOpenAds();
      listenerOpenApps();
      listenerIAPAds();
    };
  }, []);

  function getInitialRoute() {
    if (userProfile?.token) {
      return 'MainPage';
    }
    if (registerData) {
      return 'Register';
    }
    return 'WelcomePage';
  }

  if (isLoading) return null;
  return (
    <View style={{flex: 1, position: 'relative'}}>
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
      {showAdsOverlay && <AdsOverlay />}
    </View>
  );
}

Routes.propTypes = {
  getInitialData: PropTypes.func.isRequired,
  fetchListQuote: PropTypes.func.isRequired,
  fetchCollection: PropTypes.func.isRequired,
  fetchPastQuotes: PropTypes.func.isRequired,
  handleAppVersion: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  activeVersion: PropTypes.any,
};

Routes.defaultProps = {
  userProfile: {},
  activeVersion: null,
};
export default connect(states, dispatcher)(Routes);
