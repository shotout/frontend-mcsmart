import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Redux
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import states from './states';
import dispatcher from './dispatcher';

// Ref routing
import {navigationRef} from '../../shared/navigationRef';
import navigationData from '../../shared/navigationData';

// Screen
import WelcomePage from '../welcome-page';
import {navigationLinking} from '../../shared/navigationLinking';
import Register from '../register';
import MainPage from '../main-page';
import {fetchInitialData} from '../../store/defaultState/actions';

const Stack = createNativeStackNavigator();

function Routes({registerData}) {
  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const getInitial = async () => {
      const resLogin = await AsyncStorage.getItem('isLogin');
      if (resLogin === 'yes') {
        setLogin(true);
      }

      fetchInitialData(resLogin === 'yes');
      setLoading(false);
    };
    getInitial();
  }, []);

  function getInitialRoute() {
    if (isLogin) {
      return 'MainPage';
      // return 'NotificationTester';
    }

    if (registerData) {
      return 'Register';
    }
    return 'WelcomePage';
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
  // userProfile: PropTypes.object,
};

Routes.defaultProps = {
  // userProfile: {},
};

export default connect(states, dispatcher)(Routes);
