import { useEffect, useState } from 'react'
import FirebaseProvider from './firebase/FirebaseContext'
import { useFirestore } from './firebase/hooks/useFirestore'
import './style/style.scss'

export const App = () => {
  const [test, setTest] = useState<string[]>([])
  const { getTest } = useFirestore()

  useEffect(() => {
    const getTestFromApi = async () => {
      const tests = await getTest()
      setTest([...tests])
    }

    getTestFromApi()
  }, [getTest])

  return (
    <FirebaseProvider>
      <h1>React TypeScript Template</h1>
      <p>{test[0]}</p>
    </FirebaseProvider>
  )
}
