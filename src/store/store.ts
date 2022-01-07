import { configureStore } from '@reduxjs/toolkit'
import API from '../api/api'
import authReducer from '../features/auth/authSlice'
import projectsReducer from '../features/projects/projectsSlice'
import sessionsReducer from '../features/sessions/sessionsSlice'
import settingsReducer from '../features/settings/settingsSlice'
import { db } from '../firebase/initFirebase'
import wizardReducer from '../pages/wizard/wizardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    sessions: sessionsReducer,
    settings: settingsReducer,
    wizard: wizardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: API(db),
      },
      serializableCheck: false,
    }),
})

export type Extra = ReturnType<typeof API>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
