import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DirectionsStackScreen from '../directionsStack';
import { IS_IOS_PLATFORM } from '../../constants';
import DriverIcon from '../../assets/svg/DricerIcon';
import CustomersIcon from '../../assets/svg/CustomersIcon';
import OrdersIcon from '../../assets/svg/OrdersIcon';
import OrdersScreen from '../../screens/OrdersScreen';
import DirectionsIcon from '../../assets/svg/DirectionsIcon';
import STACKS from '../../constants/stacks.ts';
import DriversStackScreen from '../driversStack';
import CustomersScreen from '../../screens/CustomersScreen';
import COLORS from '../../constants/colors.ts';

type RootTabParamList = {
   Directions: undefined;
   Drivers: undefined;
   Customers: undefined;
   Orders: undefined;
   Notifications: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const Tabs: React.FC = () => {
   return (
      <Tab.Navigator
         screenOptions={() => ({
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textColor,
            tabBarStyle: { height: IS_IOS_PLATFORM ? 85 : 55, paddingBottom: 10 },
            tabBarLabelStyle: { fontSize: 12 },
         })}
      >
         <Tab.Screen
            name={STACKS.DIRECTIONS}
            component={DirectionsStackScreen}
            options={{
               tabBarLabel: 'Ուղղություններ',
               tabBarIcon: ({ focused }) => (
                  <DirectionsIcon
                     stroke={focused ? COLORS.primary : COLORS.textColor}
                     width={24}
                     height={24}
                  />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.DRIVERS}
            component={DriversStackScreen}
            options={{
               tabBarLabel: 'Վարորդներ',
               tabBarIcon: ({ focused }) => (
                  <DriverIcon
                     stroke={focused ? COLORS.primary : COLORS.textColor}
                     width={24}
                     height={24}
                  />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.CUSTOMERS}
            component={CustomersScreen}
            options={{
               tabBarLabel: 'հաճախորդներ',
               tabBarIcon: ({ focused }) => (
                  <CustomersIcon
                     stroke={focused ? COLORS.primary : COLORS.textColor}
                     width={24}
                     height={24}
                  />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.ORDERS}
            component={OrdersScreen}
            options={{
               tabBarLabel: 'Պատվերներ',
               tabBarIcon: ({ focused }) => (
                  <OrdersIcon
                     stroke={focused ? COLORS.primary : COLORS.textColor}
                     width={24}
                     height={24}
                  />
               ),
            }}
         />
      </Tab.Navigator>
   );
};

export default Tabs;
