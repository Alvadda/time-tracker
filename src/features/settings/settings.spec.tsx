import settingReducer, { navigateBack, navigateTo, setDarkMode } from './settingsSlice'

describe('feature/settings', () => {
  describe('reducer', () => {
    test('darkMode', () => {
      let reducer = settingReducer(undefined, setDarkMode(true))
      expect(reducer.darkMode).toEqual(true)

      reducer = settingReducer(reducer, setDarkMode(false))
      expect(reducer.darkMode).toEqual(false)
    })

    test('navigation', () => {
      let reducer = settingReducer(undefined, navigateTo('projects'))
      expect(reducer.page).toEqual('projects')

      reducer = settingReducer(reducer, navigateTo('settings'))
      expect(reducer.page).toEqual('settings')

      reducer = settingReducer(reducer, navigateTo('customer'))
      expect(reducer.page).toEqual('customer')

      reducer = settingReducer(reducer, navigateBack())
      expect(reducer.page).toEqual('settings')
    })

    test('unknown action', () => {
      const reducer = settingReducer(undefined, { type: 'UNKNOWN' })
      expect(reducer).toEqual({ darkMode: true, page: 'settings' })
    })
  })
})
