import Image from 'next/image';
import { fetchWithCache } from '../../../lib/api';
import { endpoints } from '../../../lib/config';
import { Fatwa } from '../../../lib/types';

interface IftahPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchIftah(slug: string): Promise<Fatwa> {
  try {
    const data = await fetchWithCache<Fatwa>(`${endpoints.fatwa}/${slug}`);
    return data;
  } catch (error) {
    throw new Error("Iftah not found");
  }
}

export default async function IftahDetailPage({ params }: IftahPageProps) {
  const { slug } = await params;
  const iftah = await fetchIftah(slug);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{iftah.title}</h1>

        {iftah.mufti && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">
              <strong>Mufti:</strong> {iftah.mufti.name || `${iftah.mufti.first_name} ${iftah.mufti.last_name}`}
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Question</h2>
            <p className="text-gray-700 leading-relaxed">{iftah.question}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Answer</h2>
            <p className="text-gray-700 leading-relaxed">{iftah.answer}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Category:</strong> {iftah.category || "N/A"}
            </div>
            <div>
              <strong>Published:</strong> {iftah.is_published ? "Yes" : "No"}
            </div>
            <div>
              <strong>View Count:</strong> {iftah.viewCount || 0}
            </div>
          </div>

          {iftah.references && iftah.references.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">References</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {iftah.references.map((reference, index) => (
                  <li key={index}>{reference}</li>
                ))}
              </ul>
            </div>
          )}

          {iftah.tags && iftah.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {iftah.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
