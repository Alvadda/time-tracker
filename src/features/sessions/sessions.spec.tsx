import moment from 'moment'
import { Session } from '../../types'
import sessionsReducer, { updateSessions } from './sessionsSlice'
import { getDurationWithBreak, mergeDaysTogether } from './sessionUtils'

describe('feature/sessions', () => {
  describe('reducer', () => {
    test('updateSessions', () => {
      const sessions: Session[] = [
        {
          id: '1',
          activ: true,
          start: 123123123,
        },
        {
          id: '2',
          activ: false,
          start: 123123123,
          end: 123123456,
        },
        {
          id: '3',
          activ: false,
          start: 123123123,
          end: 123123456,
          projectId: '123',
        },
      ]

      const reducer = sessionsReducer(undefined, updateSessions(sessions))

      expect(reducer.sessions.length).toEqual(3)
      expect(reducer.sessions).toEqual(sessions)
    })

    test('unknown action', () => {
      const reducer = sessionsReducer(undefined, { type: 'UNKNOWN' })

      expect(reducer).toEqual({ sessions: [] })
    })
  })

  describe('sessionUtils', () => {
    describe('getDurationWithBreak', () => {
      const sessionTamplate: Session = {
        id: 'test',
        activ: false,
        start: moment().subtract(8, 'hours').valueOf(),
        end: moment().valueOf(),
        duration: 480,
        break: 60,
      }

      test('with duration and break', () => {
        const duration = getDurationWithBreak(sessionTamplate)
        expect(duration).toBe(420)
      })

      test('with duration and no break', () => {
        const session = {
          ...sessionTamplate,
          break: undefined,
        }
        const duration = getDurationWithBreak(session)
        expect(duration).toBe(480)
      })

      test('with break and no duration', () => {
        const session = {
          ...sessionTamplate,
          duration: undefined,
        }
        const duration = getDurationWithBreak(session)
        expect(duration).toBe(0)
      })

      test('with no break and no duration', () => {
        const session = {
          ...sessionTamplate,
          duration: undefined,
          break: undefined,
        }
        const duration = getDurationWithBreak(session)
        expect(duration).toBe(0)
      })
    })

    describe('mergeDaysTogether', () => {
      const today = moment().endOf('day')
      const yesterDay = moment().subtract(1, 'days').endOf('day')

      const sessions: Session[] = [
        {
          id: '1',
          projectId: '1',
          activ: false,
          start: moment(today).subtract(9, 'hours').valueOf(),
          end: moment(today).subtract(1, 'hours').valueOf(),
          duration: 480,
          break: 60,
          note: 'part 1',
          taskIds: ['1', '2'],
        },
        {
          id: '2',
          projectId: '1',
          activ: false,
          start: moment(yesterDay).subtract(9, 'hours').valueOf(),
          end: moment(yesterDay).subtract(1, 'hours').valueOf(),
          duration: 480,
          break: 60,
          note: 'singe',
          taskIds: ['a', 'b'],
        },
        {
          id: '1',
          projectId: '1',
          activ: false,
          start: moment(today).subtract(18, 'hours').valueOf(),
          end: moment(today).subtract(10, 'hours').valueOf(),
          duration: 480,
          break: 60,
          note: 'part 2',
          taskIds: ['3', '4'],
        },
        {
          id: '3',
          projectId: '2',
          activ: false,
          start: moment(today).subtract(18, 'hours').valueOf(),
          end: moment(today).subtract(10, 'hours').valueOf(),
          duration: 480,
          break: 60,
          note: 'part 2',
          taskIds: ['3', '4'],
        },
      ]

      const combinedSessions = mergeDaysTogether(sessions)

      test('check length', () => {
        expect(combinedSessions.length).toBe(3)
      })

      test('only same day and project Combined ', () => {
        const sessionsToday = combinedSessions.filter((session) => moment(session.start).isSame(today, 'day'))
        const combined = combinedSessions.find((session) => session.id === '1')

        expect(sessionsToday.length).toBe(2)
        expect(combined).toBeDefined()
        expect(combined?.duration).toBe(960)
        expect(combined?.break).toBe(120)
        expect(combined?.note).toBe('part 1 part 2')
        expect(combined?.taskIds).toStrictEqual(['1', '2', '3', '4'])
      })
    })
  })
})
