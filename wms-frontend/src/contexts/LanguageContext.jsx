// src/contexts/LanguageContext.jsx
import { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('wms_language', lng);
  };

  const currentLanguage = i18n.language || 'es';

  useEffect(() => {
    const savedLang = localStorage.getItem('wms_language');
    if (savedLang && ['es', 'ko'].includes(savedLang)) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};