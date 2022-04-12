import { LocalizationProvider } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { Alert, Box, Button, createTheme, Snackbar, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { selectAuth } from './features/auth/authSlice'
import Login from './features/auth/Login'
import { RequireAuth } from './features/auth/RequireAuth'
import { selectDarkMode, selectLanguage } from './features/settings/settingsSlice'
import FirebaseProvider from './firebase/FirebaseContext'
import { useEffectOnce } from './hooks/useEffectOnce'
import { useFirebaseAuth } from './hooks/useFirebaseAuth'
import { changeLanguage, isLanguageSupported } from './i18n'
import Overview from './pages/Overview'
import SettingsPage from './pages/SettingsPage'
import TimeTracker from './pages/TimeTracker'
import Wizard from './pages/wizard/Wizard'
import { APP_WIDTH, LANGUAGE_STORE } from './utils/constants '

export const App = () => {
  const [update, setUpdate] = useState(false)
  useFirebaseAuth()
  const auth = useSelector(selectAuth)
  const darkMode = useSelector(selectDarkMode)
  const language = useSelector(selectLanguage)

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

  useEffect(() => {
    changeLanguage(language)
  }, [language])

  useEffectOnce(() => {
    const language = localStorage.getItem(LANGUAGE_STORE)
    if (language && isLanguageSupported(language)) changeLanguage(language)
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FirebaseProvider>
          <CssBaseline />
          <Box width="100vw" height="100vh" display="flex" justifyContent="center">
            <Box width={APP_WIDTH} height="100vh" position="relative">
              <Routes>
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <Wizard />
                    </RequireAuth>
                  }
                >
                  <Route path="/" element={<TimeTracker />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
                <Route path="login" element={<Login />} />
              </Routes>
              {/* ,{auth.uid ? <Wizard /> : <Login />} */}
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
