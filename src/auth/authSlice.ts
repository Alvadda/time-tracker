import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export interface AuthState {
  uid?: string
  name?: string
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      ;(state.uid = action.payload.uid), (state.name = action.payload.name)
    },
    logout: (state) => {
      ;(state.name = undefined), (state.uid = undefined)
    },
  },
})

//SELECTOR
export const selectAuth = (state: RootState) => state.auth

//ACTIONS
export const { login, logout } = authSlice.actions

export default authSlice.reducer
