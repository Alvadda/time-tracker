import { useDispatch } from 'react-redux'
import { fetchProjects } from '../features/projects/projectsSlice'
import { useFirebaseContext } from './FirebaseContext'

export const useFirestore = () => {
  const { db } = useFirebaseContext()
  const dispatch = useDispatch()

  const getProjects = () => dispatch(fetchProjects(db))

  return {
    getProjects,
  }
}
