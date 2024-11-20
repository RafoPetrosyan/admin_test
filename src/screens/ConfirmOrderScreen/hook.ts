import { useForm } from 'react-hook-form';
import { ScreenProps } from '../../types';

function useContainer({ navigation, route }: ScreenProps) {
   const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm();

   const onSubmit = (data: any) => {
      console.log(data);
      navigation.goBack();
   };

   return {
      onSubmit,
      control,
      handleSubmit,
   };
}

export default useContainer;
