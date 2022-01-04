import { LocalizationProvider } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { createTheme, ThemeProvider } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { selectAuth } from './features/auth/authSlice'
import Login from './features/auth/Login'
import { selectDarkMode } from './features/settings/settingsSlice'
import FirebaseProvider from './firebase/FirebaseContext'
import { useFirebaseAuth } from './hooks/useFirebaseAuth'
import TimeTracker from './pages/timetracker/TimeTracker'
import './style/style.scss'

export const App = () => {
  useFirebaseAuth()
  const auth = useSelector(selectAuth)
  const darkMode = useSelector(selectDarkMode)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: blueGrey,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FirebaseProvider>
          <h1>Time Tracker</h1>
          {auth.uid ? <TimeTracker /> : <Login />}
        </FirebaseProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
