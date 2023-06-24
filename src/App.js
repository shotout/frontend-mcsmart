import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {LogBox, Platform, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

import FullScreenChz from 'react-native-fullscreen-chz';

import {Adjust, AdjustConfig} from 'react-native-adjust';
import Navigator from './screens/app-routes';
import store, {persistor} from './store/configure-store';
import {networkDebugger} from './shared/networkDebugger';
import ModalFirstPremium from './components/modal-first-premium';
import ModalLock from './layout/main-page/modal-lock';

LogBox.ignoreAllLogs();

const App = () => {
  const configTracker = () => {
    const adjustConfig = new AdjustConfig(
      '6qpsj2ssc03k',
      AdjustConfig.EnvironmentSandbox,
      // AdjustConfig.EnvironmentProduction,
    );
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    Adjust.create(adjustConfig);
    console.log('Finish set configtracker');
  };

  useEffect(() => {
    networkDebugger();
    if (Platform.OS === 'android') {
      FullScreenChz.enable();
    }
    configTracker();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <Navigator />
            <ModalFirstPremium />
            <ModalLock />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
