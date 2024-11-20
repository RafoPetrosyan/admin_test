import { Alert } from 'react-native';

function useContainer() {
   const handleCancel = (id: string) => {
      Alert.alert('Հաստատեք', 'Ցանկանում եք մերժել?', [
         {
            text: 'Չեղարկել',
            style: 'cancel',
         },
         {
            text: 'Մերժել',
            onPress: () => {
               // setDirections((prevDirections) => prevDirections.filter((item) => item.id !== id));
            },
         },
      ]);
   };

   return {
      handleCancel,
   };
}

export default useContainer;
