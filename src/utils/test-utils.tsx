/* eslint-disable import/export */
import { LocalizationProvider } from '@mui/lab'
import AdapterMoment from '@mui/lab/AdapterMoment'
import { CssBaseline } from '@mui/material'
import { render as rtlRender } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { store as reduxStore } from '../store/store'

function render(ui: ReactElement, { store = reduxStore, ...renderOptions } = {}) {
  const AllTheProviders: FC = ({ children }) => {
    return (
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
