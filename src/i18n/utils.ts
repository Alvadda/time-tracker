import de from './de.translation.json'
import en from './en.translation.json'

export const resources = {
  en: { translation: en },
  de: { translation: de },
}

export const supportedLngs = ['de', 'en']

export const isLanguageSupported = (language?: unknown) => {
  if (!language || typeof language !== 'string') return false

  return supportedLngs.includes(language)
}
