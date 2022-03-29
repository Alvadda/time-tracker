import moment, { Moment } from 'moment'
import { NumberOrEmpty } from './../types/index'

const formatNumberToTwoDigits = (number: number) => ('0' + number).slice(-2)

const formatDateShort = (dateInMil: number) => moment(dateInMil).format('L')

const getLocalDateFormatShort = () => moment.localeData().longDateFormat('L')

const getLocalTimeFormatShort = () => moment.localeData().longDateFormat('LT')

const formatMinToHourMin = (minutes?: number) => {
  if (!minutes) return '0:00'

  const hours = minutes / 60
  const rhours = Math.floor(hours)
  const m = (hours - rhours) * 60
  const rminutes = formatNumberToTwoDigits(Math.round(m))
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

const calcEarningFromMin = (minutes?: number, hourRate?: NumberOrEmpty) => {
  const time = minutes || 0
  const rate = hourRate || 0

  return (time * rate) / 60
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

export {
  formatMinToHourMin,
  calcActiveSessionDuration,
  calcSessionDuration,
  nowMiliseconds,
  timeInMiliseconds,
  calcEarningFromMin,
  formatDateShort,
  getLocalDateFormatShort,
  getLocalTimeFormatShort,
}
