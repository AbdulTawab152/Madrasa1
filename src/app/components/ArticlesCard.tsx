'use client';

import Image from "next/image";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ArticlesApi } from "@/lib/api";
import PageSkeleton from "@/components/loading/PageSkeleton";
import PaginationControls from "@/components/PaginationControls";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import { getImageUrl } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

type RawArticle = {
  id: number;
  title: string;
  description: string;
  category?: { id: number; name: string } | null;
  category_id?: number;
  image?: string | null;
  video_url?: string | null;
  slug: string;
  date: string;
  is_published: number;
  is_top: number;
  created_at: string;
  updated_at: string;
};

interface ArticlesCardProps {
  limit?: number;
  showAll?: boolean;
  homePage?: boolean;
}

interface ArticleCardData {
  id: number;
  title: string;
  description: string;
  category: string;
  category_id: number | null;
  published_at?: string | null;
  image?: string | null;
  video_url?: string | null;
  slug: string;
  is_published: boolean;
  is_top: boolean;
}

interface ArticleCategory {
  id: number;
  name: string;
}

export default function ArticlesCard({ limit, showAll = true, homePage = false }: ArticlesCardProps) {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  // Function to clean HTML entities and unwanted characters
  const cleanText = (text: string): string => {
    if (!text) return '';
    
    return text
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Replace common HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      // Remove multiple spaces and normalize whitespace
      .replace(/\s+/g, ' ')
      // Remove leading/trailing whitespace
      .trim();
  };

  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const enablePagination = !homePage && showAll;
  const normalizedSearch = searchTerm.trim();



  const fetchArticles = useCallback(
    (params: Record<string, unknown>) =>
      ArticlesApi.getAll({
        ...params,
        search: homePage ? undefined : (normalizedSearch || undefined),
        category: homePage ? undefined : (selectedCategory || undefined),
      }),
    [normalizedSearch, selectedCategory, homePage]
  );

  const {
    items,
    isLoadingInitial,
    isFetchingMore,
    error,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    reload,
    page,
    totalPages,
  } = usePaginatedResource<RawArticle>(fetchArticles, {
    pageSize: limit ?? 12,
  });

  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (!enablePagination) {
      void reload();
      return;
    }

    void goToPage(1);
  }, [normalizedSearch, selectedCategory, enablePagination, goToPage, reload]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("🔍 Fetching categories from ArticlesApi");
        const response = await ArticlesApi.getCategories();
        
        if (response.success) {
          const data = response.data;
          console.log("📋 Categories data:", data);
          setCategories(Array.isArray(data) ? data : []);
        } else {
          console.error("❌ Category API failed:", response.error);
          // Optionally set an empty array or fallback categories on error
          setCategories([]); 
        }
      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const mappedArticles = useMemo<ArticleCardData[]>(
    () => {
      console.log("📄 Processing articles:", items.length);
      const mapped = items.map((item) => {
        let categoryName = "General";
        let categoryId: number | null = null;

        if (item.category) {
          if (typeof item.category === "string") {
            categoryName = item.category;
          } else if (typeof item.category === "object" && item.category && item.category.name) {
            categoryName = String(item.category.name);
            if (typeof item.category.id === "number") {
              categoryId = item.category.id;
            }
          }
        } else if (item.category_id) {
          categoryId = item.category_id;
          categoryName = String(item.category_id);
        }

        return {
          id: item.id,
          title: cleanText(item.title || "Untitled Article"),
          description: cleanText(item.description || ""),
          category: categoryName,
          category_id: categoryId,
          published_at: item.created_at || item.date,
          image: item.image,
          video_url: item.video_url,
          slug: item.slug || `article-${item.id}`,
          is_published: item.is_published === 1,
          is_top: Boolean(item.is_top),
        };
      });
      
      return mapped;
    },
    [items]
  );

  // Auto-update categories from articles when they change
  useEffect(() => {
    if (mappedArticles.length > 0) {
      // Extract unique categories from articles
      const articleCategories = [...new Set(mappedArticles.map(article => article.category))];
      console.log("🏷️ Categories found in articles:", articleCategories);
      
      // Create categories from articles if API categories are empty or different
      if (categories.length === 0 || 
          (categories.length > 0 && !articleCategories.every(cat => 
            categories.some(apiCat => apiCat.name === cat)
          ))) {
        console.log("🔄 Updating categories from articles");
        const fallbackCategories = articleCategories.map((name, index) => ({
          id: index + 1,
          name: name
        }));
        setCategories(fallbackCategories);
      }
    }
  }, [mappedArticles, categories.length]);

  const filteredArticles = useMemo(() => {
    if (!mappedArticles.length) {
      return mappedArticles;
    }

    if (homePage) {
      return mappedArticles;
    }

    const loweredSearch = normalizedSearch.toLowerCase();

    return mappedArticles.filter((article) => {
      const matchesSearch =
        !loweredSearch ||
        article.title.toLowerCase().includes(loweredSearch) ||
        article.description.toLowerCase().includes(loweredSearch) ||
        String(article.category).toLowerCase().includes(loweredSearch);

      const matchesCategory =
        !selectedCategory ||
        String(article.category) === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [mappedArticles, normalizedSearch, selectedCategory, homePage]);

  const displayArticles = limit
    ? filteredArticles.slice(0, limit)
    : filteredArticles;

  if (isLoadingInitial) {
    return <PageSkeleton type="articles" showFilters cardCount={6} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Articles
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => void reload()}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${homePage ? '' : 'min-h-screen'} bg-gradient-to-br from-gray-50 via-white to-blue-50`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Modern Category Filter - Hidden on Homepage */}
        {!homePage && (
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 justify-center bg-gradient-to-r from-blue-50 via-white to-cyan-50 py-5 px-3 rounded-2xl border border-blue-100 shadow-sm">
              {/* All Button */}
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-5 py-2.5 rounded-full text-base font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
                  ${
                    selectedCategory === ""
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105 ring-2 ring-blue-300"
                      : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:text-blue-900"
                  }
                `}
              >
                 <span className="inline-flex items-center gap-2">
                   <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m3 1a4 4 0 10-4-4 4 4 0 004 4zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   {t('home.allArticles')}
                 </span>
              </button>

              {/* Dynamic Category Buttons */}
              {categories.slice(0, showAllCategories ? categories.length : 4).map((cat) => {
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-5 py-2.5 rounded-full text-base font-semibold shadow-sm flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
                      ${
                        selectedCategory === cat.name
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105 ring-2 ring-blue-300"
                          : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:text-blue-900"
                      }
                    `}
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" opacity="0.2"/><circle cx="10" cy="10" r="5"/></svg>
                      {cat.name}
                    </span>
                  </button>
                );
              })}

              {/* More/Less Button */}
              {categories.length > 4 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="px-5 py-2.5 rounded-full text-base font-semibold border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <span className="inline-flex items-center gap-1">
                    {showAllCategories ? (
                      <>
                        <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24">
                          <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('home.showLess')}
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24">
                          <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {`+${categories.length - 4} ${t('home.showMore')}`}
                      </>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modern Article List Design */}
        {displayArticles.length > 0 ? (
          <div className="space-y-6">
            {displayArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group bg-white rounded-2xl transition-all duration-500 overflow-hidden cursor-pointer block"
              >
                <div className="flex flex-col h-96 lg:flex-row">
                  {/* Image Section */}
                  <div className="relative w-full lg:w-80 h-52 lg:h-auto overflow-hidden">
                    {(() => {
                      const imageUrl = getImageUrl(article.image);
                      return imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={article.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 320px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                          <div className="text-6xl text-blue-400">📄</div>
                        </div>
                      );
                    })()}
 
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-blue-700 border border-blue-200">
                        {String(article.category)}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2">
                      <div className="flex-1 space-y-10 min-w-0">
                        <h3 className="text-lg sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-700 transition-colors line-clamp-2 break-words">
                          {article.title}
                        </h3>
                        <p className="
                          text-gray-600 leading-relaxed mb-10 sm:mb-6 md:text-lg sm:text-base
                          line-clamp-4
                          sm:line-clamp-7
                          lg:line-clamp-6
                        ">
                          {article.description}
                        </p>
                      </div>
                    </div>

                    {/* Reading Time and Date */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-gray-300 text-8xl mb-6">📚</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              No Articles Found
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No articles available at the moment"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {enablePagination && !limit && displayArticles.length > 0 && (
          <PaginationControls
            className="mt-12"
            page={page}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPreviousPage}
            onPageChange={(target) => void goToPage(target)}
            isBusy={isFetchingMore}
          />
        )}
      </div>
    </div>
  );
}