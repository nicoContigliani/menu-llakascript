import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

// Definimos la interfaz del estado de usuario
interface UserState {
  isLoggedIn: boolean;
  user: {
    role: ReactNode;
    additionalInfo: any;
    name: string;
    email: string;
  } | null;
}

// Estado inicial de usuario
const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

// Creamos el slice de usuario
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Acción de login, con el payload como el objeto de usuario
    login: (state, action: PayloadAction<{ name: string; email: string, role: ReactNode, additionalInfo: any }>) => {
      state.isLoggedIn = true;
      state.user = action.payload;  // Asignamos el usuario al estado
    },

    // Acción de logout, que restablece el estado
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;  // Restablecemos el usuario a null
    },
  },
});

// Exportamos las acciones y el reducer
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
