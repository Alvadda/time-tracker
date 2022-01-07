import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
import { nowMiliseconds } from '../../utils/timeUtil'
import { Session } from './../../types/types'

export interface SessionsState {
  sessions: Session[]
}

const initialState: SessionsState = { sessions: [] }

const createSession = createAsyncThunk<unknown, string, { state: RootState; extra: Extra }>(
  'session/create',
  async (projectId, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    extra.session.create(
      {
        activ: true,
        start: nowMiliseconds(),
        projectId,
      },
      auth.uid
    )
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
export const selectActivSessions = (state: RootState) => state.sessions.sessions.filter((session) => session.activ)
export const selectActivSession = (state: RootState) => state.sessions.sessions.find((session) => session.activ)

//ACTIONS
export const { updateSessions } = sessionsSlice.actions
export { createSession, updateSession }

export default sessionsSlice.reducer
