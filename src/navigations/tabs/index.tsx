import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DirectionsStackScreen from '../directionsStack';
import { IS_IOS_PLATFORM } from '../../constants';
import DriverIcon from '../../assets/svg/DricerIcon';
import DriverListScreen from '../../screens/DriversScreen';
import CustomersIcon from '../../assets/svg/CustomersIcon';
import CustomersScreen from '../../screens/CustomersScreen';
import OrdersIcon from '../../assets/svg/OrdersIcon';
import OrdersScreen from '../../screens/OrdersScreen';
import DirectionsIcon from '../../assets/svg/DirectionsIcon';
import STACKS from '../../constants/stacks.ts';

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
            tabBarActiveTintColor: '#4B9CD3',
            tabBarInactiveTintColor: '#666',
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
                  <DirectionsIcon stroke={focused ? '#4B9CD3' : '#666'} width={24} height={24} />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.DRIVERS}
            component={DriverListScreen}
            options={{
               tabBarLabel: 'Վարորդներ',
               tabBarIcon: ({ focused }) => (
                  <DriverIcon stroke={focused ? '#4B9CD3' : '#666'} width={24} height={24} />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.CUSTOMERS}
            component={CustomersScreen}
            options={{
               tabBarLabel: 'հաճախորդներ',
               tabBarIcon: ({ focused }) => (
                  <CustomersIcon stroke={focused ? '#4B9CD3' : '#666'} width={24} height={24} />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.ORDERS}
            component={OrdersScreen}
            options={{
               tabBarLabel: 'Պատվերներ',
               tabBarIcon: ({ focused }) => (
                  <OrdersIcon stroke={focused ? '#4B9CD3' : '#666'} width={24} height={24} />
               ),
            }}
         />
      </Tab.Navigator>
   );
};

export default Tabs;
