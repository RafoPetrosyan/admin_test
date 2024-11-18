import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SCREENS from '../../constants/screens.ts';
import DriversScreen from '../../screens/DriversScreen';
import DriverFormScreen from '../../screens/DriversFormScreen';

type ParamList = {
   DriversScreen: undefined;
   DriversFormScreen: undefined;
};

const DriversStack = createStackNavigator<ParamList>();

const DriversStackScreen: React.FC = () => {
   const insets = useSafeAreaInsets();

   return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 5 }}>
         <DriversStack.Navigator screenOptions={{ headerShown: false }}>
            <DriversStack.Screen name={SCREENS.DRIVERS} component={DriversScreen} />
            <DriversStack.Screen name={SCREENS.DRIVERS_FORM} component={DriverFormScreen} />
         </DriversStack.Navigator>
      </View>
   );
};

export default DriversStackScreen;
