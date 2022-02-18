import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'

export interface AuthState {
  uid?: string
  name?: string
  errorMessage?: string
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
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
    clearError: (state) => {
      state.errorMessage = undefined
    },
  },
})

//SELECTOR
export const selectAuth = (state: RootState) => state.auth
export const selectUserId = (state: RootState) => state.auth.uid
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage

//ACTIONS
export const { login, logout, setError, clearError } = authSlice.actions

export default authSlice.reducer
