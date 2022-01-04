import wizardReducer, { navigateTo } from './wizardSlice'

describe('feature/auth', () => {
  describe('reducer', () => {
    test('navigate to', () => {
      let reducer = wizardReducer({ currentPage: 'time-tracker' }, navigateTo('overview'))
      expect(reducer.currentPage).toEqual('overview')

      reducer = wizardReducer(reducer, navigateTo('settings'))
      expect(reducer.currentPage).toEqual('settings')

      reducer = wizardReducer(reducer, navigateTo('time-tracker'))
      expect(reducer.currentPage).toEqual('time-tracker')
    })

    test('unknown action', () => {
      const reducer = wizardReducer({ currentPage: 'time-tracker' }, { type: 'UNKNOWN' })
      expect(reducer).toEqual({ currentPage: 'time-tracker' })
    })
  })
})
