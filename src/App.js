import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { LogBox, Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";

import FullScreenChz from "react-native-fullscreen-chz";
import Purchasely, { RunningMode } from "react-native-purchasely";

import { Adjust, AdjustConfig } from "react-native-adjust";
import Navigator from "./screens/app-routes";
import store, { persistor } from "./store/configure-store";
import { networkDebugger } from "./shared/networkDebugger";
import ModalFirstPremium from "./components/modal-first-premium";
import ModalLock from "./layout/main-page/modal-lock";
import { askTrackingPermission } from "./helpers/eventTracking";
import notifee, {EventType} from '@notifee/react-native';
import messaging from "@react-native-firebase/messaging";
import { Notifications } from 'react-native-notifications';

LogBox.ignoreAllLogs();

Purchasely.startWithAPIKey(
  "c88ec51a-b7ce-485e-8192-038a120da596",
  ["Google"],
  null,
  Purchasely.logLevelDebug,
  RunningMode.FULL
);

const App =  () => {
 
  const configTracker = () => {
    const adjustConfig = new AdjustConfig(
      "6qpsj2ssc03k",
      AdjustConfig.EnvironmentSandbox
      // AdjustConfig.EnvironmentProduction,
    );
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    Adjust.create(adjustConfig);
    console.log("Finish set configtracker");
  };
 
  useEffect(async() => {
    Notifications.removeAllDeliveredNotifications();
    networkDebugger();
    if (Platform.OS === "android") {
      FullScreenChz.enable();
    } else {
      askTrackingPermission();
    }
    configTracker();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
