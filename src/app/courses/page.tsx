'use client';

import { useMemo } from "react";

import CoursesSection from "../components/courses/courseCard";
import IslamicHeader from "../components/IslamicHeader";

import PageSkeleton from "@/components/loading/PageSkeleton";
import PaginationControls from "@/components/PaginationControls";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import { CoursesApi } from "@/lib/api";
import type { Course as CourseType } from "@/lib/types";

export default function CoursesPage() {
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
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader
        pageType="courses"
        title="Islamic Courses"
        alignment="center"
        // cta={{
        //   label: "Explore All Courses",
        //   href: "/courses",
        // }}
      />

      <div className="w-full mx-auto py-1 px-4 sm:px-6 lg:px-8">
        {isLoadingInitial ? (
          <PageSkeleton type="courses" showFilters={false} cardCount={6} />
        ) : error ? (
          <div className="max-w-3xl mx-auto text-center bg-red-50 border border-red-100 rounded-3xl p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">
              Unable to load courses
            </h2>
            <p className="text-red-600 mb-6">
              {error}. Please try refreshing the page.
            </p>
            <button
              onClick={() => void reload()}
              className="inline-flex items-center rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Retry loading courses
            </button>
          </div>
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
