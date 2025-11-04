// Simple utility for RTL support - returns direction based on language
export const getLanguageDirection = (language?: string): 'ltr' | 'rtl' => {
  // Get language from parameter or localStorage
  const lang = language || (typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null) || 'ps';
  
  // RTL languages: Pashto, Dari, Arabic, Persian, Urdu
  const rtlLanguages = ['ps', 'prs', 'ar', 'fa', 'ur'];
  
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
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
