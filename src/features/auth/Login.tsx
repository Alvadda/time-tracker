import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin'
import { selectErrorMessage, setError } from './authSlice'

interface LoginData {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<LoginData>()
  const { loginWithEmail } = useFirebaseLogin()
  const dispatch = useDispatch()

  const loginError = useSelector(selectErrorMessage)

  const onSubmit = async () => {
    const isValid = await trigger()
    if (isValid) {
      const data = getValues()
      try {
        await loginWithEmail(data.email, data.password)
      } catch (error: any) {
        dispatch(setError(error.message))
      }
    }
  }

  return (
    <Box
      component="form"
      sx={{
        height: '100vh',
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" component="h1" align="center">
        Login
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignContent: 'center' }}>
          <TextField
            inputProps={{ 'aria-label': 'Email' }}
            label="Email"
            variant="standard"
            type="email"
            {...register('email', { required: true })}
            error={Boolean(errors.email) || Boolean(loginError)}
          />
          <TextField
            inputProps={{ 'aria-label': 'Password' }}
            label="Password"
            variant="standard"
            type="password"
            {...register('password', { required: true })}
            error={Boolean(errors.password) || Boolean(loginError)}
          />
          <Button aria-label="Login" variant="contained" onClick={onSubmit}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login
