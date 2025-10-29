"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize i18n on client side only
    if (typeof window !== 'undefined') {
      // Extract language from URL path
      const pathSegments = pathname?.split('/') || [];
      const potentialLang = pathSegments[1];
      
      // Check if the first segment is a valid language code
      const validLanguages = ['en', 'ps', 'prs'];
      if (validLanguages.includes(potentialLang)) {
        i18n.changeLanguage(potentialLang);
      } else {
        // Default to Pashto if no language is specified
        i18n.changeLanguage('ps');
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
