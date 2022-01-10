import moment, { Moment } from 'moment'

const formatDuration = (minutes: number) => {
  const hours = minutes / 60
  const rhours = Math.floor(hours)
  const m = (hours - rhours) * 60
  const rminutes = Math.round(m)
  return `${rhours}:${rminutes}`
}

const calcActiveSessionDuration = (startTimeMS: number) => {
  const start = moment(startTimeMS)
  const now = moment()
  const hours = now.diff(start, 'hour')
  const mins = moment.utc(moment(now, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss'))).format('mm')
  return `${hours}:${mins}`
}

const calcSessionDuration = (startTimeMS: number, endTimeMS: number) => {
  const start = moment(startTimeMS)
  const end = moment(endTimeMS)
  const minute = end.diff(start, 'minute')
  return minute
}

const nowMiliseconds = () => {
  return new Date().getTime()
}

const timeInMiliseconds = (time: Date | Moment) => {
  if (time instanceof Date) {
    return time.getTime()
  } else {
    return time.valueOf()
  }
}

export { formatDuration, calcActiveSessionDuration, calcSessionDuration, nowMiliseconds, timeInMiliseconds }
