"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import i18n to avoid SSR issues
const ClientI18nSetup = dynamic(() => import('./ClientI18nSetup'), {
  ssr: false,
  loading: () => null
});

export default function ClientI18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <ClientI18nSetup pathname={pathname} />
      {children}
    </>
  );
}
