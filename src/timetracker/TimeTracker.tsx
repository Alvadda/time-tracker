import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../auth/authSlice'
import { useFirestore } from '../firebase/hooks/useFirestore'
import { selectProjects } from '../projects/projectsSlice'

const TimeTracker = () => {
  const { getProjects } = useFirestore()
  const dispatch = useDispatch()
  const projects = useSelector(selectProjects)

  useEffect(() => {
    getProjects()
  }, [getProjects])

  return (
    <div>
      <p>{projects[0].name}</p>
      <Button variant="contained" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  )
}

export default TimeTracker
