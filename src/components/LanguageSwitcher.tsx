"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaGlobe } from 'react-icons/fa';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ps', name: 'پښتو', flag: '🇦🇫' },
  { code: 'prs', name: 'دری', flag: '🇦🇫' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    setCurrentLang(savedLang);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('i18nextLng', langCode);
    
    // Dispatch custom event for font and direction updates
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('languagechange', { detail: { lang: langCode } });
      window.dispatchEvent(event);
      
      // Also update document attributes immediately
      document.documentElement.lang = langCode;
      // Always set RTL since website only has RTL languages
      document.documentElement.dir = 'rtl';
    }
    
    setIsOpen(false);
    router.refresh();
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];
  const isRTL = true; // Always RTL since website only has RTL languages

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 bg-white border border-primary-200 rounded-lg shadow-sm hover:bg-primary-50 transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
        aria-label="Language selector"
      >
        <FaGlobe className="text-primary-600" size={14} />
        <span className="font-medium text-sm text-primary-900">{currentLanguage.code.toUpperCase()}</span>
        <FaChevronDown 
          className={`text-primary-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          size={12} 
        />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 z-50 bg-white border border-primary-200 rounded-lg shadow-xl min-w-[160px] ${
          isRTL ? 'right-0' : 'left-0'
        }`}>
          <ul className="py-1">
            {languages.map((language) => {
              const isActive = language.code === currentLang;
              return (
                <li key={language.code}>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150 ${
                      isRTL ? 'flex-row-reverse justify-start' : ''
                    } ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-primary-700 hover:bg-primary-50 hover:text-primary-900'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
