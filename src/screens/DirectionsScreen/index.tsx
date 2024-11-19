import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import COLORS from '../../constants/colors.ts';
import SCREENS from '../../constants/screens.ts';
import { ScreenProps } from '../../types';
import normalize from '../../utils/normalize.ts';

type Direction = {
   id: string;
   route: string;
   date: string;
   time: string;
   status: 'onRoute' | 'completed' | 'pending';
};

const initialDirections: Direction[] = [
   {
      id: '1',
      route: 'San Francisco to Oakland',
      date: '2024-11-15',
      time: '2024-11-19T10:00:00.000Z',
      status: 'onRoute',
   },
   {
      id: '2',
      route: 'Downtown to Airport',
      date: '2024-11-14',
      time: '2024-11-19T10:00:00.000Z',
      status: 'completed',
   },
   {
      id: '3',
      route: 'Station to Mall',
      date: '2024-11-19T10:00:00.000Z',
      time: '03:45 PM',
      status: 'pending',
   },
];

const DirectionsScreen: React.FC<ScreenProps> = ({ navigation }) => {
   const [directions, setDirections] = useState<Direction[]>(initialDirections);

   const handleCreateDirection = () => {
      navigation.navigate(SCREENS.DIRECTIONS_FORM, { mode: 'create' });
   };

   const handleUpdateDirection = (direction: Direction) => {
      navigation.navigate(SCREENS.DIRECTIONS_FORM, { mode: 'update', direction });
   };

   const handleDeleteDirection = (id: string) => {
      Alert.alert('Հաստատեք', 'Ցանկանում եք Հեռացնել այս երթուղին?', [
         {
            text: 'Չեղարկել',
            style: 'cancel',
         },
         {
            text: 'Հեռացնել',
            onPress: () => {
               setDirections((prevDirections) => prevDirections.filter((item) => item.id !== id));
            },
         },
      ]);
   };

   const renderDirection = ({ item }: { item: Direction }) => (
      <View style={styles.directionContainer}>
         <Text style={[styles.text, styles.routeText]}>Երթուղին: {item.route}</Text>
         <Text style={styles.text}>Ամսաթիվ: {item.date}</Text>
         <Text style={styles.text}>Ժամ: {item.time}</Text>
         <Text style={styles.text}>
            Կարգավիճակ:
            <Text style={[styles.text, getStatusStyle(item.status)]}>
               {getStatusText(item.status)}
            </Text>
         </Text>
         <View style={styles.buttonContainer}>
            <TouchableOpacity
               style={styles.updateButton}
               onPress={() => handleUpdateDirection(item)}
            >
               <Text style={styles.buttonText}>Թարմացնել</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.deleteButton}
               onPress={() => handleDeleteDirection(item.id)}
            >
               <Text style={styles.buttonText}>Հեռացնել</Text>
            </TouchableOpacity>
         </View>
      </View>
   );

   return (
      <View style={{ flex: 1 }}>
         <TouchableOpacity style={styles.createButton} onPress={handleCreateDirection}>
            <Text style={styles.buttonText}>Ստեղծել նոր երթուղի</Text>
         </TouchableOpacity>
         <FlatList
            data={directions}
            renderItem={renderDirection}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
         />
      </View>
   );
};

const getStatusStyle = (status: Direction['status']) => {
   switch (status) {
      case 'onRoute':
         return { color: 'orange', fontWeight: 'bold' };
      case 'completed':
         return { color: 'green', fontWeight: 'bold' };
      case 'pending':
         return { color: 'red', fontWeight: 'bold' };
      default:
         return {};
   }
};

const getStatusText = (status: Direction['status']) => {
   switch (status) {
      case 'onRoute':
         return 'Այս պահին երթուղում';
      case 'completed':
         return 'Ավարտված';
      case 'pending':
         return 'Սպասման մեջ';
      default:
         return '';
   }
};

const styles = StyleSheet.create({
   listContainer: {
      padding: normalize(10),
   },
   directionContainer: {
      padding: normalize(15),
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
   routeText: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
   },
   createButton: {
      padding: normalize(15),
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      margin: 10,
      borderRadius: 8,
   },
   buttonContainer: {
      flexDirection: 'row',
      marginTop: 10,
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

export default DirectionsScreen;
