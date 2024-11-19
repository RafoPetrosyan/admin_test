import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './src/services/navigations.ts';
import Tabs from './src/navigations/tabs';
import { store } from './src/store/store.ts';
import { ThemeProvider } from './src/providers/ThemeProvider.tsx';

const App: React.FC = () => {
   // const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
      // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      backgroundColor: Colors.lighter,
      flex: 1,
   };

   return (
      <Provider store={store}>
         <ThemeProvider>
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
         </ThemeProvider>
      </Provider>
   );
};

export default App;


// "packageManager": "yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e"
