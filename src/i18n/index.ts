/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources, supportedLngs } from './utils'

export { isLanguageSupported } from './utils'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  supportedLngs,
  debug: false,
  keySeparator: false,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
