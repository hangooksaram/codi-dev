import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

// Define a type for the slice state
export interface WebAccessibilityState {
  zoom: number;
  highlight: boolean;
  letterSpacing: string;
  lineHeight: number;
  focused: boolean;
}

// Define the initial state using that type
const initialState: WebAccessibilityState = {
  zoom: 1,
  highlight: false,
  letterSpacing: "initial",
  lineHeight: 1,
  focused: false,
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
    setLetterSpacing: (state, action) => {
      state.letterSpacing = action.payload;
    },
    setLineHeight: (state, action) => {
      state.lineHeight = action.payload;
    },
    setFocused: (state) => {
      state.focused = !state.focused;
    },
  },
});

export const {
  setZoom,
  setHighlight,
  setLetterSpacing,
  setLineHeight,
  setFocused,
} = webAccessibilitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectZoom = (state: RootState) => state.webAccessibliity.zoom;
export const selectHighlight = (state: RootState) =>
  state.webAccessibliity.highlight;
export const selectLetterSpacing = (state: RootState) =>
  state.webAccessibliity.letterSpacing;
export const selectLineHeight = (state: RootState) =>
  state.webAccessibliity.lineHeight;
export const selectFocused = (state: RootState) =>
  state.webAccessibliity.focused;

export default webAccessibilitySlice.reducer;
