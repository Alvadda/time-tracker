/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import moment from 'moment'
import { initReactI18next } from 'react-i18next'
import { resources, supportedLngs } from './utils'

export { isLanguageSupported, supportedLngs } from './utils'

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

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language)
  moment.locale(language)
}

export default i18n
