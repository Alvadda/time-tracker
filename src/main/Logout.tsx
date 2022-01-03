import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice'

const Logout = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <Button variant="contained" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  )
}

export default Logout