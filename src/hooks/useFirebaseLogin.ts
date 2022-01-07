import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useFirebaseContext } from '../firebase/FirebaseContext'

const googleProvider = new GoogleAuthProvider()

export const useFirebaseLogin = () => {
  const { auth } = useFirebaseContext()

  const loginInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => auth.signOut()

  return {
    loginInWithGoogle,
    loginWithEmail,
    logout,
  }
}
