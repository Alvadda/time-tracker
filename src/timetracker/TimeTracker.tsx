import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../auth/authSlice'

import { useFirebaseLogin } from '../auth/useFirebaseLogin'
import { useFirestore } from '../firebase/hooks/useFirestore'
import { selectProjects } from '../projects/projectsSlice'

const TimeTracker = () => {
  const { getProjects } = useFirestore()
  const { logout } = useFirebaseLogin()

  const projects = useSelector(selectProjects)
  const auth = useSelector(selectAuth)

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div>
      <p>Hallo {auth.name}</p>
      <p>Projects:</p>
      {projects.map((project) => (
        <p key={project.name}> {project.name}</p>
      ))}
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}

export default TimeTracker
