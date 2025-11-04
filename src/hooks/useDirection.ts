"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to get the current text direction based on language
 * Returns 'ltr' for English and 'rtl' for Pashto and other RTL languages
 */
export function useDirection(): 'ltr' | 'rtl' {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');

  useEffect(() => {
    const updateDirection = () => {
      if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('i18nextLng') || 'ps';
        const isRTL = savedLang === 'ps' || savedLang === 'prs' || savedLang === 'ar' || savedLang === 'fa' || savedLang === 'ur';
        setDirection(isRTL ? 'rtl' : 'ltr');
      }
    };

    // Initial direction
    updateDirection();

    // Listen for language changes
    const handleLanguageChange = () => {
      updateDirection();
    };

    window.addEventListener('languagechange', handleLanguageChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'i18nextLng') {
        updateDirection();
      }
    });

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  return direction;
}

