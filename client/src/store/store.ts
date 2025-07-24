import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from '../features/user/userSlice';
import formsReducer from '../features/forms/formsSlice';
import meetingReducer from '../features/forms/meetingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    forms: formsReducer, 
    meeting : meetingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
