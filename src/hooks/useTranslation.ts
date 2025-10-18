"use client";

import { useEffect, useState } from 'react';
import { getTranslation } from '@/lib/translations';

export function useTranslation(namespace: string = 'common', options: { useSuspense?: boolean } = {}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ps');

  useEffect(() => {
    setIsHydrated(true);
    
    // Set language from localStorage or default to Pashto
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') || 'ps';
      setCurrentLanguage(savedLang);
    }
  }, []);

  // Listen for language changes from LanguageSwitcher
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLanguageChange = (event: CustomEvent) => {
        const newLang = event.detail.language || 'ps';
        setCurrentLanguage(newLang);
        // Force re-render by updating a dummy state
        setIsHydrated(false);
        setTimeout(() => setIsHydrated(true), 0);
      };

      window.addEventListener('languageChanged', handleLanguageChange as EventListener);
      return () => window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    }
  }, []);

  // Create a custom t function that handles hydration
  const t = (key: string, options?: { returnObjects?: boolean }) => {
    const language = !isHydrated ? 'ps' : currentLanguage;
    const translation = getTranslation(key, language);
    
    // If returnObjects is true, ensure we return an array for known array keys
    if (options?.returnObjects) {
      const arrayKeys = [
        'about.biography.famousKhalifasList',
        'about.biography.successorKhalifasList', 
        'about.biography.teachersList'
      ];
      
      if (arrayKeys.includes(key)) {
        // If translation is already an array, return it
        if (Array.isArray(translation)) {
          return translation;
        }
        // If translation is not an array, return empty array as fallback
        return [];
      }
    }
    
    return translation;
  };

  const i18n = {
    language: currentLanguage,
    changeLanguage: (lang: string) => {
      setCurrentLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
      }
    }
  };

  return {
    t,
    i18n
  };
}
