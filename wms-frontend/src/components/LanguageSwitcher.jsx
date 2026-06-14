// src/components/LanguageSwitcher.jsx
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'ko', label: 'KO', name: '한국어' },
];

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 언어 선택 시 즉시 닫기
  const selectLanguage = (lng) => {
    setIsOpen(false);           // 먼저 팝업 닫기
    changeLanguage(lng);        // 그 후 언어 변경
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
      >
        <Globe size={17} />
        <span className="tracking-wider">{currentLanguage.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                currentLanguage === lang.code 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              <span>{lang.name}</span>
              <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}