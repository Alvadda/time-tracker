import { configureStore } from '@reduxjs/toolkit'
import API from '../api/api'
import authReducer from '../features/auth/authSlice'
import customersReducer from '../features/customer/customersSlice'
import projectsReducer from '../features/projects/projectsSlice'
import sessionsReducer from '../features/sessions/sessionsSlice'
import settingsReducer from '../features/settings/settingsSlice'
import tasksReducer from '../features/task/taskSlice'
import { db } from '../firebase/initFirebase'
import wizardReducer from '../pages/wizard/wizardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    sessions: sessionsReducer,
    customers: customersReducer,
    tasks: tasksReducer,
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
