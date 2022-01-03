import { LocalizationProvider } from '@mui/lab'
import { Button, createTheme, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { blueGrey } from '@mui/material/colors'

import FirebaseProvider from './firebase/FirebaseContext'
import { useFirestore } from './firebase/hooks/useFirestore'
import './style/style.scss'

export const App = () => {
  const [test, setTest] = useState<string[]>([])
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const { getTest } = useFirestore()

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
          <h1>React TypeScript Template</h1>
          <Button variant="contained">{test[0]}</Button>
        </FirebaseProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
