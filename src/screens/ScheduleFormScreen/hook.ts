import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScreenProps } from '../../types';

function useContainer({ navigation, route }: ScreenProps) {
   const { mode, direction } = route.params || {};
   const [date, setDate] = useState(new Date());
   const [time, setTime] = useState(new Date());
   const [formattedTime, setFormattedTime] = useState('');
   const [openDatePicker, setOpenDatePicker] = useState(false);
   const [openTimePicker, setOpenTimePicker] = useState(false);

   const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm();

   const formatTimeTo24Hours = (date: Date): string => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
   };

   useEffect(() => {
      if (mode === 'update' && direction) {
         setValue('route', direction.route);
         setValue('date', new Date(direction.date));
         setValue('time', new Date(direction.time));
         setValue('status', direction.status);
         setDate(new Date(direction.date));
         setTime(new Date(direction.time));
         setFormattedTime(formatTimeTo24Hours(new Date(direction.time)));
      }
   }, [mode, direction, setValue]);

   const onSubmit = (data: any) => {
      const payload = {
         ...data,
         date: date.toISOString(),
         time: time.toISOString(),
      };

      if (mode === 'create') {
         console.log('Creating direction:', payload);
      } else {
         console.log('Updating direction:', { id: direction.id, ...payload });
      }

      navigation.goBack();
   };

   return {
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
   };
}

export default useContainer;
