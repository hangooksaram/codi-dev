import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

// Define a type for the slice state
export interface WebAccessibilityState {
  zoom: number;
  highlight: boolean;
  letterSpacing: string;
  lineHeight: number;
  focused: boolean;
  font: {
    color: string;
    size : number;
  }
}



// Define the initial state using that type
const initialState: WebAccessibilityState = {
  zoom: 1,
  highlight: false,
  letterSpacing: 'initial',
  lineHeight: 1,
  focused: false,
  font: {
    color : "",
    size : 0
  }
};

export const webAccessibilitySlice = createSlice({
  name: 'webAccessibility',
  initialState,
  reducers: {
    initializeAll: (state) => {
      state.focused = false;
      state.highlight = false;
      state.letterSpacing = 'initial';
      state.lineHeight = 1;
      state.zoom = 1;
    },
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
    toggleFontSize:(state, action)=> {
      if(action.payload === 'increase'){
        state.font.size = state.font!.size + 2;
        return;
      }
      state.font.size = state.font!.size - 2;
    }
  },
});

export const {
  setZoom,
  setHighlight,
  setLetterSpacing,
  setLineHeight,
  setFocused,
  toggleFontSize,
  initializeAll,
} = webAccessibilitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectZoom = (state: RootState) => state.webAccessibility.zoom;
export const selectHighlight = (state: RootState) =>
  state.webAccessibility.highlight;
export const selectLetterSpacing = (state: RootState) =>
  state.webAccessibility.letterSpacing;
export const selectLineHeight = (state: RootState) =>
  state.webAccessibility.lineHeight;
export const selectFocused = (state: RootState) =>
  state.webAccessibility.focused;
export const selectFont = (state: RootState) =>
  state.webAccessibility.font;

export default webAccessibilitySlice.reducer;
