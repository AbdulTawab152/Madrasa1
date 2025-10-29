// Load Pashto translations - using relative path to avoid Turbopack path resolution issues
import pashtoTranslationsData from '../locales/ps/common.json';

const pashtoTranslations = pashtoTranslationsData as Record<string, unknown>;

export function getTranslation(key: string, _language: string = 'ps'): unknown {
  const keys = key.split('.');
  let value: unknown = pashtoTranslations;
  
  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
          return key; // Return the key if not found
    }
  }
  
  return value;
}
