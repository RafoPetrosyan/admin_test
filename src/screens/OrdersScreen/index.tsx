import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors.ts';
import normalize from '../../utils/normalize.ts';

type Order = {
   id: string;
   customerName: string;
   status: 'Pending' | 'Completed' | 'Cancelled';
   total: number;
};

const orders: Order[] = [
   { id: '1', customerName: 'John Doe', status: 'Pending', total: 45.0 },
   { id: '2', customerName: 'Jane Smith', status: 'Completed', total: 120.5 },
   { id: '3', customerName: 'Robert Johnson', status: 'Cancelled', total: 75.0 },
];

const OrdersScreen = () => {
   const insets = useSafeAreaInsets();

   const renderOrder = ({ item }: { item: Order }) => (
      <View style={styles.orderContainer}>
         <Text style={[styles.orderId, styles.text]}>Order ID: {item.id}</Text>
         <Text style={styles.text}>Customer: {item.customerName}</Text>
         <Text style={styles.text}>Status: {item.status}</Text>
         <Text style={styles.text}>Total: ${item.total.toFixed(2)}</Text>
      </View>
   );

   return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 5 }}>
         <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   listContainer: {
      padding: normalize(10),
   },
   orderContainer: {
      padding: normalize(15),
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
      marginBottom: normalize(10, true),
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
   },
   orderId: {
      fontWeight: 'bold',
      marginBottom: 5,
   },
   text: {
      color: COLORS.textColor,
   },
});

export default OrdersScreen;
