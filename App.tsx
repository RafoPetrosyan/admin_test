import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Alert, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './src/services/navigations.ts';
import Tabs from './src/navigations/tabs';
import { store } from './src/store/store.ts';
import messaging from '@react-native-firebase/messaging';
import { getMessagingToken, requestNotificationPermission } from './src/utils/notifications.ts';

const App: React.FC = () => {
   const backgroundStyle = {
      backgroundColor: Colors.lighter,
      flex: 1,
   };

   useEffect(() => {
      getMessagingToken();
      requestNotificationPermission();

      const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

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
