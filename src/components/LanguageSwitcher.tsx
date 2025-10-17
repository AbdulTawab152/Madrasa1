"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getLanguageDirection } from '@/lib/i18n';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ps', name: 'پښتو', flag: '🇦🇫' },
  { code: 'prs', name: 'دری', flag: '🇦🇫' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[1]); // Default to Pashto

  useEffect(() => {
    // Get current language from localStorage or URL
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') || 'ps';
      const lang = languages.find(l => l.code === savedLang) || languages[1];
      setCurrentLanguage(lang);
    }
  }, []);

  const isRTL = getLanguageDirection(currentLanguage.code) === 'rtl';

  const handleLanguageChange = (locale: string) => {
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', locale);
    }
    
    // Update document attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = getLanguageDirection(locale);
    
    // Update current language state
    const lang = languages.find(l => l.code === locale) || languages[1];
    setCurrentLanguage(lang);
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: locale } }));
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-800 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus-visible:outline-none ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className={`hidden sm:inline ${isRTL ? 'text-right' : 'text-left'}`}>{currentLanguage.name}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`absolute top-full mt-2 w-48 rounded-xl border border-primary-100 bg-white shadow-xl transition-all duration-200 ${
          isRTL ? 'left-0' : 'right-0'
        } ${
          isOpen ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        role="menu"
      >
        <ul className="py-2">
          {languages.map((language) => (
            <li key={language.code}>
              <button
                onClick={() => handleLanguageChange(language.code)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus-visible:outline-none ${
                  isRTL ? 'flex-row-reverse' : ''
                } ${
                  currentLanguage.code === language.code
                    ? "bg-primary-50 font-semibold text-primary-700"
                    : "text-primary-700 hover:bg-primary-50 hover:text-primary-600"
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className={isRTL ? 'text-right' : 'text-left'}>{language.name}</span>
                {currentLanguage.code === language.code && (
                  <svg className="ml-auto h-4 w-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
