import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { useFirebaseContext } from '../firebase/FirebaseContext'

const googleProvider = new GoogleAuthProvider()

export const useFirebaseLogin = () => {
  const { auth } = useFirebaseContext()

  const loginInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  const logout = () => auth.signOut()

  return {
    loginInWithGoogle,
    logout,
  }
}
