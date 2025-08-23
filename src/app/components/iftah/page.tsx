// components/iftah/IftahSection.tsx
import Link from "next/link";

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
    <div className="w-full">
      {!showAll && (
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {showAll ? "All Iftah" : "Featured Fatwas"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showAll
              ? "Explore our complete collection of fatwas"
              : "Discover our most read and featured fatwas"}
          </p>
        </div>
      )}

      {/* List style instead of cards */}
      <div className="divide-y divide-gray-200">
        {displayFatwas.map((iftah, index) => (
          <div key={iftah.slug} className="py-8 group">
            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              <Link href={`/iftah/${iftah.slug}`}>{iftah.title}</Link>
            </h3>

            {/* Meta */}
            <div className="text-sm text-gray-500 mt-1 mb-3">
              {iftah.mufti ? `🕌 ${iftah.mufti.name}` : "Anonymous"} •{" "}
              {iftah.viewCount || 0} views
            </div>

            {/* Question */}
            <p className="text-gray-700 text-base leading-relaxed line-clamp-2">
              {iftah.question}
            </p>

            {/* Answer Preview */}
            <p className="mt-2 text-gray-500 italic line-clamp-2">
              {iftah.answer}
            </p>

            {/* Read more link */}
            <Link
              href={`/iftah/${iftah.slug}`}
              className="inline-block mt-4 text-blue-600 font-medium hover:underline"
            >
              Read Full Fatwa →
            </Link>
          </div>
        ))}
      </div>

      {!showAll && displayFatwas.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/iftah"
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg"
          >
            Explore All Fatwas
          </Link>
        </div>
      )}
    </div>
  );
}
