import { LocalizationProvider } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { Alert, Box, Button, createTheme, Snackbar, ThemeProvider } from '@mui/material'
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
          <Box width="100vw" height="100vh" display="flex" justifyContent="center">
            <Box width="min(600px, 100vw)" height="100vh" position="relative">
              {auth.uid ? <Wizard /> : <Login />}
              {update && (
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  open={update}
                  autoHideDuration={15000}
                  onClose={() => setUpdate(false)}
                >
                  <Alert
                    severity="info"
                    sx={{ width: '100%' }}
                    action={
                      <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                        Update now
                      </Button>
                    }
                  >
                    New update available!
                  </Alert>
                </Snackbar>
              )}
            </Box>
          </Box>
        </FirebaseProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
