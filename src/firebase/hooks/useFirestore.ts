import { collection, getDocs } from 'firebase/firestore'
import { useFirebaseContext } from '../FirebaseContext'

export const useFirestore = () => {
  const { db } = useFirebaseContext()
  const testCollection = collection(db, `test`)

  const getTest = async () => {
    if (!testCollection) return []
    const querySnapshot = await getDocs(testCollection)
    const test: string[] = []
    querySnapshot.forEach((doc) => {
      const testDoc = doc.data()
      test.push(testDoc.name)
    })
    return test
  }

  return { getTest }
}
