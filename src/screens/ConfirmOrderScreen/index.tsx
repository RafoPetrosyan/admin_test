import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../../constants/colors.ts';
import { ScreenProps } from '../../types';
import useContainer from './hook.ts';

const ConfirmOrderScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
   const { onSubmit, control, handleSubmit } = useContainer({ navigation, route });

   return (
      <View style={styles.container}>
         <Text style={styles.title}>հաստատել պատվերը</Text>
         <Controller
            control={control}
            name="driver"
            defaultValue="pending"
            render={({ field: { onChange, value } }) => (
               <RNPickerSelect
                  onValueChange={(value) => onChange(value)}
                  items={[
                     { label: 'Poxos', value: 'Poxos' },
                     { label: 'Simon', value: 'Simon' },
                     { label: 'Martiros', value: 'Martiros' },
                  ]}
                  value={value}
                  style={pickerSelectStyles}
                  placeholder={{
                     label: 'Ընտրեք վարորդին',
                     value: null,
                  }}
               />
            )}
         />

         <Controller
            control={control}
            name="car"
            defaultValue="pending"
            render={({ field: { onChange, value } }) => (
               <RNPickerSelect
                  onValueChange={(value) => onChange(value)}
                  items={[
                     { label: 'Ford', value: 'Ford' },
                     { label: 'Kia', value: 'Kia' },
                     { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
                  ]}
                  value={value}
                  style={pickerSelectStyles}
                  placeholder={{
                     label: 'Ընտրեք մեքենան',
                     value: null,
                  }}
               />
            )}
         />

         <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>հաստատել</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
   },
   button: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
   },
   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
   },
   errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 12,
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

export default ConfirmOrderScreen;
