// Simple utility for RTL support - always returns RTL for Pashto
export const getLanguageDirection = (_language?: string): 'ltr' | 'rtl' => {
  // Always RTL since we only use Pashto
  return 'rtl';
};

// Language name mapping for display (kept for backward compatibility)
export const getLanguageName = (code: string): string => {
  const names: { [key: string]: string } = {
    en: 'English',
    ps: 'پښتو',
    prs: 'دری'
  };
  return names[code] || code;
};

// Export default i18n object for backward compatibility (not used but kept to avoid breaking imports)
export default {
  language: 'ps',
  changeLanguage: () => {},
};
