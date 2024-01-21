import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { User } from '@/types/user'

const initialState: User = {
  id: undefined,
  isMentor: false,
  isProfile: false,
  profileImageUrl: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action
      const newState = { ...state, ...payload }

      return newState
    },
  },
})

export const { setUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
