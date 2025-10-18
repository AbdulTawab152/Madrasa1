"use client";

// components/iftah/IftahSection.tsx
import TraditionalContentSection from '../TraditionalContentSection';
import IslamicHeader from '../IslamicHeader';
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
      ?.filter(iftah => iftah.is_published)
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)) || [];

  const displayFatwas = showAll ? sortedFatwas : sortedFatwas.slice(0, 5);

  return (
    <>
      <IslamicHeader
        title={t('iftah.title')}
        subtitle={t('iftah.subtitle')}
        pageType="iftah"
        theme="slate"
        alignment="center"
      />
      <TraditionalContentSection 
        fatwas={displayFatwas}
        showAll={showAll}
        title={t('iftah.universityTitle')}
        subtitle={t('iftah.departmentSubtitle')}
      />
      {/* <IftahQuestionForm /> */}
    </>
  );
}