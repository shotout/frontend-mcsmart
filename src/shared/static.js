// Prod version
//export const BACKEND_URL = 'https://backend-api.mcsmartapp.com';
//export const API_URL = 'https://backend-api.mcsmartapp.com/api/v1';

// dev version
export const BACKEND_URL = 'https://backend-api-dev.mcsmartapp.com';
export const API_URL = 'https://backend-api-dev.mcsmartapp.com/api/v1';

export const APP_VERSION = '1.0.3';
export const STORE = {
  playstore: 'https://play.google.com/store/apps/details?id=apps.mcsmart&pli=1',
  appstore: 'https://apps.apple.com/us/app/mcsmart/id1658465230',
};
export const downloadText = `I found this fact on the McSmart App. Download now for the best facts:\n\nPlaystore: ${STORE.playstore}\nAppstore: ${STORE.appstore}`;

export const STORAGE_STATUS = {
  loading: 'LOADING',
  rehydrated: 'REHYDRATED',
};
