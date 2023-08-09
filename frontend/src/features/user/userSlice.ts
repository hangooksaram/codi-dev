import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Define a type for the slice state
export interface UserSliceState {
  id: string;
  imgUrl: string | null;
  mentorId: number | null;
  profileId: number | null;
}

// Define the initial state using that type
const initialState: UserSliceState = {
  id: "",
  imgUrl: "",
  mentorId: null,
  profileId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = Object.assign(state, action.payload);

      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
