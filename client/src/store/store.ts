import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from '../features/user/userSlice';
import formsReducer from '../features/forms/formsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    forms: formsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
