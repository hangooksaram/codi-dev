import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Define a type for the slice state
export interface UserSliceState {
  id?: string;
  isMentor?: boolean;
  isProfile?: boolean;
  profileImage?: string;
}

// Define the initial state using that type
const initialState: UserSliceState = {
  id: undefined,
  isMentor: false,
  isProfile: false,
  profileImage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      const newState = { ...state, ...payload };

      return newState;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
