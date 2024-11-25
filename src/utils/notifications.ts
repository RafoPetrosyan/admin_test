import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export const getMessagingToken = async () => {
   try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
   } catch (error) {
      console.error('Error fetching FCM token:', error);
   }
};

export const requestNotificationPermission = async () => {
   if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
         try {
            const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
               {
                  title: 'Notification Permission',
                  message: 'This app needs permission to show notifications.',
                  buttonPositive: 'OK',
               },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               console.log('Notification permission granted.');
            } else {
               console.log('Notification permission denied.');
            }
         } catch (error) {
            console.error('Error requesting notification permission:', error);
         }
      } else {
         console.log(
            'Notification permission is automatically granted for Android versions below 13.',
         );
      }
   } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
         console.log('User granted messaging permission!');
      } else {
         console.log('User denied messaging permission!');
      }
   }
};
