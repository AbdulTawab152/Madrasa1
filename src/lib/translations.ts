// Simple translation function for SSR compatibility
import enCommon from '../locales/en/common.json';
import psCommon from '../locales/ps/common.json';
import prsCommon from '../locales/prs/common.json';

const translations = {
  en: enCommon,
  ps: psCommon,
  prs: prsCommon
};

export function getTranslation(key: string, language: string = 'ps'): string {
  const keys = key.split('.');
  let value: any = translations[language as keyof typeof translations] || translations.ps;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      // Fallback to Pashto if key not found
      value = translations.ps;
      for (const fallbackKey of keys) {
        value = value?.[fallbackKey];
        if (value === undefined) {
          return key; // Return the key if not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}
