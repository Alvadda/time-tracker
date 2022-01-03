import { LocalizationProvider } from '@mui/lab'
import { createTheme, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import { blueGrey } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import AdapterMoment from '@mui/lab/AdapterMoment'

import { selectAuth } from './auth/authSlice'
import FirebaseProvider from './firebase/FirebaseContext'
import Login from './auth/Login'
import TimeTracker from './timetracker/TimeTracker'
import './style/style.scss'

export const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const auth = useSelector(selectAuth)

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
