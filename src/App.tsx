import { LocalizationProvider } from '@mui/lab'
import { Button, createTheme, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { blueGrey } from '@mui/material/colors'
import { useSelector } from 'react-redux'

import FirebaseProvider from './firebase/FirebaseContext'
import { useFirestore } from './firebase/hooks/useFirestore'
import { RootState } from './store/store'
import Login from './auth/Login'
import './style/style.scss'
import Logout from './main/Logout'

export const App = () => {
  const [test, setTest] = useState<string[]>([])
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const { getTest } = useFirestore()

  const auth = useSelector((state: RootState) => state.auth)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: blueGrey,
    },
  })

  useEffect(() => {
    const getTestFromApi = async () => {
      const tests = await getTest()
      setTest([...tests])
    }

    getTestFromApi()
  }, [getTest])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FirebaseProvider>
          <h1>Time Tracker</h1>
          {auth.uid ? <Logout /> : <Login />}
        </FirebaseProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
