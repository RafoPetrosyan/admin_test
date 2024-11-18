import { createAsyncThunk } from '@reduxjs/toolkit';
import { Driver } from './index.ts';
import httpClient from '../../services/httpClient.ts';

export const fetchDrivers = createAsyncThunk<Driver[], void>(
   'drivers/fetchDrivers',
   async (_, { rejectWithValue }) => {
      try {
         const response = await httpClient.get<Driver[]>('/projects');
         return response.data;
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   },
);
