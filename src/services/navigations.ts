import {
   CommonActions,
   createNavigationContainerRef,
   StackActions,
   ParamListBase,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export const navigate = (name: string, params?: Record<string, any>) => {
   if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.navigate(name, params));
   }
};

export const back = () => {
   if (navigationRef.isReady()) {
      navigationRef.goBack();
   }
};

export const replace = (name: string, params?: Record<string, any>) => {
   if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
   }
};

export const getCurrentScreen = (): string | undefined => {
   return navigationRef.isReady() ? navigationRef.getCurrentRoute()?.name : undefined;
};
