import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import COLORS from '../../constants/colors.ts';
import { ScreenProps } from '../../types';
import useContainer from './hook.ts';

const CarsFormScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
   const { control, onSubmit, handleSubmit, errors, mode, car } = useContainer({
      route,
      navigation,
   });

   return (
      <View style={styles.container}>
         <Text style={styles.title}>{mode === 'create' ? 'Ավելացնել մեքենա' : 'Թարմացնել'}</Text>

         <Controller
            name="make"
            control={control}
            rules={{ required: 'Car make is required' }}
            render={({ field: { onChange, value } }) => (
               <TextInput
                  style={[styles.input, errors.make && styles.errorBorder]}
                  placeholder="Մեքենայի արտադրողը"
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />
         {errors.make && (
            <Text style={styles.errorText}>
               {typeof errors.make.message === 'string' ? errors.make.message : ''}
            </Text>
         )}

         <Controller
            name="model"
            control={control}
            rules={{ required: 'Car model is required' }}
            render={({ field: { onChange, value } }) => (
               <TextInput
                  style={[styles.input, errors.model && styles.errorBorder]}
                  placeholder="Մեքենայի մոդելը"
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />
         {errors.model && (
            <Text style={styles.errorText}>
               {typeof errors.model.message === 'string' ? errors.model.message : ''}
            </Text>
         )}

         <Controller
            name="number"
            control={control}
            rules={{ required: 'Car number is required' }}
            render={({ field: { onChange, value } }) => (
               <TextInput
                  style={[styles.input, errors.number && styles.errorBorder]}
                  placeholder="Մեքենայի համարանիշները"
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />
         {errors.number && (
            <Text style={styles.errorText}>
               {typeof errors.number.message === 'string' ? errors.number.message : ''}
            </Text>
         )}

         <Controller
            name="seats"
            control={control}
            rules={{
               required: 'Number of seats is required',
               min: { value: 1, message: 'Seats must be at least 1' },
            }}
            render={({ field: { onChange, value } }) => (
               <TextInput
                  style={[styles.input, errors.seats && styles.errorBorder]}
                  placeholder="Նստատեղերի թիվը"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />
         {errors.seats && (
            <Text style={styles.errorText}>
               {typeof errors.seats.message === 'string' ? errors.seats.message : ''}
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

export default CarsFormScreen;
