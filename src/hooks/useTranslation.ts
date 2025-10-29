"use client";

import { getTranslation } from '@/lib/translations';

export function useTranslation(namespace: string = 'common', options: { useSuspense?: boolean } = {}) {
  // Create a simple t function that returns Pashto text from common.json
  const t = (key: string, options?: { returnObjects?: boolean }): string | any => {
    const translation = getTranslation(key);
    
    // If returnObjects is true, check for arrays
    if (options?.returnObjects && Array.isArray(translation)) {
      return translation;
    }
    
    // If not an array and returnObjects is not requested, return as is
    return translation;
  };

  // Mock i18n object for compatibility
  const i18n = {
    language: 'ps', // Always Pashto
    changeLanguage: () => {
      // No-op since we only have Pashto
    }
  };

  return {
    t,
    i18n
  };
}
