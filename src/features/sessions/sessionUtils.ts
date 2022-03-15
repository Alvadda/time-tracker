import moment from 'moment'
import { Session } from '../../types'

interface SessionMerge {
  start: number
  duration: number
  notes: string
}

export const getDurationWithBreak = (session: Session) => {
  if (!session.duration) return 0
  if (!session.break) return session.duration

  return session.duration - session.break
}

export const mergeDaysTogether = (sessions: Session[]) => {
  return sessions.reduce((prev, current) => {
    const indexOfSameDay = prev.findIndex((session) => moment(session.start).isSame(current.start, 'day'))

    if (indexOfSameDay !== -1) {
      prev[indexOfSameDay].duration += getDurationWithBreak(current)
      prev[indexOfSameDay].notes = prev[indexOfSameDay].notes.concat(' ', current.note ?? '')
      return prev
    }

    prev.push({
      start: current.start,
      duration: getDurationWithBreak(current),
      notes: current.note ?? '',
    })

    return prev
  }, [] as SessionMerge[])
}
