/* eslint-disable import/export */
import { render as rtlRender } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import FirebaseProvider from '../firebase/FirebaseContext'
import { store as reduxStore } from '../store/store'

function render(ui: ReactElement, { store = reduxStore, ...renderOptions } = {}) {
  const AllTheProviders: FC = ({ children }) => {
    return (
      <Provider store={store}>
        <FirebaseProvider>{children}</FirebaseProvider>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
