import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors.ts';
import normalize from '../../utils/normalize.ts';
import { ScreenProps } from '../../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Review = {
   id: string;
   carNumber: string;
   driverName: string;
   rating: number;
   car: string;
};

const reviews: Review[] = [
   {
      id: '1',
      carNumber: '000aa12',
      driverName: 'John Doe',
      rating: 5.0,
      car: 'Mercedes-Benz',
   },
   {
      id: '2',
      carNumber: '000aa12',
      driverName: 'Jane Smith',
      rating: 5.0,
      car: 'Mercedes-Benz',
   },
   {
      id: '3',
      carNumber: '000aa12',
      driverName: 'Robert Johnson',
      rating: 5.0,
      car: 'Mercedes-Benz',
   },
];

const ReviewsScreen: React.FC<ScreenProps> = () => {
   const insets = useSafeAreaInsets();

   const renderReview = ({ item }: { item: Review }) => (
      <View style={styles.orderContainer}>
         <Text style={[styles.orderTitle]}>Վարորդ: {item.driverName}</Text>
         <View style={styles.detailRow}>
            <Text style={styles.label}>Պետհամարանիշ:</Text>
            <Text style={styles.value}>{item.carNumber}</Text>
         </View>
         <View style={styles.detailRow}>
            <Text style={styles.label}>Մեքենա:</Text>
            <Text style={styles.value}>{item.car}</Text>
         </View>
         <View style={styles.detailRow}>
            <Text style={styles.label}>Գնահատական:</Text>
            <Text style={styles.value}>{item.rating}</Text>
         </View>
      </View>
   );

   return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
         <FlatList
            data={reviews}
            renderItem={renderReview}
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
});

export default ReviewsScreen;
