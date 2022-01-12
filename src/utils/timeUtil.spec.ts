import moment from 'moment'
import { calcActiveSessionDuration, calcSessionDuration, formatMinToHourMin, nowMiliseconds } from './timeUtil'

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

  test('nowMiliseconds', () => {
    expect(nowMiliseconds()).toEqual(moment().valueOf())
  })
})
