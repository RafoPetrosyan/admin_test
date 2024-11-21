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

const App: React.FC = () => {
   // const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
      // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      backgroundColor: Colors.lighter,
      flex: 1,
   };

   useEffect(() => {
      const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

      requestPermission();

      return unsubscribe;
   }, []);

   async function requestPermission() {
      const authStatus = await messaging().requestPermission();
      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
         console.log('User granted messaging permission!');
      }
   }
   return (
      <Provider store={store}>
         <View style={backgroundStyle}>
            <StatusBar
               barStyle={'dark-content'}
               // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
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

export default App;
