import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleScreen from '../../screens/ScheduleScreen';
import SCREENS from '../../constants/screens.ts';
import ScheduleFormScreen from '../../screens/ScheduleFormScreen';

type ParamList = {
   ScheduleScreen: undefined;
   ScheduleFormScreen: undefined;
};

const SchedulesStack = createStackNavigator<ParamList>();

const SchedulesStackScreen: React.FC = () => {
   const insets = useSafeAreaInsets();

   return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 5 }}>
         <SchedulesStack.Navigator screenOptions={{ headerShown: false }}>
            <SchedulesStack.Screen name={SCREENS.SCHEDULE} component={ScheduleScreen} />
            <SchedulesStack.Screen name={SCREENS.SCHEDULE_FORM} component={ScheduleFormScreen} />
         </SchedulesStack.Navigator>
      </View>
   );
};

export default SchedulesStackScreen;
