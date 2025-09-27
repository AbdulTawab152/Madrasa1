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

type RawArticle = {
  id: number;
  title: string;
  description: string;
  category?: { id: number; name: string } | null;
  category_id?: number;
  image?: string | null;
  slug: string;
  date: string;
  is_published: number;
  is_top: number;
  created_at: string;
  updated_at: string;
};

interface ArticlesCardProps {
  limit?: number;
}

interface ArticleCardData {
  id: number;
  title: string;
  description: string;
  category: string;
  category_id: number | null;
  published_at?: string | null;
  image?: string | null;
  slug: string;
  is_published: boolean;
  is_top: boolean;
}

interface ArticleCategory {
  id: number;
  name: string;
}

export default function ArticlesCard({ limit }: ArticlesCardProps) {
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const enablePagination = typeof limit === "undefined";
  const normalizedSearch = searchTerm.trim();

  const fetchArticles = useCallback(
    (params: Record<string, unknown>) =>
      ArticlesApi.getAll({
        ...params,
        search: normalizedSearch || undefined,
        category: selectedCategory || undefined,
      }),
    [normalizedSearch, selectedCategory]
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
        const response = await fetch("/api/articles/category");
        if (response.ok) {
          const data = (await response.json()) as ArticleCategory[];
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const mappedArticles = useMemo<ArticleCardData[]>(
    () =>
      items.map((item) => {
        let categoryName = "General";
        let categoryId: number | null = null;

        if (item.category) {
          if (typeof item.category === "string") {
            categoryName = item.category;
          } else if (typeof item.category === "object" && item.category.name) {
            categoryName = item.category.name;
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
          title: item.title || "Untitled Article",
          description: item.description || "",
          category: categoryName,
          category_id: categoryId,
          published_at: item.created_at || item.date,
          image: item.image,
          slug: item.slug || `article-${item.id}`,
          is_published: item.is_published !== false,
          is_top: Boolean(item.is_top),
        };
      }),
    [items]
  );

  const filteredArticles = useMemo(() => {
    if (!mappedArticles.length) {
      return mappedArticles;
    }

    const loweredSearch = normalizedSearch.toLowerCase();

    return mappedArticles.filter((article) => {
      const matchesSearch =
        !loweredSearch ||
        article.title.toLowerCase().includes(loweredSearch) ||
        article.description.toLowerCase().includes(loweredSearch) ||
        article.category.toLowerCase().includes(loweredSearch);

      const matchesCategory =
        !selectedCategory ||
        article.category === selectedCategory ||
        (article.category_id !== null &&
          String(article.category_id) === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [mappedArticles, normalizedSearch, selectedCategory]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {displayArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  {(() => {
                    const imageUrl = getImageUrl(article.image);
                    return imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                        <div className="text-6xl text-amber-400">📚</div>
                      </div>
                    );
                  })()}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">
                      Article
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <svg
                        className="w-4 h-4 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {article.category}
                    </span>
                    {article.is_top && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 ml-2">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.description.replace(/<[^>]*>/g, "")}
                  </p>

                  <div className="text-xs text-gray-500">
                    {article.published_at?.split("T")[0] || "Unknown date"}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary-600 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Read Article
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-amber-100">
            <div className="text-gray-300 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Articles Found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No articles available at the moment"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

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
