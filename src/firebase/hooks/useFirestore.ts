import { useDispatch } from 'react-redux'
import { useFirebaseContext } from '../FirebaseContext'
import { fetchProjects } from '../../projects/projectsSlice'

export const useFirestore = () => {
  const { db } = useFirebaseContext()
  const dispatch = useDispatch()

  const getProjects = () => dispatch(fetchProjects({ db }))

  return { getProjects }
}
