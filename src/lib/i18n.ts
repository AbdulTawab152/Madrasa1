import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../locales/en/common.json';
import psCommon from '../locales/ps/common.json';
import prsCommon from '../locales/prs/common.json';

// Define resources from JSON files
const resources = {
  en: {
    common: enCommon
  },
  ps: {
    common: psCommon
  },
  prs: {
    common: prsCommon
  }
};

// Initialize i18n with SSR-safe configuration
i18n
  .use(initReactI18next)
  .init({
    resources,
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