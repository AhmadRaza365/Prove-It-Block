import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  email: string | null;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | number | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
  fullName: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.fullName = null;
      state.firstName = null;
      state.lastName = null;
      state.phoneNumber = null;
    },
  },
});

export type { AuthState };
export const { logout } = authSlice.actions;
export default authSlice.reducer;
