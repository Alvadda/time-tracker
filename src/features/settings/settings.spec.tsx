/* eslint-disable @typescript-eslint/no-empty-function */
import { AppSettings } from '../../types'
import settingReducer, {
  navigateBack,
  navigateTo,
  setDarkMode,
  setDefaultBreak,
  setDefaultBreakRule,
  setDefaultProjectId,
  setDefaultRate,
} from './settingsSlice'

describe('feature/settings', () => {
  describe('reducer', () => {
    const appSettings: AppSettings = {
      darkMode: true,
      defaultProjectId: '',
      defaultBreak: 0,
      defaultBreakRule: 0,
      defaultRate: 0,
      language: 'en',
    }
    test('appSettings default', () => {
      const reducer = settingReducer(undefined, setDarkMode(true))
      expect(reducer.appSettings).toEqual(appSettings)
    })

    test('appSettings darkMode', () => {
      let reducer = settingReducer(undefined, setDarkMode(false))
      expect(reducer.appSettings.darkMode).toEqual(false)

      reducer = settingReducer(reducer, setDarkMode(true))
      expect(reducer.appSettings.darkMode).toEqual(true)
    })

    test('appSettings defaultProjectId', () => {
      const reducer = settingReducer(undefined, setDefaultProjectId('1234'))
      expect(reducer.appSettings.defaultProjectId).toEqual('1234')
    })

    test('appSettings defaultBreak', () => {
      let reducer = settingReducer(undefined, setDefaultBreak(30))
      expect(reducer.appSettings.defaultBreak).toEqual(30)

      reducer = settingReducer(undefined, setDefaultBreak(''))
      expect(reducer.appSettings.defaultBreak).toEqual('')
    })

    test('appSettings defaultBreakRule', () => {
      let reducer = settingReducer(undefined, setDefaultBreakRule(6))
      expect(reducer.appSettings.defaultBreakRule).toEqual(6)

      reducer = settingReducer(reducer, setDefaultBreakRule(''))
      expect(reducer.appSettings.defaultBreakRule).toEqual('')
    })

    test('appSettings defaultRate', () => {
      let reducer = settingReducer(undefined, setDefaultRate(30))
      expect(reducer.appSettings.defaultRate).toEqual(30)

      reducer = settingReducer(reducer, setDefaultRate(''))
      expect(reducer.appSettings.defaultRate).toEqual('')
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
      expect(reducer).toEqual({ page: 'settings', appSettings })
    })
  })
})
