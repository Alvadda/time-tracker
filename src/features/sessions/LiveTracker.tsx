import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { createSession, getActivSessions, updateSession } from '../../api/sessionAPI'
import { useFirebaseContext } from '../../firebase/FirebaseContext'
import { selectUserId } from '../auth/authSlice'

const LiveTracker = () => {
  const { db } = useFirebaseContext()

  const userId = useSelector(selectUserId)

  const track = async () => {
    if (!userId) return

    const sessions = await getActivSessions(userId, db)
    if (sessions.length === 1) {
      const updatedSession = sessions[0]
      updatedSession.end = new Date().getTime()
      updatedSession.activ = false

      await updateSession(updatedSession)
    }
    if (sessions.length === 0) {
      createSession(
        {
          activ: true,
          start: new Date().getTime(),
        },
        userId,
        db
      )
    }
  }

  const get = async () => {
    if (!userId) return

    const test = await getActivSessions(userId, db)
    console.log(test)
  }
  return (
    <>
      <Button onClick={track}>Track Session</Button>
      <Button onClick={get}>Get Sessions</Button>
    </>
  )
}

export default LiveTracker
