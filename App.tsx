import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Alert, PermissionsAndroid, Platform, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './src/services/navigations.ts';
import Tabs from './src/navigations/tabs';
import { store } from './src/store/store.ts';
import messaging from '@react-native-firebase/messaging';

const App: React.FC = () => {
   const backgroundStyle = {
      backgroundColor: Colors.lighter,
      flex: 1,
   };

   const getToken = async () => {
      try {
         const token = await messaging().getToken();
         console.log('FCM Token:', token);
      } catch (error) {
         console.error('Error fetching FCM token:', error);
      }
   };

   const requestPermission = async () => {
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

   useEffect(() => {
      // Fetch and log the FCM token
      getToken();

      // Listener for messages in the foreground
      const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

      // Request permission to display notifications
      requestPermission();

      // Clean up the foreground listener
      return unsubscribe;
   }, []);

   return (
      <Provider store={store}>
         <View style={backgroundStyle}>
            <StatusBar
               barStyle={'dark-content'}
               backgroundColor={backgroundStyle.backgroundColor}
            />
            <SafeAreaProvider>
               <NavigationContainer ref={navigationRef}>
                  <Tabs />
               </NavigationContainer>
            </SafeAreaProvider>
         </View>
      </Provider>
   );
};

// Global handler for background messages
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
   console.log('Message handled in the background!', remoteMessage);
});

export default App;
