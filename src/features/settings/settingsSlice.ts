import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Project, SettingPage } from '../../types/types'

export interface SettingsState {
  page: SettingPage
  darkMode: boolean
  defaultProject?: Project
  break: string
  breakApplyRule: string
}

const initialState: SettingsState = { darkMode: true, page: 'settings', break: '0', breakApplyRule: '0' }

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
})

//SELECTOR
export const selectSettingPage = (state: RootState) => state.settings.page
export const selectDarkMode = (state: RootState) => state.settings.darkMode
export const selectDefaultProject = (state: RootState) => state.settings.defaultProject
export const selectBreak = (state: RootState) => state.settings.break
export const selectBreakApplyRule = (state: RootState) => state.settings.breakApplyRule

//ACTIONS
export const { setDarkMode, navigateBack, navigateTo, setBreak, setBreakApplyRule, setDefaultProject } = settingsSlice.actions

export default settingsSlice.reducer
