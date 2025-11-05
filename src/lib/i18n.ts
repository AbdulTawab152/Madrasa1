// Simple utility for RTL support - always returns RTL since website only has RTL languages
export const getLanguageDirection = (language?: string): 'ltr' | 'rtl' => {
  // Always return RTL since website only has RTL languages (Pashto, Dari, Arabic, Persian, Urdu)
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
