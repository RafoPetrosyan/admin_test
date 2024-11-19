import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../../constants/colors.ts';
import { ScreenProps } from '../../types';
import useContainer from './hook.ts';

const DirectionFormScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
   const {
      onSubmit,
      control,
      formatTimeTo24Hours,
      openDatePicker,
      handleSubmit,
      openTimePicker,
      formattedTime,
      setOpenDatePicker,
      setOpenTimePicker,
      errors,
      mode,
      date,
      setDate,
      setValue,
      time,
      setTime,
      setFormattedTime,
   } = useContainer({ navigation, route });

   return (
      <View style={styles.container}>
         <Text style={styles.title}>
            {mode === 'create' ? 'Ստեղծել նոր երթուղի' : 'Թարմացնել երթուղին'}
         </Text>

         {/* Route Input */}
         <Controller
            control={control}
            name="route"
            defaultValue=""
            rules={{ required: 'Երթուղին պարտադիր է' }}
            render={({ field: { onChange, value } }) => (
               <TextInput
                  placeholder="Երթուղին"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />
         {errors.route?.message && (
            <Text style={styles.errorText}>
               {typeof errors.route.message === 'string' ? errors.route.message : ''}
            </Text>
         )}

         {/* Date Picker */}
         <TouchableOpacity style={styles.input} onPress={() => setOpenDatePicker(true)}>
            <Text>{date ? date.toDateString() : 'Ընտրեք ամսաթիվ'}</Text>
         </TouchableOpacity>
         <DatePicker
            modal
            open={openDatePicker}
            date={date}
            mode="date"
            onConfirm={(selectedDate) => {
               setOpenDatePicker(false);
               setDate(selectedDate);
               setValue('date', selectedDate);
            }}
            onCancel={() => setOpenDatePicker(false)}
         />

         {/* Time Picker */}
         <TouchableOpacity style={styles.input} onPress={() => setOpenTimePicker(true)}>
            <Text>{formattedTime || 'Ընտրեք ժամանակ'}</Text>
         </TouchableOpacity>
         <DatePicker
            modal
            open={openTimePicker}
            date={time}
            mode="time"
            locale="en_GB"
            is24hourSource="locale"
            onConfirm={(selectedTime) => {
               console.log(selectedTime, 'selectedTime');
               setOpenTimePicker(false);
               setTime(selectedTime);
               setFormattedTime(formatTimeTo24Hours(selectedTime));
               setValue('time', selectedTime);
            }}
            onCancel={() => setOpenTimePicker(false)}
         />

         {/* Status Dropdown */}
         <Controller
            control={control}
            name="status"
            defaultValue="pending"
            render={({ field: { onChange, value } }) => (
               <RNPickerSelect
                  onValueChange={(value) => onChange(value)}
                  items={[
                     { label: 'Pending', value: 'pending' },
                     { label: 'Completed', value: 'completed' },
                     { label: 'Cancelled', value: 'cancelled' },
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

         <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>{mode === 'create' ? 'Ստեղծել' : 'Թարմացնել'}</Text>
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
   input: {
      borderWidth: 1,
      borderColor: COLORS.borderColor,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      backgroundColor: '#fff',
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

export default DirectionFormScreen;
