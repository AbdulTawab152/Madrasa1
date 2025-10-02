"use client";

import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock, UserRound } from "lucide-react";

import { Card, CardContent, CardFooter, CardMedia } from "../Card";
import { getImageUrl } from "@/lib/utils";
import type { Course as CourseType } from "@/lib/types";

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
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatDate = (value?: string | null) => {
  if (!value) return "Recently updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const instructorName = (course: CourseType) => {
  const { recorded_by: instructor } = course;
  if (!instructor) return "Haq Madrasa";
  const parts = [instructor.first_name, instructor.last_name].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "Haq Madrasa";
};

export default function CoursesSection({
  courses,
  showAll = false,
  heading,
}: CoursesSectionProps) {
  const publishedCourses = (courses || [])
    .filter((course) => Number(course.is_published) === 1)
    .sort((a, b) => {
      const aDate = new Date(
        a.publish_date || a.created_date || a.created_at || "",
      ).getTime();
      const bDate = new Date(
        b.publish_date || b.created_date || b.created_at || "",
      ).getTime();
      if (Number.isNaN(aDate) || Number.isNaN(bDate)) return 0;
      return bDate - aDate;
    });

  const displayCourses = showAll
    ? publishedCourses
    : publishedCourses.slice(0, 3);

  if (displayCourses.length === 0) {
    return (
      <section className="py- text-center">
        <div className="mx-auto max-w-2xl space-y-4 rounded-3xl border border-primary-100/60 bg-white/95 p-12 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)]">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-500">
            Coming soon
          </p>
          <h2 className="text-2xl font-semibold text-primary-900">
            Fresh courses are on the way
          </h2>
          <p className="text-primary-600">
            We are curating new learning experiences. Please check back shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
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
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayCourses.map((course) => {
            const coverImage =
              getImageUrl(course.image, fallbackCourseImage) ??
              fallbackCourseImage;
            const publishedOn = formatDate(
              course.publish_date || course.created_date || course.created_at,
            );

            return (
              <motion.article
                key={course.id}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="group flex h-full flex-col rounded-2xl border border-primary-100/60 bg-white/95 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-24px_rgba(15,23,42,0.4)]">
                  <CardMedia className="aspect-[16/9]" gradientOverlay={false}>
                    <Image
                      src={coverImage}
                      alt={course.title}
                      fill
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </CardMedia>

                  <CardContent className="gap-3.5 px-5 pb-2.5 pt-5">
                    <div className="space-y-2.5">
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-500">
                        {publishedOn}
                      </span>

                      <Link
                        href={`/courses/${course.slug}`}
                        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-primary-900 transition-colors duration-300 group-hover:text-primary-600">
                          {course.title}
                        </h3>
                      </Link>

                      <p className="text-sm leading-relaxed text-primary-600 line-clamp-2">
                        {stripHtml(course.description) ||
                          "An immersive learning journey curated by our scholars."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 text-[13px] font-medium text-primary-700 sm:grid-cols-2">
                      <CourseMetaItem
                        icon={<Clock className="h-3.5 w-3.5" />}
                        label={course.duration || "Self paced"}
                      />
                      <CourseMetaItem
                        icon={<BookOpen className="h-3.5 w-3.5" />}
                        label={
                          course.video_quantity
                            ? `${course.video_quantity} lessons`
                            : "Flexible learning"
                        }
                      />
                    </div>

                    <CardFooter className="!mt-0 border-t border-primary-100/60 pt-2">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 shadow-inner shadow-primary-100/70 ring-1 ring-primary-100/70">
                          <UserRound className="h-4 w-4" />
                        </span>
                        <span>{instructorName(course)}</span>
                      </div>

                      <Link
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        View course
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </CardContent>
                </Card>
              </motion.article>
            );
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
  <div className="flex items-center gap-2 rounded-xl border border-primary-100/70 bg-white/85 px-3 py-2 shadow-sm backdrop-blur">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-100/80 via-white to-primary-200/70 text-primary-600 shadow-inner shadow-primary-200/60 ring-1 ring-primary-300/50">
      {icon}
    </span>
    <span className="truncate text-primary-800">{label}</span>
  </div>
);
