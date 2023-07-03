import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Define a type for the slice state
export interface WebAccessibilityState {
  zoom: number;
  highlight: boolean;
}

// Define the initial state using that type
const initialState: WebAccessibilityState = {
  zoom: 1,
  highlight: false,
};

export const webAccessibilitySlice = createSlice({
  name: "webAccessibility",
  initialState,
  reducers: {
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setHighlight: (state) => {
      state.highlight = !state.highlight;
    },
  },
});

export const { setZoom, setHighlight } = webAccessibilitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectZoom = (state: RootState) => state.webAccessibliity.zoom;
export const selectHighlight = (state: RootState) =>
  state.webAccessibliity.highlight;

export default webAccessibilitySlice.reducer;
