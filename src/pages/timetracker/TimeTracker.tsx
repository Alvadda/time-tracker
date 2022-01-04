import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../features/auth/authSlice'
import { selectProjects } from '../../features/projects/projectsSlice'
import { useFirestore } from '../../firebase/useFirestore'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import { useFirebaseLogin } from '../../hooks/useFirebaseLogin'

const TimeTracker = () => {
  const { getProjects } = useFirestore()
  const { logout } = useFirebaseLogin()

  const projects = useSelector(selectProjects)
  const auth = useSelector(selectAuth)

  useEffectOnce(() => {
    getProjects()
  })

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
