import { LocalizationProvider } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { Button, createTheme, ThemeProvider, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from './features/auth/authSlice'
import Login from './features/auth/Login'
import { selectDarkMode } from './features/settings/settingsSlice'
import FirebaseProvider from './firebase/FirebaseContext'
import { useFirebaseAuth } from './hooks/useFirebaseAuth'
import TimeTracker from './pages/timetracker/TimeTracker'

export const App = () => {
  const [update, setUpdate] = useState(false)
  useFirebaseAuth()
  const auth = useSelector(selectAuth)
  const darkMode = useSelector(selectDarkMode)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: blueGrey,
    },
  })

  useEffect(() => {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('new Service worker, pls reload')
      setUpdate(true)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FirebaseProvider>
          <Typography sx={{ color: 'HighlightText' }}>Time Tracker</Typography>
          {auth.uid ? <TimeTracker /> : <Login />}
          {update && <Button onClick={() => window.location.reload()}>Update</Button>}
        </FirebaseProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
