import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { ScreenProps } from '../../types';

function useContainer({ route, navigation }: ScreenProps) {
   const { mode, car } = route.params || {};

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         make: car?.make || '',
         model: car?.model || '',
         number: car?.carNumber || '',
         seats: car?.numberOfSeats ? car.numberOfSeats.toString() : '',
      },
   });

   const onSubmit = (data: any) => {
      const newCar = {
         id: car?.id || Math.random().toString(36).substr(2, 9),
         make: data.make,
         model: data.model,
         number: data.number,
         seats: parseInt(data.seats, 10),
      };

      if (mode === 'create') {
         Alert.alert('Success', 'Car added successfully!');
         // TODO: Dispatch or update the cars list
      } else {
         Alert.alert('Success', 'Car updated successfully!');
         // TODO: Dispatch or update the existing car
      }

      navigation.goBack();
   };

   return {
      control,
      onSubmit,
      handleSubmit,
      errors,
      mode,
      car,
   };
}

export default useContainer;
