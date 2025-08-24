// app/iftah/[slug]/page.tsx
import { IftahApi } from "../../../lib/api";
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
  isPublished?: boolean;
  viewCount?: number;
  is_published?: boolean;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function IftahDetailsPage({ params }: Params) {
  const { slug } = await params;

  // Fetch iftah details from API
  const res = await IftahApi.getAll();
  const iftahItems = Array.isArray(res.data) ? (res.data as Iftah[]) : [];
  const iftah: Iftah | undefined = iftahItems.find(f => f.slug === slug);

  if (!iftah) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Fatwa Not Found</h1>
          <p className="text-gray-600 mb-6">The requested fatwa could not be found.</p>
          <Link
            href="/iftah"
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Fatwas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-32 bg-gradient-to-b from-amber-50/30 to-white">
      {/* Breadcrumb Navigation */}
    {/* Enhanced Breadcrumb Navigation */}
<nav className="bg-gradient-to-r from-amber-50 to-orange-100 border-b border-amber-200 py-4">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center space-x-2">
      <Link 
        href="/" 
        className="inline-flex items-center text-orange-700 hover:text-orange-900 transition-colors group font-medium"
      >
        <svg className="w-5 h-5 mr-2 text-orange-500 group-hover:text-orange-700 transition-colors" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Home
      </Link>
      
      <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
      
      <Link 
        href="/iftah" 
        className="inline-flex items-center text-orange-700 hover:text-orange-900 transition-colors font-medium"
      >
        <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Fatwas
      </Link>
      
      <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
      
      <span className="text-orange-900 font-semibold truncate max-w-xs md:max-w-sm lg:max-w-md" title={iftah.title}>
        {iftah.title}
      </span>
    </div>
  </div>
</nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-sm mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {iftah.title}
          </h1>
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500">Mufti</p>
                <p className="font-medium text-gray-900">{iftah.mufti?.name || "Unknown"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm3.5 1a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 2a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 2a.5.5 0 000 1h5a.5.5 0 000-1h-5z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium text-gray-900">{iftah.category || "General"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500">Views</p>
                <p className="font-medium text-gray-900">{iftah.viewCount || 0}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-gray-900">
                  {iftah.is_published ? (
                    <span className="text-green-600">Published</span>
                  ) : (
                    <span className="text-amber-600">Draft</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-6">
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center mr-4 flex-shrink-0 shadow-sm">
              <span className="text-amber-700 font-bold text-lg">Q</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Question</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{iftah.question}</p>
            </div>
          </div>
        </div>

        {/* Answer Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-sm border border-amber-200 mb-8">
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center mr-4 flex-shrink-0 shadow-sm">
              <span className="text-amber-800 font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Answer</h2>
              <p className="text-gray-800 text-lg leading-relaxed">{iftah.answer}</p>
            </div>
          </div>
        </div>

        {/* Tags and References */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tags */}
          {iftah.tags && iftah.tags.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {iftah.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {iftah.references && iftah.references.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                References
              </h3>
              <ul className="space-y-2">
                {iftah.references.map((reference, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    {reference}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/iftah"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Fatwas
          </Link>
        </div>
      </main>
    </div>
  );
}