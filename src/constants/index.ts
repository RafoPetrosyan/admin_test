import { Dimensions, Platform } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const IS_IOS_PLATFORM = Platform.OS === 'ios';
export const IS_ANDROID_PLATFORM = Platform.OS === 'android';
