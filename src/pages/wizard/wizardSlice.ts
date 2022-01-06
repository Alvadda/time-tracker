import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { Page } from '../../types/types'

export interface WizardState {
  currentPage: Page
}

const initialState: WizardState = { currentPage: 'time-tracker' }

export const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload
    },
  },
})

//SELECTOR
export const selectCurrentPage = (state: RootState) => state.wizard.currentPage

//ACTIONS
export const { navigateTo } = wizardSlice.actions

export default wizardSlice.reducer
