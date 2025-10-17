// components/iftah/IftahSection.tsx
import TraditionalContentSection from '../TraditionalContentSection';
import IslamicHeader from '../IslamicHeader';
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
  const sortedFatwas =
    fatwas
      ?.filter(iftah => iftah.is_published)
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)) || [];

  const displayFatwas = showAll ? sortedFatwas : sortedFatwas.slice(0, 5);

  return (
    <>
      <IslamicHeader
        title="Fatwa Department"
        subtitle="Islamic University - Ask about Islamic matters and get fatwas from our scholars"
        pageType="iftah"
        theme="slate"
        alignment="center"
      />
      <TraditionalContentSection 
        fatwas={displayFatwas}
        showAll={showAll}
        title="Islamic University"
        subtitle="Fatwa Department"
      />
      {/* <IftahQuestionForm /> */}
    </>
  );
}