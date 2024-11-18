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

const DriversStack = createStackNavigator<ParamList>();

const DirectionsStackScreen: React.FC = () => {
   const insets = useSafeAreaInsets();

   return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 5 }}>
         <DriversStack.Navigator screenOptions={{ headerShown: false }}>
            <DriversStack.Screen
               name={SCREENS.DIRECTIONS}
               component={DirectionsScreen}
               options={{ title: 'Directions' }}
            />
            <DriversStack.Screen
               name={SCREENS.DIRECTIONS_FORM}
               component={DirectionFormScreen}
               options={{ title: 'Directions Form' }}
            />
         </DriversStack.Navigator>
      </View>
   );
};

export default DirectionsStackScreen;
