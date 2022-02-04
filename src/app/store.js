import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../data/data_components/userSlice';
import appReducer from '../data/data_components/appSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
