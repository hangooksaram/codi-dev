import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Define a type for the slice state
export interface AuthSliceState {
  isLoggedIn: boolean | undefined;
}

// Define the initial state using that type
const initialState: AuthSliceState = {
  isLoggedIn: undefined,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      const { payload } = action;
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
