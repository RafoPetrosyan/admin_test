import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../../constants/colors.ts';
import { ScreenProps } from '../../types';

const DriverFormScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
   const { mode, driver } = route.params || {};

   const [name, setName] = useState(driver?.name || '');
   const [status, setStatus] = useState<'active' | 'inactive'>(driver?.status || 'active');
   const [rating, setRating] = useState(driver?.rating.toString() || '');

   const handleSubmit = () => {
      if (!name || !rating) {
         Alert.alert('Error', 'Please fill out all fields.');
         return;
      }

      const newDriver = {
         id: driver?.id || Math.random().toString(36).substr(2, 9),
         name,
         status,
         rating: parseFloat(rating),
      };

      if (mode === 'create') {
         Alert.alert('Success', 'Driver created successfully!');
         // TODO: Dispatch or update the drivers list
      } else {
         Alert.alert('Success', 'Driver updated successfully!');
         // TODO: Dispatch or update the existing driver
      }

      navigation.goBack();
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>{mode === 'create' ? 'Ավելացնել վարորդ' : 'Թարմացնել'}</Text>

         <TextInput
            style={styles.input}
            placeholder="Վարորդի անունը"
            value={name}
            onChangeText={setName}
         />

         <Picker
            selectedValue={status}
            style={styles.input}
            onValueChange={(itemValue) => setStatus(itemValue)}
         >
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Inactive" value="inactive" />
         </Picker>

         <TextInput
            style={styles.input}
            placeholder="Վարկանիշ (1-5)"
            keyboardType="numeric"
            value={rating}
            onChangeText={setRating}
         />

         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{mode === 'create' ? 'Ավելացնել' : 'Թարմացնել'}</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Չեղարկել</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: COLORS.textColor,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
      color: COLORS.textColor,
   },
   submitButton: {
      padding: 15,
      backgroundColor: COLORS.primary,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
   },
   cancelButton: {
      padding: 15,
      backgroundColor: COLORS.danger,
      borderRadius: 8,
      alignItems: 'center',
   },
   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
   },
});

export default DriverFormScreen;
