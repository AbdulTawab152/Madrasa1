"use client";

import { useEffect } from 'react';
import { getLanguageDirection } from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Get language from localStorage or default to Pashto
    const savedLang = localStorage.getItem('language') || 'ps';
    const validLanguages = ['en', 'ps', 'prs'];
    const currentLang = validLanguages.includes(savedLang) ? savedLang : 'ps';

    // Set document direction and language
    const direction = getLanguageDirection(currentLang);
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLang;
  }, []);

  return <>{children}</>;
}