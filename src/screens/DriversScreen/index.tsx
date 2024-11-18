import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert, TextStyle } from 'react-native';
import COLORS from '../../constants/colors.ts';
import SCREENS from '../../constants/screens.ts';
import { ScreenProps } from '../../types';
import normalize from '../../utils/normalize.ts';

type Driver = {
   id: string;
   name: string;
   status: 'active' | 'inactive';
   rating: number;
};

const initialDrivers: Driver[] = [
   { id: '1', name: 'John Doe', status: 'active', rating: 4.5 },
   { id: '2', name: 'Jane Smith', status: 'inactive', rating: 4.8 },
   { id: '3', name: 'Michael Brown', status: 'active', rating: 4.2 },
   { id: '4', name: 'Emily Johnson', status: 'inactive', rating: 4.7 },
   { id: '5', name: 'Chris Wilson', status: 'active', rating: 4.9 },
];

const DriverListScreen: React.FC<ScreenProps> = ({ navigation }) => {
   const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);

   const handleCreateDriver = () => {
      navigation.navigate(SCREENS.DRIVERS_FORM, { mode: 'create' });
   };

   const handleUpdateDriver = (driver: Driver) => {
      navigation.navigate(SCREENS.DRIVERS_FORM, { mode: 'update', driver });
   };

   const handleDeleteDriver = (id: string) => {
      Alert.alert('Հաստատել', 'Ցանկանում եք հեռացնել վարորդին?', [
         {
            text: 'Չեղարկել',
            style: 'cancel',
         },
         {
            text: 'Հեռացնել',
            onPress: () => {
               setDrivers((prevDrivers) => prevDrivers.filter((item) => item.id !== id));
            },
         },
      ]);
   };

   const renderDriver = ({ item }: { item: Driver }) => (
      <View style={styles.driverContainer}>
         <Text style={[styles.text, styles.nameText]}>Անուն: {item.name}</Text>
         <Text style={styles.text}>
            Կարգավիճակ: <Text style={getStatusStyle(item.status)}>{item.status}</Text>
         </Text>
         <Text style={styles.text}>Վարկանիշ: {item.rating}</Text>
         <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdateDriver(item)}>
               <Text style={styles.buttonText}>Թարմացնել</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.deleteButton}
               onPress={() => handleDeleteDriver(item.id)}
            >
               <Text style={styles.buttonText}>Հեռացնել</Text>
            </TouchableOpacity>
         </View>
      </View>
   );

   return (
      <View style={{ flex: 1 }}>
         <TouchableOpacity style={styles.createButton} onPress={handleCreateDriver}>
            <Text style={styles.buttonText}>Ավելացնել նոր վարորդ</Text>
         </TouchableOpacity>
         <FlatList
            data={drivers}
            renderItem={renderDriver}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
         />
      </View>
   );
};

const getStatusStyle = (status: Driver['status']): TextStyle => {
   switch (status) {
      case 'active':
         return { color: 'green', fontWeight: 'bold' };
      case 'inactive':
         return { color: 'red', fontWeight: 'bold' };
      default:
         return {};
   }
};

const styles = StyleSheet.create({
   listContainer: { padding: 10 },
   driverContainer: {
      padding: 15,
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
   },
   text: {
      color: COLORS.textColor,
   },
   nameText: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: normalize(5, true),
   },
   createButton: {
      padding: normalize(15),
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      margin: normalize(10),
      borderRadius: 8,
   },
   buttonContainer: {
      flexDirection: 'row',
      marginTop: normalize(10),
   },
   updateButton: {
      flex: 1,
      padding: normalize(10),
      backgroundColor: COLORS.secondary,
      borderRadius: 5,
      alignItems: 'center',
      marginRight: 5,
   },
   deleteButton: {
      flex: 1,
      padding: normalize(10),
      backgroundColor: COLORS.danger,
      borderRadius: 5,
      alignItems: 'center',
      marginLeft: 5,
   },
   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
   },
});

export default DriverListScreen;
