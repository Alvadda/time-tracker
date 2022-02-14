import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
import { AppSettings, SettingPage } from '../../types'

export interface SettingsState {
  page: SettingPage
  appSettings: AppSettings
}

const initialState: SettingsState = {
  page: 'settings',
  appSettings: { darkMode: true, defaultProjectId: '', defaultBreak: '0', defaultBreakRule: '0' },
}

const getSettings = createAsyncThunk<AppSettings | undefined, undefined, { state: RootState; extra: Extra }>(
  'settings/get',
  async (_, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) return undefined

    return await extra.user.get(auth.uid)
  }
)

const updateSettings = createAsyncThunk<AppSettings, undefined, { state: RootState; extra: Extra }>(
  'settings/update',
  async (_, { getState, extra }) => {
    const { auth, settings } = getState()
    if (!auth?.uid) throw new Error('User needs to be logged in')

    return await extra.user.updateSettings(auth.uid, settings.appSettings)
  }
)

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
    setBreak: (state, action: PayloadAction<string>) => {
      state.appSettings.defaultBreak = action.payload
    },
    setBreakApplyRule: (state, action: PayloadAction<string>) => {
      state.appSettings.defaultBreakRule = action.payload
    },
    setRate: (state, action: PayloadAction<string>) => {
      state.appSettings.defaultRate = action.payload
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
        state.appSettings = action.payload
      }
    })
    builder.addCase(updateSettings.fulfilled, (state, action) => {
      state.appSettings = action.payload
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

//ACTIONS
export const { setDarkMode, navigateBack, navigateTo, setBreak, setBreakApplyRule, setDefaultProjectId, setRate } = settingsSlice.actions
export { getSettings, updateSettings }

export default settingsSlice.reducer
