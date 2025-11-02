'use client';

import { useMemo } from "react";

import CoursesSection from "../components/courses/courseCard";
import IslamicHeader from "../components/IslamicHeader";

import UnifiedLoader from "@/components/loading/UnifiedLoader";
import PaginationControls from "@/components/PaginationControls";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import { CoursesApi } from "@/lib/api";
import type { Course as CourseType } from "@/lib/types";
import { useTranslation } from "@/hooks/useTranslation";
import ErrorDisplay from "@/components/ErrorDisplay";

export default function CoursesPage() {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };
  
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
  } = usePaginatedResource<CourseType>((params) => CoursesApi.getAll(params), {
    pageSize: 12,
  });

  const courses = useMemo(() => {
    const deduped = new Map<number, CourseType>();
    items.forEach((course) => {
      if (course && typeof course.id === "number") {
        deduped.set(course.id, course);
      }
    });
    return Array.from(deduped.values());
  }, [items]);

  return (
    <main className="w-full min-h-screen ">
      <IslamicHeader
        pageType="courses"
        alignment="center"
        // cta={{
        //   label: "Explore All Courses",
        //   href: "/courses",
        // }}
      />

      <div className="w-full mx-auto py-1 px-4 sm:px-6 lg:px-8">
        {isLoadingInitial ? (
          <UnifiedLoader variant="card-grid" count={6} showFilters={false} />
        ) : error ? (
          <ErrorDisplay 
            error={error} 
            variant="full" 
            onRetry={() => void reload()}
          />
        ) : (
          <CoursesSection courses={courses} showAll={true} />
        )}

        {!isLoadingInitial && !error && courses.length > 0 && (
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
    </main>
  );
}
