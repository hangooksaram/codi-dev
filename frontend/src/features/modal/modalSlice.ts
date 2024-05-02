import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';


const initialState = {
  open:false,
  currentModalType : null,
  text: null,
  isConfirmed : null,
  isCanceled:null,
};


export const modalSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setModalState: (state, action) => {
      const { payload } = action;
      const newState = { ...state, open:payload };
      
      return newState;
    },

    setCurrentModal :(state,action)=> {
      const { payload } = action;
      const newState = { ...state,  ...payload};

      return newState;
    },
  },
});

export const { setModalState,setCurrentModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
