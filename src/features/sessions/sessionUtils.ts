import { Session } from '../../types'

export const getDurationWithBreak = (session: Session) => {
  if (!session.duration) return 0
  if (!session.break) return session.duration

  return session.duration - session.break
}
