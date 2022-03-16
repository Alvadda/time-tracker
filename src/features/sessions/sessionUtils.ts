import moment from 'moment'
import { Session } from '../../types'

const combineTime = (time?: number, timeToAdd?: number) => (time ?? 0) + (timeToAdd ?? 0)

const combineStartEnd = (session: Session, sessionToCombine: Session) => {
  return {
    start: session.start < sessionToCombine.start ? session.start : sessionToCombine.start,
    end: (session.end ?? 0) > (sessionToCombine.end ?? 0) ? session.end : sessionToCombine.end,
  }
}

const combineNotes = (note?: string, noteToAdd?: string) => {
  if (!note && !noteToAdd) return undefined
  if (!note && noteToAdd) return noteToAdd
  if (note && !noteToAdd) return note

  return note!.concat(' ', noteToAdd!)
}

const combineTasks = (tasks?: string[], tasksToAdd?: string[]) => {
  if (!tasks && !tasksToAdd) return undefined
  if (!tasks && tasksToAdd) return tasksToAdd
  if (tasks && !tasksToAdd) return tasks

  return [...tasks!, ...tasksToAdd!]
}

const combineTwoSessions = (session: Session, sessionToCombine: Session): Session => {
  const { start, end } = combineStartEnd(session, sessionToCombine)
  const duration = combineTime(session.duration, sessionToCombine.duration)
  const note = combineNotes(session.note, sessionToCombine.note)
  const sbreak = combineTime(session.break, sessionToCombine.break)
  const tasks = combineTasks(session.taskIds, sessionToCombine.taskIds)

  return {
    ...session,
    start,
    end,
    duration,
    note,
    break: sbreak,
    taskIds: tasks,
  }
}

export const getDurationWithBreak = (session: Session) => {
  if (!session.duration) return 0
  if (!session.break) return session.duration

  return session.duration - session.break
}

export const mergeDaysTogether = (sessions: Session[]) => {
  return sessions.reduce((prev, current) => {
    const indexOfSameDay = prev.findIndex((session) => moment(session.start).isSame(current.start, 'day'))

    if (indexOfSameDay !== -1 && prev[indexOfSameDay].projectId === current.projectId) {
      prev[indexOfSameDay] = combineTwoSessions(prev[indexOfSameDay], current)
      return prev
    }

    prev.push(current)

    return prev
  }, [] as Session[])
}
