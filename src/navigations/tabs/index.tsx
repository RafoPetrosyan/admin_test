import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SchedulesStackScreen from '../schedulesStack';
import { IS_IOS_PLATFORM } from '../../constants';
import CarIcon from '../../assets/svg/CarIcon';
import CustomersIcon from '../../assets/svg/CustomersIcon';
import OrdersIcon from '../../assets/svg/OrdersIcon';
import DirectionsIcon from '../../assets/svg/DirectionsIcon';
import STACKS from '../../constants/stacks.ts';
import DriversStackScreen from '../driversStack';
import CarsStackScreen from '../carsStack';
import COLORS from '../../constants/colors.ts';
import OrdersStackScreen from '../ordersStack';
import ReviewsScreen from '../../screens/ReviewsScreen';

type RootTabParamList = {
   Schedule: undefined;
   Drivers: undefined;
   Cars: undefined;
   Orders: undefined;
   Reviews: undefined;
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
            tabBarLabelStyle: { fontSize: 10 },
         })}
      >
         <Tab.Screen
            name={STACKS.ORDERS}
            component={OrdersStackScreen}
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
         <Tab.Screen
            name={STACKS.SCHEDULE}
            component={SchedulesStackScreen}
            options={{
               tabBarLabel: 'Ժամանակացույց',
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
                  <CustomersIcon
                     stroke={focused ? COLORS.primary : COLORS.textColor}
                     width={24}
                     height={24}
                  />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.CARS}
            component={CarsStackScreen}
            options={{
               tabBarLabel: 'Մեքենաներ',
               tabBarIcon: ({ focused }) => (
                  <CarIcon
                     stroke={focused ? COLORS.primary : COLORS.textColor}
                     width={24}
                     height={24}
                  />
               ),
            }}
         />
         <Tab.Screen
            name={STACKS.REVIEWS}
            component={ReviewsScreen}
            options={{
               tabBarLabel: 'Կարծիքներ',
               tabBarIcon: ({ focused }) => (
                  <CarIcon
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
