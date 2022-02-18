import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useFirebaseContext } from '../firebase/FirebaseContext'

const googleProvider = new GoogleAuthProvider()

export const useFirebaseLogin = () => {
  const { auth } = useFirebaseContext()

  const loginInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error('login faild')
    }
  }

  const logout = () => auth.signOut()

  return {
    loginInWithGoogle,
    loginWithEmail,
    logout,
  }
}
