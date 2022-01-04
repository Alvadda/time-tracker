import authReducer, { login, logout } from './authSlice'

describe('feature/auth', () => {
  describe('reducer', () => {
    test('login', () => {
      const reducer = authReducer({}, login({ uid: '123', name: 'Test' }))
      expect(reducer).toEqual({ uid: '123', name: 'Test' })
    })

    test('logout', () => {
      const reducer = authReducer({}, logout())
      expect(reducer).toEqual({ uid: undefined, name: undefined })
    })

    test('unknown action', () => {
      const reducer = authReducer({ uid: '123', name: 'Test' }, { type: 'UNKNOWN' })
      expect(reducer).toEqual({ uid: '123', name: 'Test' })
    })
  })
})
