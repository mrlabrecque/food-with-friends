/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mrrlabrecque.foodwithfriends',
  appName: 'food-with-friends',
  webDir: 'www',
  bundledWebRuntime: true,
  server: {
    url: 'https://www.foodwithfriends.io/',
    allowNavigation: ['https://www.foodwithfriends.io:12000/api']
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#CE0B7C',
    },
    PushNotifications: {
      presentationOptions: ['alert', 'sound'],
    },
  },
};

export default config;
