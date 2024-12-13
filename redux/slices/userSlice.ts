import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  name: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.name = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
