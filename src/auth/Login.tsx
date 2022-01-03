import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { login } from './authSlice'

const Login = () => {
  const dispatch = useDispatch()

  const onLogin = () => {
    dispatch(
      login({
        uid: '1234',
        name: 'Test User',
      })
    )
  }

  return (
    <div>
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
    </div>
  )
}

export default Login
