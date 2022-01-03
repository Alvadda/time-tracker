/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
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

export const selectAuth = (state: RootState) => state.auth

export const { login, logout } = authSlice.actions

export default authSlice.reducer
