import moment from 'moment'
import { calcActiveSessionDuration, calcSessionDuration, formatMinToHourMin, getRoundedHours } from './timeUtil'

describe('utils/time', () => {
  test('formatMinToHourMin', () => {
    const hoursAndMinutes = formatMinToHourMin(90)
    expect(hoursAndMinutes).toEqual('1:30')
  })

  test('calcActiveSessionDuration', () => {
    const time = moment.duration('03:15:00')
    const start = moment()
    start.subtract(time)
    const duration = calcActiveSessionDuration(start.valueOf())
    expect(duration).toEqual('3:15')
  })

  test('calcSessionDuration', () => {
    const start = moment().valueOf()
    const end = moment().add(1, 'h').valueOf()

    const duration = calcSessionDuration(start, end)
    expect(duration).toEqual(60)
  })

  test('getRoundedHours', () => {
    expect(getRoundedHours(660)).toEqual(11)
    expect(getRoundedHours(54)).toEqual(0.9)
    expect(getRoundedHours()).toEqual(0)
  })
})
