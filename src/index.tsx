import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Workbox } from 'workbox-window'
import { App } from './App'
import './i18n'
import { store } from './store/store'

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js')
    wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('Service worker activated for the first time!')
      }
    })
    wb.register()
  }
}

const container = document.body.appendChild(document.createElement('div'))
const root = createRoot(container)
root.render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<p>...Loading</p>}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
)
