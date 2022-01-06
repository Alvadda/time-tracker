import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { SettingPage } from '../../types/types'

export interface SettingsState {
  darkMode: boolean
  page: SettingPage
}

const initialState: SettingsState = { darkMode: true, page: 'settings' }

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
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
export const selectDarkMode = (state: RootState) => state.settings.darkMode
export const selectSettingPage = (state: RootState) => state.settings.page

//ACTIONS
export const { setDarkMode, navigateBack, navigateTo } = settingsSlice.actions

export default settingsSlice.reducer
