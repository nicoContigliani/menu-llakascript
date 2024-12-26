import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: {
    _id: string;
    email: string;
    rol: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: UserState['user']; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false

    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
