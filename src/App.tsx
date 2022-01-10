import { LocalizationProvider } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { Box, Button, createTheme, ThemeProvider } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from './features/auth/authSlice'
import Login from './features/auth/Login'
import { selectDarkMode } from './features/settings/settingsSlice'
import FirebaseProvider from './firebase/FirebaseContext'
import { useFirebaseAuth } from './hooks/useFirebaseAuth'
import Wizard from './pages/wizard/Wizard'

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
          <CssBaseline />
          <Box maxWidth={'1200px'} height={'100vh'} margin={'0 auto'}>
            {auth.uid ? <Wizard /> : <Login />}
            {update && <Button onClick={() => window.location.reload()}>Update</Button>}
          </Box>
        </FirebaseProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
