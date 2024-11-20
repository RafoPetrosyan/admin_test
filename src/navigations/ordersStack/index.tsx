import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SCREENS from '../../constants/screens.ts';
import OrdersScreen from '../../screens/OrdersScreen';
import ConfirmOrderScreen from '../../screens/ConfirmOrderScreen';

type ParamList = {
   OrdersScreen: undefined;
   ConfirmOrderScreen: undefined;
};

const OrdersStack = createStackNavigator<ParamList>();

const OrdersStackScreen: React.FC = () => {
   const insets = useSafeAreaInsets();

   return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 5 }}>
         <OrdersStack.Navigator screenOptions={{ headerShown: false }}>
            <OrdersStack.Screen name={SCREENS.ORDERS} component={OrdersScreen} />
            <OrdersStack.Screen name={SCREENS.CONFIRM_ORDER} component={ConfirmOrderScreen} />
         </OrdersStack.Navigator>
      </View>
   );
};

export default OrdersStackScreen;
