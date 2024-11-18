import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors.ts';
import normalize from '../../utils/normalize.ts';

type Customer = {
   id: string;
   name: string;
   email: string;
   ordersCount: number;
};

const customers: Customer[] = [
   { id: '1', name: 'John Doe', email: 'john.doe@example.com', ordersCount: 5 },
   { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', ordersCount: 10 },
   { id: '3', name: 'Robert Johnson', email: 'robert.johnson@example.com', ordersCount: 3 },
];

const CustomersScreen = () => {
   const insets = useSafeAreaInsets();

   const renderCustomer = ({ item }: { item: Customer }) => (
      <View style={styles.customerContainer}>
         <Text style={[styles.customerName, styles.text]}>{item.name}</Text>
         <Text style={styles.text}>Email: {item.email}</Text>
         <Text style={styles.text}>Orders: {item.ordersCount}</Text>
      </View>
   );

   return (
      <View style={{ flex: 1, paddingTop: insets.top, paddingHorizontal: 5 }}>
         <FlatList
            data={customers}
            renderItem={renderCustomer}
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
   customerContainer: {
      padding: normalize(15),
      borderRadius: 8,
      backgroundColor: '#f1f8ff',
      marginBottom: normalize(10),
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
   },
   customerName: {
      fontWeight: 'bold',
      marginBottom: normalize(5),
   },
   text: {
      color: COLORS.textColor,
   },
});

export default CustomersScreen;
