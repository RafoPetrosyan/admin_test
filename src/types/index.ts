import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type ScreenProps = {
   navigation: NativeStackNavigationProp<any, any>;
   route: RouteProp<any, any>;
};
