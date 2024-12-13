import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../slices/userSlice';
import chExcelDataReducer from '../slices/chExcelDataSlice';
import { useDispatch } from 'react-redux';

// ... importar otros reducers

export const store = configureStore({
  reducer: {
    user: userReducer,
    chExcelData: chExcelDataReducer,
    // counter: counterReducer,
    // user: userReducer,
    // ... otros reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();