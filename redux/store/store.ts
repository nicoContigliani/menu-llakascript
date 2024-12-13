import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from '../slices/userSlice';
// ... importar otros reducers

export const store = configureStore({
  reducer: {
    user: userReducer
    // counter: counterReducer,
    // user: userReducer,
    // ... otros reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;