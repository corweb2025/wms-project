// src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locales/es.json';
import ko from './locales/ko.json';

const resources = {
  es: { translation: es },
  ko: { translation: ko },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',                    // 기본 언어 = 스페인어
    fallbackLng: 'es',
    supportedLngs: ['es', 'ko'],
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'wms_language',
      caches: ['localStorage'],
    },
  });

export default i18n;