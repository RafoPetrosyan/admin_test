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
