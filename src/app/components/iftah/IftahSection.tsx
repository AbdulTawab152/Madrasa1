"use client";

// components/iftah/IftahSection.tsx
import DarulUloomIftahSection from './DarulUloomIftahSection';
import { useTranslation } from '@/hooks/useTranslation';
// import IftahQuestionForm from './IftahQuestionForm';

interface Author {
  name: string;
  bio?: string;
}

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  references?: string[];
  is_published?: boolean;
  viewCount?: number;
}

interface IftahSectionProps {
  fatwas: Iftah[];
  showAll?: boolean;
}

export default function IftahSection({ fatwas, showAll = false }: IftahSectionProps) {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };
  
  const sortedFatwas =
    fatwas
      ?.filter(iftah => {
        // Handle both boolean and number formats for is_published
        const isPublished = iftah.is_published;
        if (typeof isPublished === 'boolean') return isPublished;
        if (typeof isPublished === 'number') return isPublished === 1;
        // If not specified, include it by default
        return true;
      })
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)) || [];

  const displayFatwas = showAll ? sortedFatwas : sortedFatwas.slice(0, 5);
  
  console.log('📋 IftahSection received fatwas:', fatwas?.length || 0, 'filtered to:', sortedFatwas.length, 'displaying:', displayFatwas.length);

  return (
    <>
      <DarulUloomIftahSection 
        fatwas={displayFatwas}
        showAll={showAll}
        title={t('iftah.universityTitle')}
        subtitle={t('iftah.departmentSubtitle')}
      />
      {/* <IftahQuestionForm /> */}
    </>
  );
}