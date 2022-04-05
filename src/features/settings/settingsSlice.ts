import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
import { AppSettings, NumberOrEmpty, SettingPage, TimesheetInfos } from '../../types'

export interface SettingsState {
  page: SettingPage
  appSettings: AppSettings
  timesheetInfos?: TimesheetInfos
}

const initialState: SettingsState = {
  page: 'settings',
  appSettings: { darkMode: true, defaultProjectId: '', defaultBreak: 0, defaultBreakRule: 0, defaultRate: 0, language: 'en' },
}

const getSettings = createAsyncThunk<
  Pick<SettingsState, 'appSettings' | 'timesheetInfos'> | undefined,
  undefined,
  { state: RootState; extra: Extra }
>('settings/get', async (_, { getState, extra }) => {
  const { auth } = getState()
  if (!auth?.uid) return undefined

  return await extra.user.get(auth.uid)
})

const updateAppSettings = createAsyncThunk<AppSettings, undefined, { state: RootState; extra: Extra }>(
  'settings/app/update',
  async (_, { getState, extra }) => {
    const { auth, settings } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.user.updateAppSettings(auth.uid, settings.appSettings)
  }
)
const updateTimesheetInfoSettings = createAsyncThunk<
  TimesheetInfos | undefined,
  TimesheetInfos | undefined,
  { state: RootState; extra: Extra }
>('settings/timesheetInfo/update', async (timesheetInfos, { getState, extra }) => {
  const { auth } = getState()
  if (!auth?.uid) throw new Error('User needs to be logged in')

  return await extra.user.updateTimesheetInfoSettings(auth.uid, timesheetInfos)
})

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.appSettings.darkMode = action.payload
    },
    setDefaultProjectId: (state, action: PayloadAction<string>) => {
      state.appSettings.defaultProjectId = action.payload
    },
    setDefaultBreak: (state, action: PayloadAction<NumberOrEmpty>) => {
      state.appSettings.defaultBreak = action.payload
    },
    setDefaultBreakRule: (state, action: PayloadAction<NumberOrEmpty>) => {
      state.appSettings.defaultBreakRule = action.payload
    },
    setDefaultRate: (state, action: PayloadAction<NumberOrEmpty>) => {
      state.appSettings.defaultRate = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.appSettings.language = action.payload
    },
    setTimesheetInfos: (state, action: PayloadAction<TimesheetInfos>) => {
      state.timesheetInfos = action.payload
    },
    navigateTo: (state, action: PayloadAction<SettingPage>) => {
      state.page = action.payload
    },
    navigateBack: (state) => {
      state.page = 'settings'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSettings.fulfilled, (state, action) => {
      if (action.payload) {
        ;(state.appSettings = action.payload.appSettings), (state.timesheetInfos = action.payload.timesheetInfos)
      }
    })
    builder.addCase(updateAppSettings.fulfilled, (state, action) => {
      state.appSettings = action.payload
    })
    builder.addCase(updateTimesheetInfoSettings.fulfilled, (state, action) => {
      state.timesheetInfos = action.payload
    })
  },
})

//SELECTOR
export const selectSettingPage = (state: RootState) => state.settings.page
export const selectDarkMode = (state: RootState) => state.settings.appSettings.darkMode
export const selectDefaultProjectId = (state: RootState) => state.settings.appSettings.defaultProjectId
export const selectDefaultBreak = (state: RootState) => state.settings.appSettings.defaultBreak
export const selectDefaultBreakRule = (state: RootState) => state.settings.appSettings.defaultBreakRule
export const selectDefaultRate = (state: RootState) => state.settings.appSettings.defaultRate
export const selectLanguage = (state: RootState) => state.settings.appSettings.language
export const selectTimesheetInfos = (state: RootState) => state.settings.timesheetInfos

//ACTIONS
export const {
  setDarkMode,
  navigateBack,
  navigateTo,
  setDefaultBreak,
  setDefaultBreakRule,
  setDefaultProjectId,
  setDefaultRate,
  setLanguage,
  setTimesheetInfos,
} = settingsSlice.actions
export { getSettings, updateAppSettings, updateTimesheetInfoSettings }

export default settingsSlice.reducer
