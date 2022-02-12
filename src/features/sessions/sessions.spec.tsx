import { Session } from '../../types'
import sessionsReducer, { updateSessions } from './sessionsSlice'

describe('feature/sessions', () => {
  describe('reducer', () => {
    test('updateSessions', () => {
      const sessions: Session[] = [
        {
          id: '1',
          activ: true,
          start: 123123123,
          docRef: {},
        },
        {
          id: '2',
          activ: false,
          start: 123123123,
          end: 123123456,
          docRef: {},
        },
        {
          id: '3',
          activ: false,
          start: 123123123,
          end: 123123456,
          projectId: '123',
          docRef: {},
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
})
