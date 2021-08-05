// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { domain, clientId } from '../../config/auth.config.json';
import config from '../../capacitor.config';
export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: `${config.appId}://foodwithfriends.us.auth0.com/capacitor/${config.appId}/callback`
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
