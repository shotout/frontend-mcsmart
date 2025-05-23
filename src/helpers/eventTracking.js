import {Adjust, AdjustEvent} from 'react-native-adjust';
// import analytics from '@react-native-firebase/analytics';
import {isIphone} from '../shared/devices';
import { Settings, AppEventsLogger } from 'react-native-fbsdk-next';

export const ONBOARDING_COMPLETE = 'se2bvp';
export const APP_INSTALLED = 'e6a5ns';
export const SHOW_PAYWALL = 's2ei1x';
export const FREE_TRIAL = '7ajk5x';

export const CANCEL_SUBSCRIBE_AFTER_TRIAL = '3gut9w';
export const SUBSCRIPTION_STARTED = 'nmuhaz';
export const QUOTE_SHARED = 'wt1g6g';
export const QUOTE_LIKED = 'sle19s';

export const REVENUE_TRACKING = 'p495gn';
export const OPEN_OFFER_NOTIFICATION = 'idgcal';

const getScreenName = id => {
  switch (id) {
    case OPEN_OFFER_NOTIFICATION:
      return 'OPEN_OFFER_NOTIFICATION';
    case ONBOARDING_COMPLETE:
      return 'ONBOARDING_COMPLETE';
    case APP_INSTALLED:
      return 'APP_INSTALLED';
    case SHOW_PAYWALL:
      return 'SHOW_PAYWALL';
    case FREE_TRIAL:
      return 'FREE_TRIAL';
    case CANCEL_SUBSCRIBE_AFTER_TRIAL:
      return 'CANCEL_SUBSCRIBE_AFTER_TRIAL';
    case SUBSCRIPTION_STARTED:
      return 'SUBSCRIPTION_STARTED';
    case QUOTE_SHARED:
      return 'FACT_SHARED';
    case QUOTE_LIKED:
      return 'FACT_LIKED';
    case REVENUE_TRACKING:
      return 'SUBSCRIBE';
    default:
      return id;
  }
};

export const eventTracking = async (id, message) => {
 console.log('Success tracking event:',id);
  try {
    const adjustEvent = new AdjustEvent(id);
    if (message) {
      adjustEvent.setCallbackId(message);
    }
    console.log('Success tracking:', Adjust.trackEvent(adjustEvent));
    Adjust.trackEvent(adjustEvent);
    AppEventsLogger.logEvent(getScreenName(id))
    // await analytics().logEvent(getScreenName(id), {
    //   id,
    // });
   
  } catch (err) {
    console.log('Err tracking:', err);
  }
};


export const revenueTracking = async (price, currency) => {
  console.log(price, currency)
  const adjustEvent = new AdjustEvent(REVENUE_TRACKING);

  adjustEvent.setRevenue(price, currency);

  Adjust.trackEvent(adjustEvent);
  AppEventsLogger.logPurchase(price, currency, { param: price });
  // await analytics().logEvent(getScreenName(REVENUE_TRACKING), {
  //   id: REVENUE_TRACKING,
  //   item: `PRICE ${price}, currency ${currency}`,
  // });
  console.log('Revenue tracked:', price, currency);
};

export const askTrackingPermission = () => {
  if (isIphone) {
    Adjust.requestTrackingAuthorizationWithCompletionHandler(status => {
      switch (status) {
        case 0:
          // ATTrackingManagerAuthorizationStatusNotDetermined case
          console.log("The user hasn't been asked yet");
          break;
        case 1:
          // ATTrackingManagerAuthorizationStatusRestricted case
          console.log('The user device is restricted');
          break;
        case 2:
          // ATTrackingManagerAuthorizationStatusDenied case
          console.log('The user denied access to IDFA');
          break;
        case 3:
          Settings.setAdvertiserTrackingEnabled(true)
          Settings.setAdvertiserIDCollectionEnabled(true)
          Settings.setAutoLogAppEventsEnabled(true)
          // ATTrackingManagerAuthorizationStatusAuthorized case
          console.log('The user authorized access to IDFA');
          
          break;
        default:
          console.log('The status is not available');
          break;
      }
    });
  }else{
    Settings.setAdvertiserTrackingEnabled(true)
       Settings.setAdvertiserIDCollectionEnabled(true)
       Settings.setAutoLogAppEventsEnabled(true)

  }
};
