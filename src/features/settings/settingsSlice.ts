import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, RootState } from '../../store/store'
import { Project, SettingPage, Settings } from '../../types/types'

export interface SettingsState {
  page: SettingPage
  darkMode: boolean
  defaultProject?: Project
  break: string
  breakApplyRule: string
}

const initialState: SettingsState = { darkMode: true, page: 'settings', break: '0', breakApplyRule: '0' }

const getSettings = createAsyncThunk<Settings | undefined, undefined, { state: RootState; extra: Extra }>(
  'settings/get',
  async (_, { getState, extra }) => {
    const { auth } = getState()
    if (!auth?.uid) return undefined
    return await extra.user.get(auth.uid)
  }
)

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
    setDefaultProject: (state, action: PayloadAction<Project | undefined>) => {
      state.defaultProject = action.payload
    },
    setBreak: (state, action: PayloadAction<string>) => {
      state.break = action.payload
    },
    setBreakApplyRule: (state, action: PayloadAction<string>) => {
      state.breakApplyRule = action.payload
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
      ;(state.darkMode = Boolean(action.payload?.darkMode)),
        (state.break = action.payload?.defaultBreak || ''),
        (state.breakApplyRule = action.payload?.defaultBreakRule || '')
    })
  },
})

//SELECTOR
export const selectSettingPage = (state: RootState) => state.settings.page
export const selectDarkMode = (state: RootState) => state.settings.darkMode
export const selectDefaultProject = (state: RootState) => state.settings.defaultProject
export const selectBreak = (state: RootState) => state.settings.break
export const selectBreakApplyRule = (state: RootState) => state.settings.breakApplyRule

//ACTIONS
export const { setDarkMode, navigateBack, navigateTo, setBreak, setBreakApplyRule, setDefaultProject } = settingsSlice.actions
export { getSettings }

export default settingsSlice.reducer
