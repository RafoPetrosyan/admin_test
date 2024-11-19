import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../../constants/colors.ts';
import { ScreenProps } from '../../types';
import useContainer from './hook.ts';

const DriverFormScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
   const { mode, onSubmit, control, handleSubmit, errors } = useContainer({
      route,
      navigation,
   });

   return (
      <View style={styles.container}>
         <Text style={styles.title}>{mode === 'create' ? 'Ավելացնել վարորդ' : 'Թարմացնել'}</Text>

         {/* Name Input */}
         <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value } }) => (
               <TextInput
                  style={[styles.input, errors.name && styles.errorBorder]}
                  placeholder="Վարորդի անունը"
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />
         {errors.name && (
            <Text style={styles.errorText}>
               {typeof errors.name.message === 'string' ? errors.name.message : ''}
            </Text>
         )}

         {/* Status Dropdown */}
         <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value } }) => (
               <RNPickerSelect
                  onValueChange={onChange}
                  items={[
                     { label: 'Active', value: 'active' },
                     { label: 'Inactive', value: 'inactive' },
                  ]}
                  value={value}
                  style={pickerSelectStyles}
                  placeholder={{
                     label: 'Ընտրեք կարգավիճակ',
                     value: null,
                  }}
               />
            )}
         />

         {/* Rating Input */}
         <Controller
            name="rating"
            control={control}
            rules={{
               required: 'Rating is required',
               pattern: { value: /^[1-5]$/, message: 'Rating must be between 1 and 5' },
            }}
            render={({ field: { onChange, value } }) => (
               <TextInput
                  style={[styles.input, errors.rating && styles.errorBorder]}
                  placeholder="Վարկանիշ (1-5)"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />
         {errors.rating && (
            <Text style={styles.errorText}>
               {typeof errors.rating.message === 'string' ? errors.rating.message : ''}
            </Text>
         )}

         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
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
   errorBorder: {
      borderColor: COLORS.danger,
   },
   errorText: {
      color: COLORS.danger,
      marginBottom: 8,
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

const pickerSelectStyles = StyleSheet.create({
   inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: COLORS.borderColor,
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#fff',
      marginBottom: 12,
   },
   inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: COLORS.borderColor,
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#fff',
      marginBottom: 12,
   },
   placeholder: {
      color: '#999',
   },
});

export default DriverFormScreen;
