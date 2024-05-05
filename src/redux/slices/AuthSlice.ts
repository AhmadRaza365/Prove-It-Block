import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  metaMaskAddress: string | null;
}

const initialState: AuthState = {
  metaMaskAddress: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.metaMaskAddress = null;
    },
    login: (state, action) => {
      state.metaMaskAddress = action.payload.metaMaskAddress;
    },
  },
});

export type { AuthState };
export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
