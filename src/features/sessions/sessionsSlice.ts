import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Session } from './../../types/types'

export interface SessionsState {
  sessions: Session[]
}

const initialState: SessionsState = { sessions: [] }

export const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    updateSessions: (state, action: PayloadAction<Session[]>) => {
      state.sessions = action.payload
    },
  },
})

//SELECTOR
export const selectSessions = (state: RootState) => state.sessions.sessions
export const selectActivSession = (state: RootState) => state.sessions.sessions.filter((session) => session.activ)

//ACTIONS
export const { updateSessions } = sessionsSlice.actions

export default sessionsSlice.reducer
