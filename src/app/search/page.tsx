'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaBook, FaUser, FaCalendarAlt, FaFileAlt, FaGraduationCap, FaGavel, FaNewspaper } from 'react-icons/fa';
import { getImageUrl } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import UnifiedLoader from '@/components/loading/UnifiedLoader';
import ErrorDisplay from '@/components/ErrorDisplay';

interface SearchResult {
  type: 'blog' | 'course' | 'author' | 'book' | 'event' | 'fatwa' | 'article';
  id: number | string;
  title: string;
  description?: string;
  slug?: string;
  url: string;
  image?: string;
  date?: string;
  author?: string;
  score?: number;
}

interface SearchResponse {
  success: boolean;
  query: string;
  results: SearchResult[];
  total: number;
  types: {
    article: number;
    blog: number;
    course: number;
    author: number;
    book: number;
    event: number;
    fatwa: number;
  };
}

const typeIcons = {
  article: FaNewspaper,
  blog: FaFileAlt,
  course: FaGraduationCap,
  author: FaUser,
  book: FaBook,
  event: FaCalendarAlt,
  fatwa: FaGavel,
};

const typeLabels: Record<string, string> = {
  article: 'مقالې',
  blog: 'د علم څرک',
  course: 'کورسونه',
  author: 'لیکوالان',
  book: 'کتابونه',
  event: 'علمی مجالس',
  fatwa: 'افتاء',
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchStats, setSearchStats] = useState<SearchResponse['types'] | null>(null);
  const { t, i18n } = useTranslation('common', { useSuspense: false });
  const isRTL = true; // Always RTL since website only has RTL languages

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setSearchStats(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data: SearchResponse = await response.json();

      if (data.success) {
        setResults(data.results || []);
        setSearchStats(data.types || null);
      } else {
        setError(data.error || 'د پلټنې پرمهال ستونزې رامنځته شوې');
        setResults([]);
      }
    } catch (err) {
      setError('د پلټنې پرمهال ستونزې رامنځته شوې');
      setResults([]);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [query, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ps-AF', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    const Icon = typeIcons[type] || FaFileAlt;
    return <Icon className="h-4 w-4" />;
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    return typeLabels[type] || type;
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-primary-100/60 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 text-center">
              پلټنه
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="دلته پلټنه وکړئ..."
                  className="flex-1 h-14 px-6 pr-14 rounded-xl border-2 border-primary-200 bg-primary-50 text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg text-right"
                  dir="rtl"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="پلټنه"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Search Stats */}
            {searchStats && query && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-600">
                <span className="font-semibold">
                  {results.length} پایلې موندل شوې
                </span>
                <span className="text-primary-400">|</span>
                {Object.entries(searchStats).map(([type, count]) => {
                  if (count > 0) {
                    return (
                      <span key={type} className="flex items-center gap-2">
                        {getTypeIcon(type as SearchResult['type'])}
                        <span>{getTypeLabel(type as SearchResult['type'])}: {count}</span>
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <UnifiedLoader />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mb-8">
            <ErrorDisplay message={error} />
          </div>
        )}

        {/* No Results */}
        {!loading && !error && query && results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-primary-100/60 p-12 text-center">
            <FaSearch className="h-16 w-16 text-primary-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              پایلې ونه موندل شوې
            </h2>
            <p className="text-primary-600">
              د "{query}" لپاره هیڅ پایلې ونه موندل شوې. مهرباني وکړئ بله پلټنه وکړئ.
            </p>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && results.length > 0 && (
          <div className="space-y-8">
            {Object.entries(groupedResults).map(([type, typeResults]) => (
              <div key={type} className="bg-white rounded-2xl shadow-lg border border-primary-100/60 overflow-hidden">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-primary-200">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    {getTypeIcon(type as SearchResult['type'])}
                    <h2 className="text-xl font-bold text-primary-900">
                      {getTypeLabel(type as SearchResult['type'])}
                      <span className="ml-2 text-sm font-normal text-primary-600">
                        ({typeResults.length})
                      </span>
                    </h2>
                  </div>
                </div>

                {/* Results List */}
                <div className="divide-y divide-primary-100">
                  {typeResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={result.url}
                      className="block p-6 hover:bg-primary-50 transition-colors duration-200 text-right"
                    >
                      <div className="flex gap-4 flex-row-reverse">
                        {/* Image */}
                        {result.image && (
                          <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-primary-100">
                            <Image
                              src={getImageUrl(result.image)}
                              alt={result.title}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-bold text-primary-900 mb-2 line-clamp-2">
                            {result.title}
                          </h3>
                          
                          {result.description && (
                            <p className="text-primary-600 text-sm md:text-base mb-3 line-clamp-2">
                              {result.description.replace(/<[^>]*>/g, '').substring(0, 150)}
                              {result.description.length > 150 ? '...' : ''}
                            </p>
                          )}

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-primary-500 flex-row-reverse">
                            {result.author && (
                              <span className="flex items-center gap-1">
                                <FaUser className="h-3 w-3" />
                                {result.author}
                              </span>
                            )}
                            {result.date && (
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt className="h-3 w-3" />
                                {formatDate(result.date)}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              {getTypeIcon(result.type)}
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State (No Query) */}
        {!query && !loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-primary-100/60 p-12 text-center">
            <FaSearch className="h-16 w-16 text-primary-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              پلټنه پیل کړئ
            </h2>
            <p className="text-primary-600">
              د پلټنې لپاره د پورته فورم ډک کړئ
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

