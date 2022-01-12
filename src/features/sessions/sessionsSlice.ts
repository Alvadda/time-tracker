import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
import { Session } from './../../types/types'

export interface SessionsState {
  sessions: Session[]
  selectedSession?: Session
}

const initialState: SessionsState = { sessions: [] }

const createSession = createAsyncThunk<unknown, Partial<Session>, { state: RootState; extra: Extra }>(
  'session/create',
  async (session, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    extra.session.create(session, auth.uid)
  }
)

const updateSession = createAsyncThunk<unknown, Session, { state: RootState; extra: Extra }>(
  'session/update',
  async (session, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    extra.session.update(session)
  }
)

const deleteSession = createAsyncThunk<unknown, Session, { state: RootState; extra: Extra }>(
  'session/delete',
  async (session, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    extra.session.remove(session)
  }
)

export const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    updateSessions: (state, action: PayloadAction<Session[]>) => {
      state.sessions = action.payload
    },
    setSelectedSession: (state, action: PayloadAction<Session | undefined>) => {
      state.selectedSession = action.payload
    },
  },
})

//SELECTOR
export const selectSessions = (state: RootState) => state.sessions.sessions
export const selectActivSessions = (state: RootState) => state.sessions.sessions.filter((session) => session.activ)
export const selectInactivSessions = (state: RootState) => state.sessions.sessions.filter((session) => !session.activ)
export const selectActivSession = (state: RootState) => state.sessions.sessions.find((session) => session.activ)
export const selectSelectedSession = (state: RootState) => state.sessions.selectedSession
export const selectInactiveSessionsFromTo = (fromMs: number, toMs: number) => {
  return (state: RootState) =>
    state.sessions.sessions.filter((session) => !session.activ && session.start >= fromMs && session.start <= toMs)
}

//ACTIONS
export const { updateSessions, setSelectedSession } = sessionsSlice.actions
export { createSession, updateSession, deleteSession }

export default sessionsSlice.reducer
