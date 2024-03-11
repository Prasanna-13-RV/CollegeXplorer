import {configureStore} from '@reduxjs/toolkit';
import basketSlice from './slices/basketSlice';
import resturantSlice from './slices/resturantSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    resturant: resturantSlice,
    user:userSlice
  },
});
