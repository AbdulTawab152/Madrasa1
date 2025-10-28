import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n with SSR-safe configuration - Pashto is the main language
i18n
  .use(initReactI18next)
  .init({
    lng: 'ps', // default language - Pashto
    fallbackLng: 'ps',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Namespace configuration
    defaultNS: 'common',
    ns: ['common'],

    // SSR configuration
    react: {
      useSuspense: false,
    },

    // Additional SSR safety
    initImmediate: false,
  });

// Language direction mapping
export const getLanguageDirection = (language: string): 'ltr' | 'rtl' => {
  const rtlLanguages = ['ps', 'prs', 'ar', 'fa', 'ur'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

// Language name mapping for display
export const getLanguageName = (code: string): string => {
  const names: { [key: string]: string } = {
    en: 'English',
    ps: 'پښتو',
    prs: 'دری'
  };
  return names[code] || code;
};

export default i18n;
