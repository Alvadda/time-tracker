import moment, { Moment } from 'moment'
import { NumberOrEmpty } from './../types/index'
import { HOUR } from './constants '

export const formatNumberToTwoDigits = (number: number) => ('0' + number).slice(-2)

export const getDateFormatShort = () => 'DD.MM.YYYY'

export const getDateFormatLong = () => 'DD MMM YYYY'

export const getDateTimeFormatShort = () => 'DD.MM.YY HH:mm'

export const getTimeFormat = () => 'hh:mm'

const formatDate = (time?: Date | Moment | number, format?: string) => {
  if (!time || !format) return ''

  return moment(time).format(format)
}

export const formatDateShort = (time?: Date | Moment | number) => formatDate(time, getDateFormatShort())
export const formatDateLong = (time?: Date | Moment | number) => formatDate(time, getDateFormatLong())

export const formatDateTimeShort = (time?: Date | Moment | number) => formatDate(time, getDateTimeFormatShort())
export const formatTime = (time?: Date | Moment | number) => formatDate(time, getTimeFormat())

export const formatMinToHourMin = (minutes?: number) => {
  if (!minutes) return '0:00'

  const hours = minutes / HOUR
  const rhours = Math.floor(hours)
  const m = (hours - rhours) * HOUR
  const rminutes = formatNumberToTwoDigits(Math.round(m))
  return `${rhours}:${rminutes}`
}

export const calcActiveSessionDuration = (startTimeMS: number) => {
  const start = moment(startTimeMS)
  const now = moment()
  const hours = now.diff(start, 'hour')
  const mins = moment.utc(moment(now, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss'))).format('mm')
  return `${hours}:${mins}`
}

export const calcSessionDuration = (startTimeMS: number, endTimeMS: number) => {
  const start = moment(startTimeMS)
  const end = moment(endTimeMS)
  const minute = end.diff(start, 'minute')
  return minute
}

export const calcEarningFromMin = (minutes?: number, hourRate?: NumberOrEmpty) => {
  const time = minutes || 0
  const rate = hourRate || 0

  return (time * rate) / HOUR
}

export const getRoundedHours = (min: number) => {
  return Math.round((min / HOUR) * 10) / 10
}

export const nowMiliseconds = () => {
  return new Date().getTime()
}

export const timeInMiliseconds = (time: Date | Moment) => {
  if (time instanceof Date) {
    return time.getTime()
  } else {
    return time.valueOf()
  }
}
