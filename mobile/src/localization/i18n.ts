import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './en/translation.json'
import translationBG from './bg/translation.json'

export const resources = {
  en: {
    translation: translationEN,
  },
  bg: {
    translation: translationBG,
  },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'bg',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})