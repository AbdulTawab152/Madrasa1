"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import PaginationControls from "@/components/PaginationControls";
import { BlogsApi } from "@/lib/api";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import { getImageUrl } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { ComingSoonEmptyState } from "@/components/EmptyState";
import UnifiedLoader from "@/components/loading/UnifiedLoader";
import ErrorDisplay from "@/components/ErrorDisplay";

interface BlogItem {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  image?: string | null;
  category?: { name?: string | null } | null;
  is_published?: boolean | number | null;
  is_top?: boolean | number | null;
  created_at?: string | null;
  published_at?: string | null;
}

interface BlogsPreviewProps {
  limit?: number;
  homePage?: boolean;
}

const fallbackImage = "/placeholder-blog.jpg";

// Remove custom skeleton - using UnifiedLoader instead

function resolveCoverImage(img?: string | null) {
  if (!img) return fallbackImage;
  return getImageUrl(img, fallbackImage) || fallbackImage;
}

function formatDate(value?: string | null, t?: (key: string) => string) {
  if (!value) return t ? t('blog.recentlyUpdated') : "Recently updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return t ? t('blog.recentlyUpdated') : "Recently updated";
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogsPreview({ limit, homePage }: BlogsPreviewProps) {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(t('blog.all'));
  const [mounted, setMounted] = useState(false);
  const enablePagination = !homePage;

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchBlogs = useCallback(
    (params: Record<string, unknown>) =>
      BlogsApi.getAll({
        ...params,
        category:
          !homePage && selectedCategory !== "All"
            ? selectedCategory
            : undefined,
        // Remove is_top filter from API call - we'll filter on frontend
      }),
    [homePage, selectedCategory]
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
  } = usePaginatedResource<BlogItem>(fetchBlogs, {
    pageSize: limit ?? 12,
  });

  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    void goToPage(1);
  }, [selectedCategory, goToPage]);

  const publishedBlogs = useMemo(
    () => items.filter((item) => Boolean(item.is_published)),
    [items]
  );

  const curatedBlogs = useMemo(() => {
    if (homePage) {
      // Filter for blogs where is_top is truthy (1, true, "1", etc.)
      const topBlogs = publishedBlogs.filter((item) => {
        return item.is_top === 1 || item.is_top === true || String(item.is_top) === "1";
      }).slice(0, 3);
      
      // If no top blogs found, show first 3 published blogs as fallback
      if (topBlogs.length === 0) {
        console.log('ℹ️ No featured blogs found. Showing first 3 published blogs.');
        return publishedBlogs.slice(0, 3);
      }
      
      console.log(`✅ Found ${topBlogs.length} featured blogs for home page`);
      return topBlogs;
    }
    return publishedBlogs;
  }, [homePage, publishedBlogs]);

  const categories = useMemo(
    () =>
      [
        t('blog.all'),
        ...new Set(
          publishedBlogs.map((item) => item.category?.name || t('blog.general'))
        ),
      ],
    [publishedBlogs, t]
  );

  const filteredBlogs = useMemo(() => {
    let next = [...curatedBlogs];
    if (!homePage && selectedCategory !== t('blog.all')) {
      next = next.filter((item) => item.category?.name === selectedCategory);
    }
    if (limit) {
      next = next.slice(0, limit);
    }
    return next;
  }, [curatedBlogs, homePage, limit, selectedCategory, t]);

  if (isLoadingInitial && filteredBlogs.length === 0) {
    return <UnifiedLoader variant="card-grid" count={limit ?? 6} showFilters={!homePage} />;
  }

  if (error) {
    return (
      <section className="bg-background-primary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <ErrorDisplay 
            error={error} 
            variant="inline" 
            onRetry={() => void reload()}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="bg-background-primary py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {!homePage && categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white border-primary-600 shadow-md"
                      : "bg-white text-primary-700 border-primary-100 hover:border-primary-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {filteredBlogs.length === 0 ? (
            <ComingSoonEmptyState
              title={t('blog.noBlogsAvailable')}
              description={t('blog.checkBackSoon')}
              className="max-w-2xl mx-auto"
            />
          ) : (
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {filteredBlogs.map((item) => {
                if (!item) return null;
                return (
                  <motion.article
                    key={item.slug}
                    variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary-100/60 bg-white/95 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium"
                  >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={resolveCoverImage(item.image)}
                      alt={item.title || 'Blog post'}
                      width={720}
                      height={480}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={homePage}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                        {item.category?.name || t('blog.general')}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-full flex-col gap-5 p-6">
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold text-primary-900 line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-primary-600 text-sm leading-relaxed line-clamp-3">
                        {item.description?.replace(/<[^>]*>/g, "") ||
                          t('blog.noSummaryAvailable')}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-primary-100/60 pt-4 text-sm text-primary-700">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary-500" />
                        <span>{formatDate(item.published_at || item.created_at, t)}</span>
                      </span>
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors duration-200 hover:bg-primary-100"
                      >
                        {t('blog.readMore')}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
                );
              })}
            </motion.div>
          )}

          {enablePagination && filteredBlogs.length > 0 && (
            <PaginationControls
              className="mt-12 w-full"
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPreviousPage}
              onPageChange={(target) => void goToPage(target)}
              isBusy={isFetchingMore}
            />
          )}
        </div>
      </section>
  );
}
