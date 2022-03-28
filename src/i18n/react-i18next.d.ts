/* eslint-disable @typescript-eslint/no-empty-interface */
import 'react-i18next'
import { resources } from './utils'

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en']
  interface Resources extends DefaultResources {}
}
