import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import COLORS from '../../constants/colors.ts';
import SCREENS from '../../constants/screens.ts';
import { ScreenProps } from '../../types';
import normalize from '../../utils/normalize.ts';

type Car = {
   id: string;
   make: string;
   model: string;
   carNumber: string;
   numberOfSeats: number;
};

const initialDrivers: Car[] = [
   { id: '1', make: 'Ford', carNumber: '010 LL 12', model: 'Escape', numberOfSeats: 7 },
   { id: '2', make: 'Kia', carNumber: '010 LL 13', model: 'Optima', numberOfSeats: 7 },
   { id: '3', make: 'Hyundai', carNumber: '010 LL 13', model: 'Sonata', numberOfSeats: 7 },
   { id: '4', make: 'Honda', carNumber: '010 LL 13', model: 'Accord', numberOfSeats: 7 },
   {
      id: '5',
      make: 'Mercedes-Benz',
      carNumber: '010 LL 13',
      model: 'E350, W212',
      numberOfSeats: 7,
   },
];

const CarsScreen: React.FC<ScreenProps> = ({ navigation }) => {
   const [drivers, setDrivers] = useState<Car[]>(initialDrivers);

   const handleCreateDriver = () => {
      navigation.navigate(SCREENS.CARS_FORM, { mode: 'create' });
   };

   const handleUpdateDriver = (car: Car) => {
      navigation.navigate(SCREENS.CARS_FORM, { mode: 'update', car });
   };

   const handleDeleteDriver = (id: string) => {
      Alert.alert('Հաստատել', 'Ցանկանում եք հեռացնել մեքենան?', [
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

   const renderDriver = ({ item }: { item: Car }) => (
      <View style={styles.driverContainer}>
         <Text style={[styles.text, styles.nameText]}>Մակնիշ: {item.make}</Text>
         <Text style={styles.text}>Մոդել: {item.model}</Text>
         <Text style={styles.text}>Համարանիշ: {item.carNumber}</Text>
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
            <Text style={styles.buttonText}>Ավելացնել նոր մեքենա</Text>
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

export default CarsScreen;
