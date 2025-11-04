import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ruTranslations from './locales/ru.json'
import uzTranslations from './locales/uz.json'
import enTranslations from './locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ruTranslations },
      uz: { translation: uzTranslations },
      en: { translation: enTranslations },
    },
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'uz', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n

