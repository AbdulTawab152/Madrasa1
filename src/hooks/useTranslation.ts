"use client";

import { useEffect, useState } from 'react';
import { getTranslation } from '@/lib/translations';

export function useTranslation(namespace: string = 'common', options: { useSuspense?: boolean } = {}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Create a custom t function that always returns Pashto text
  const t = (key: string, options?: { returnObjects?: boolean }): string | string[] => {
    const translation = getTranslation(key, 'ps');
    
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
    
    // Ensure we always return a string for non-array contexts
    if (typeof translation === 'string') {
      return translation;
    }
    
    // If translation is not a string, return the key as fallback
    return key;
  };

  const i18n = {
    language: 'ps', // Always Pashto
    changeLanguage: () => {
      // Pashto is the only language, do nothing
    }
  };

  return {
    t,
    i18n
  };
}
