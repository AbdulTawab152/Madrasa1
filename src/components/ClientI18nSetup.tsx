"use client";

import { useEffect } from 'react';
import i18n, { getLanguageDirection } from '@/lib/i18n';

interface ClientI18nSetupProps {
  pathname: string | null;
}

export default function ClientI18nSetup({ pathname }: ClientI18nSetupProps) {
  useEffect(() => {
    if (!pathname) return;

    // Extract language from URL path
    const pathSegments = pathname.split('/');
    const potentialLang = pathSegments[1];
    
    // Check if the first segment is a valid language code
    const validLanguages = ['en', 'ps', 'prs'];
    if (validLanguages.includes(potentialLang)) {
      i18n.changeLanguage(potentialLang);
    } else {
      // Default to Pashto if no language is specified
      i18n.changeLanguage('ps');
    }
  }, [pathname]);

  useEffect(() => {
    // Set document direction based on current language
    const currentLang = i18n.language || 'ps';
    const direction = getLanguageDirection(currentLang);
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  return null;
}
