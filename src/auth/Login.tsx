import { Button } from '@mui/material'

import { useFirebaseLogin } from './useFirebaseLogin'

const Login = () => {
  const { loginInWithGoogle } = useFirebaseLogin()

  return (
    <div>
      <Button variant="contained" onClick={loginInWithGoogle}>
        Login
      </Button>
    </div>
  )
}

export default Login
