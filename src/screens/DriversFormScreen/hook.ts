import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { ScreenProps } from '../../types';

function useContainer({ route, navigation }: ScreenProps) {
   const { mode, driver } = route.params || {};

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         name: driver?.name || '',
         status: driver?.status || 'active',
         rating: driver?.rating ? driver.rating.toString() : '',
      },
   });

   const onSubmit = (data: any) => {
      const newDriver = {
         id: driver?.id || Math.random().toString(36).substr(2, 9),
         name: data.name,
         status: data.status,
         rating: parseFloat(data.rating),
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

   return {
      mode,
      driver,
      onSubmit,
      control,
      handleSubmit,
      errors,
   };
}

export default useContainer;
