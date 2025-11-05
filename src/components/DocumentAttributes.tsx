"use client";

import { useEffect } from 'react';

export default function DocumentAttributes() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const updateAttributes = () => {
        // Get language from localStorage or default to 'ps'
        const savedLang = localStorage.getItem('i18nextLng') || 'ps';
        
        // Set language attribute for font selection
        document.documentElement.lang = savedLang;
        
        // Always set RTL direction since website only has RTL languages
        document.documentElement.dir = 'rtl';
        
        // Also set body direction to ensure consistency
        document.body.dir = 'rtl';
      };
      
      // Initialize immediately
      updateAttributes();
      
      // Listen for custom language change events (dispatched by LanguageSwitcher)
      const handleLanguageChange = () => {
        updateAttributes();
      };
      
      // Listen for storage changes (for cross-tab synchronization)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'i18nextLng') {
          updateAttributes();
        }
      };
      
      window.addEventListener('languagechange', handleLanguageChange);
      window.addEventListener('storage', handleStorageChange);
      
      // Also poll periodically to catch any direct localStorage changes (safety fallback)
      const interval = setInterval(() => {
        updateAttributes();
      }, 2000);
      
      return () => {
        window.removeEventListener('languagechange', handleLanguageChange);
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, []);

  return null;
}
