import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setValueFromFb } from '../../api/apiUtils'
import { sessionPath } from '../../api/sessionAPI'
import { useFirebaseContext } from '../../firebase/FirebaseContext'
import { Session } from '../../types/types'
import { selectUserId } from '../auth/authSlice'
import { updateSessions } from './sessionsSlice'

export const useSessionsListener = () => {
  const dispatch = useDispatch()
  const { db } = useFirebaseContext()
  const userId = useSelector(selectUserId)

  useEffect(() => {
    if (!userId) return

    const q = query(collection(db, sessionPath(userId)), orderBy('start', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sessions: Session[] = []
      querySnapshot.forEach((doc) => {
        const docData = doc.data()
        sessions.push({
          id: doc.id,
          activ: docData.activ,
          start: docData.start,
          end: setValueFromFb(docData.end),
          projectId: setValueFromFb(docData.projectId),
          duration: setValueFromFb(docData.duration),
          taskIds: docData.taskIds || [],
          note: setValueFromFb(docData.note),
        })
      })
      dispatch(updateSessions(sessions))
    })

    return unsubscribe
  }, [userId, db, dispatch])
}
