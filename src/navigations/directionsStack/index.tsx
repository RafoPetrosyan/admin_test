import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DirectionsScreen from '../../screens/DirectionsScreen';
import SCREENS from '../../constants/screens.ts';
import DirectionFormScreen from '../../screens/DirectionFormScreen';

type ParamList = {
   DirectionsScreen: undefined;
   DirectionsFormScreen: undefined;
};

const DirectionsStack = createStackNavigator<ParamList>();

const DirectionsStackScreen: React.FC = () => {
   const insets = useSafeAreaInsets();

   return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 5 }}>
         <DirectionsStack.Navigator screenOptions={{ headerShown: false }}>
            <DirectionsStack.Screen name={SCREENS.DIRECTIONS} component={DirectionsScreen} />
            <DirectionsStack.Screen
               name={SCREENS.DIRECTIONS_FORM}
               component={DirectionFormScreen}
            />
         </DirectionsStack.Navigator>
      </View>
   );
};

export default DirectionsStackScreen;
