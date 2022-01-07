import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
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
        start: new Date().getTime(),
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
export const selectActivSession = (state: RootState) => state.sessions.sessions.filter((session) => session.activ)

//ACTIONS
export const { updateSessions } = sessionsSlice.actions
export { createSession, updateSession }

export default sessionsSlice.reducer
