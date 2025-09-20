"use client";

import React, { useState } from 'react';
import { useLanguage, Language } from './LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: t('lang.english'), flag: '🇺🇸' },
    { code: 'hi' as Language, name: t('lang.hindi'), flag: '🇮🇳' },
    { code: 'sa' as Language, name: t('lang.sanskrit'), flag: '🕉️' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 transition-colors duration-200 text-white"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-[#ffffff] rounded-lg shadow-xl z-50 border border-[#fca311]/20">
          <div className="py-2">
            <div className="px-3 py-2 text-xs font-semibold text-[#14213d] border-b border-[#e5e5e5]">
              {t('lang.select')}
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-3 py-2 hover:bg-[#e5e5e5] transition-colors duration-200 flex items-center space-x-3 ${
                  language === lang.code ? 'bg-[#fca311]/10 text-[#14213d]' : 'text-[#14213d]'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 text-[#fca311] ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;