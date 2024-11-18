import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDrivers } from './operations.ts';

export type Driver = {
   id: string;
   name: string;
   status: 'active' | 'inactive';
   rating: number;
};

interface DriversState {
   drivers: Driver[];
   loading: boolean;
}

const initialState: DriversState = {
   drivers: [],
   loading: false,
};

const driversSlice = createSlice({
   name: 'drivers',
   initialState,
   reducers: {
      setDrivers: (state, action: PayloadAction<Driver[]>) => {
         state.drivers = action.payload;
      },
      addDriver: (state, action: PayloadAction<Driver>) => {
         state.drivers.push(action.payload);
      },
      removeDriver: (state, action: PayloadAction<string>) => {
         state.drivers = state.drivers.filter((driver) => driver.id !== action.payload);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchDrivers.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchDrivers.fulfilled, (state, action: PayloadAction<Driver[]>) => {
            state.loading = false;
            state.drivers = action.payload;
         })
         .addCase(fetchDrivers.rejected, (state) => {
            state.loading = false;
         });
   },
});

export const { setDrivers, addDriver, removeDriver } = driversSlice.actions;
export default driversSlice.reducer;
