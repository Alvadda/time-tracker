import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin'

const Login = () => {
  const { loginInWithGoogle, loginWithEmail } = useFirebaseLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    if (email && password) {
      loginWithEmail(email, password)
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
          <TextField label="Email" variant="standard" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" onClick={onSubmit}>
            Login
          </Button>
        </Box>
      </Paper>
      <Button variant="contained" onClick={loginInWithGoogle}>
        Login with Google
      </Button>
    </Box>
  )
}

export default Login
