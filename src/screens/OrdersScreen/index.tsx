import React from 'react';
import moment from 'moment';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/colors.ts';
import normalize from '../../utils/normalize.ts';
import useContainer from './hook.ts';
import { ScreenProps } from '../../types';
import SCREENS from '../../constants/screens.ts';

type Order = {
   id: string;
   customerName: string;
   phoneNumber: string;
   date: string;
   direction: string;
   type: 'Economy' | 'Comfort';
};

const orders: Order[] = [
   {
      id: '1',
      phoneNumber: 'Poxos',
      customerName: 'John Doe',
      date: '2024-11-19T10:00:00.000Z',
      direction: 'Երևան-Գյումրի',
      type: 'Comfort',
   },
   {
      id: '2',
      phoneNumber: 'Mrtiros',
      customerName: 'Jane Smith',
      date: '2024-11-19T10:00:00.000Z',
      direction: 'Երևան-Գյումրի',
      type: 'Comfort',
   },
   {
      id: '3',
      phoneNumber: 'Petros',
      customerName: 'Robert Johnson',
      date: '2024-11-19T10:00:00.000Z',
      direction: 'Երևան-Գյումրի',
      type: 'Comfort',
   },
];

const OrdersScreen: React.FC<ScreenProps> = ({ navigation }) => {
   const { handleCancel } = useContainer();

   const renderOrder = ({ item }: { item: Order }) => (
      <View style={styles.orderContainer}>
         <Text style={[styles.orderTitle]}>Ուղություն: {item.direction}</Text>
         <View style={styles.detailRow}>
            <Text style={styles.label}>Պատվիրատու:</Text>
            <Text style={styles.value}>{item.phoneNumber}</Text>
         </View>
         <View style={styles.detailRow}>
            <Text style={styles.label}>Օրը և ժամը:</Text>
            <Text style={styles.value}>{moment(item.date).format('LLL')}</Text>
         </View>
         <View style={styles.detailRow}>
            <Text style={styles.label}>Ուղևորներ:</Text>
            <Text style={styles.value}>{item.customerName}</Text>
         </View>
         <View style={styles.detailRow}>
            <Text style={styles.label}>Տեսակը:</Text>
            <Text style={styles.value}>{item.type}</Text>
         </View>
         <View style={styles.actions}>
            <TouchableOpacity
               style={styles.confirmButton}
               onPress={() => navigation.navigate(SCREENS.CONFIRM_ORDER)}
            >
               <Text style={styles.confirmText}>Հաստատել</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleCancel(item.id)}>
               <Text style={styles.deleteText}>Մերժել</Text>
            </TouchableOpacity>
         </View>
      </View>
   );

   return (
      <View style={styles.container}>
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
   container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingHorizontal: 10,
   },
   listContainer: {
      paddingVertical: normalize(10),
   },
   orderContainer: {
      padding: normalize(15),
      borderRadius: 12,
      backgroundColor: '#fff',
      marginBottom: normalize(15),
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: COLORS.borderColor,
   },
   orderTitle: {
      fontSize: normalize(18),
      fontWeight: '600',
      color: COLORS.primary,
      marginBottom: 8,
   },
   detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
   },
   label: {
      fontWeight: '500',
      color: COLORS.textColor,
   },
   value: {
      fontWeight: '400',
      color: COLORS.textSecondary,
   },
   actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
   },
   confirmButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
   },
   confirmText: {
      color: '#fff',
      fontWeight: '600',
   },
   deleteButton: {
      backgroundColor: COLORS.danger,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
   },
   deleteText: {
      color: '#fff',
      fontWeight: '600',
   },
});

export default OrdersScreen;
