"use client";

import SanadSection from "../components/sanad/SanadSection";
import IslamicHeader from "../components/IslamicHeader";
import { useTranslation } from "@/hooks/useTranslation";

export default function SanadPage() {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a string-safe wrapper function
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  return (
    <main className="notranlate w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="sanad" 
        title={t('sanad.title')}
        subtitle={t('sanad.description')}
        alignment="center"
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <SanadSection showAll={true} showHero={false} />
      </div>
    </main>
  );
}
