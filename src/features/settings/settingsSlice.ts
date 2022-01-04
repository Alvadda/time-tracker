import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'

export interface SettingsState {
  darkMode: boolean
}

const initialState: SettingsState = { darkMode: true }

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
  },
})

//SELECTOR
export const selectDarkMode = (state: RootState) => state.settings.darkMode

//ACTIONS
export const { setDarkMode } = settingsSlice.actions

export default settingsSlice.reducer
