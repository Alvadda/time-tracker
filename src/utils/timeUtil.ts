import moment from 'moment'

const formatDuration = (minutes: number) => {
  const hours = minutes / 60
  const rhours = Math.floor(hours)
  const m = (hours - rhours) * 60
  const rminutes = Math.round(m)
  return `${rhours}:${rminutes}`
}

const calcActiveSessionDuration = (startTime: number) => {
  const start = moment(startTime)
  const now = moment()
  const hours = now.diff(start, 'hour')
  const mins = moment.utc(moment(now, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss'))).format('mm')
  return `${hours}:${mins}`
}

const calcSessionDuration = (startTime: number, endTime: number) => {
  const start = moment(startTime)
  const end = moment(endTime)
  const minute = end.diff(start, 'minute')
  return minute
}

const nowMiliseconds = () => {
  return new Date().getTime()
}

export { formatDuration, calcActiveSessionDuration, calcSessionDuration, nowMiliseconds }
