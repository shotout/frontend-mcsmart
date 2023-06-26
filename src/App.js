import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {LogBox, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

import Navigator from './screens/app-routes';
import store, {persistor} from './store/configure-store';
import {networkDebugger} from './shared/networkDebugger';
import Purchasely, { RunningMode } from 'react-native-purchasely';

LogBox.ignoreAllLogs();

Purchasely.startWithAPIKey(
  'c88ec51a-b7ce-485e-8192-038a120da596',
  ['Google'],
  null,
  Purchasely.logLevelDebug,
  RunningMode.FULL,
);

const App = () => {
  useEffect(() => {
    networkDebugger();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <Navigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
