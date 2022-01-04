import moment from 'moment'
import { useSelector } from 'react-redux'
import LiveTracker from '../features/sessions/LiveTracker'
import { selectSessions } from '../features/sessions/sessionsSlice'
import { useSessionsListener } from '../features/sessions/useSessionsListener'

const TimeTracker = () => {
  useSessionsListener()
  const sessions = useSelector(selectSessions)
  console.log(sessions)

  return (
    <>
      <p>TimeTracker</p>
      <LiveTracker />
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {`Start: ${moment(session.start).format('DD.MM HH:mm:ss')} 
            | End: ${session.end ? moment(session.end).format('DD.MM HH:mm:ss') : ''}`}
          </li>
        ))}
      </ul>
    </>
  )
}

export default TimeTracker
