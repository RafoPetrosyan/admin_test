import { configureStore } from '@reduxjs/toolkit';
import drivers from './drivers/index.ts';

export const store = configureStore({
   reducer: {
      drivers,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
