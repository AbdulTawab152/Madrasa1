"use client";

import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, UserRound, Star } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import type { Course as CourseType } from "@/lib/types";
import { useTranslation } from "@/hooks/useTranslation";
import { ComingSoonEmptyState } from "@/components/EmptyState";

interface CoursesSectionProps {
  courses: CourseType[];
  showAll?: boolean;
  heading?: {
    title?: string;
    subtitle?: string;
    eyebrow?: string;
  };
}

const fallbackCourseImage = "/placeholder-course.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stripHtml = (value?: string | null) =>
  (value || "")
    .replace(/<[^>]*>/g, " ")  // Remove HTML tags
    .replace(/&nbsp;/g, " ")   // Remove &nbsp; entities
    .replace(/&amp;/g, "&")    // Replace &amp; with &
    .replace(/&lt;/g, "<")      // Replace &lt; with <
    .replace(/&gt;/g, ">")      // Replace &gt; with >
    .replace(/&quot;/g, '"')    // Replace &quot; with "
    .replace(/&#39;/g, "'")     // Replace &#39; with '
    .replace(/\s+/g, " ")       // Replace multiple spaces with single space
    .trim();

const formatDate = (t: (key: string) => string, value?: string | null) => {
  if (!value) return t('courses.recentlyUpdated');
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t('courses.recentlyUpdated');
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const instructorName = (course: CourseType, t: (key: string) => string) => {
  const { recorded_by: instructor } = course;
  if (!instructor) return t('courses.instructorFallback');
  const parts = [instructor.first_name, instructor.last_name].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : t('courses.instructorFallback');
};

export default function CoursesSection({
  courses,
  showAll = false,
  heading,
}: CoursesSectionProps) {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  // Debug logging
  console.log('CoursesSection - courses:', courses);
  console.log('CoursesSection - courses length:', courses?.length);
  const publishedCourses = (courses || [])
    .filter((course) => {
      try {
        return Number(course.is_published) === 1;
      } catch (error) {
        console.error('Error filtering course:', course, error);
        return false;
      }
    })
    .sort((a, b) => {
      try {
        const aDate = new Date(
          a.publish_date || a.created_date || a.created_at || "",
        ).getTime();
        const bDate = new Date(
          b.publish_date || b.created_date || b.created_at || "",
        ).getTime();
        if (Number.isNaN(aDate) || Number.isNaN(bDate)) return 0;
        return bDate - aDate;
      } catch (error) {
        console.error('Error sorting courses:', error);
        return 0;
      }
    });

  const displayCourses = showAll
    ? publishedCourses
    : publishedCourses.slice(0, 3);

  if (displayCourses.length === 0) {
    return (
      <section className="px-4 pb-16 pt-2 sm:px-6 lg:px-8">
        <ComingSoonEmptyState
          title={t('courses.freshCourses')}
          description={t('courses.curatingMessage')}
          className="max-w-4xl mx-auto"
        />
      </section>
    );
  }

  return (
    <section className="px-4 pb-16 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {heading ? (
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl space-y-4 text-center"
          >
            {heading.eyebrow ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-600">
                {heading.eyebrow}
              </span>
            ) : null}
            {heading.title ? (
              <h2 className="text-3xl font-semibold text-primary-900 md:text-4xl">
                {heading.title}
              </h2>
            ) : null}
            {heading.subtitle ? (
              <p className="text-sm text-primary-600 sm:text-base">
                {heading.subtitle}
              </p>
            ) : null}
          </motion.header>
        ) : null}

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.08 }}
          className="grid gap-5  sm:px-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayCourses.map((course) => {
            try {
              const coverImage =
                getImageUrl(course.image, fallbackCourseImage) ??
                fallbackCourseImage;
              const publishedOn = formatDate(
                t,
                course.publish_date || course.created_date || course.created_at
              );

            return (
              <motion.article
                key={course.id}
                variants={cardVariants}
                className="h-full sm:px-4"
              >
                <div className="group flex h-full flex-col rounded-3xl border border-gray-200/50 bg-white transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-amber-400/50 hover:shadow-amber-100/20">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-3xl relative">
                    <Image
                      src={coverImage}
                      alt={course.title}
                      fill
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        console.error('Image load error:', coverImage, e);
                        e.currentTarget.src = fallbackCourseImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <ArrowUpRight className="h-4 w-4 text-amber-600" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2 px-4 py-4">
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                        {publishedOn}
                      </span>

                      <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-amber-600 transition-colors duration-500 line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed line-clamp-2 text-xs">
                        {stripHtml(course.description) || t('courses.immersiveLearning')}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <CourseMetaItem
                        icon={<Clock className="h-3.5 w-3.5" />}
                        label={course.duration || t('courses.selfPaced')}
                      />
                      <CourseMetaItem
                        icon={<BookOpen className="h-3.5 w-3.5" />}
                        label={
                          course.video_quantity
                            ? `${course.video_quantity} ${t('courses.lessons')}`
                            : t('courses.flexibleLearning')
                        }
                      />
                    </div>

                    <div className="mt-auto pt-3">
                      <div className="flex items-center gap-2 mb-3 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md group-hover:scale-105 transition-all duration-300">
                          <UserRound className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-700 truncate transition-colors duration-300">{instructorName(course, t)}</p>
                      </div>

                      <Link
                        href={`/courses/${course.slug}`}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-2.5 px-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/30 focus:ring-offset-2 transform group-hover:shadow-xl"
                      >
                        <span className="text-xs">{t('courses.viewCourse')}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
            } catch (error) {
              console.error('Error rendering course card:', course, error);
              return null;
            }
          })}
        </motion.div>
      </div>
    </section>
  );
}

const CourseMetaItem = ({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 rounded-md bg-gray-50/50 px-2 py-1.5">
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600">
      {icon}
    </span>
    <span className="text-xs font-medium text-gray-700 truncate">{label}</span>
  </div>
);
