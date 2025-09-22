"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "../../../lib/utils";
import { FaVideo } from "react-icons/fa6";

interface Course {
  id: number;
  title: string;
  slug: string;
  book_id: number;
  recorded_by_id: number;
  description: string;
  publish_date: string;
  created_date: string;
  is_published: number;
  duration: string;
  video_quantity: number;
  resolution: string;
  space: string;
  short_video: string;
  image: string;
}


interface CoursesSectionProps {
  courses: Course[];
  showAll?: boolean;
}

export default function CoursesSection({
  courses,
  showAll = false,
}: CoursesSectionProps) {
  const sortedCourses =
    courses
      ?.filter((course) => course.is_published === 1)
      .sort(
        (a, b) =>
          new Date(b.publish_date).getTime() -
          new Date(a.publish_date).getTime()
      ) || [];

  const [visibleCount, setVisibleCount] = useState(
    showAll ? sortedCourses.length : 6
  );
  const displayCourses = showAll
    ? sortedCourses.slice(0, visibleCount)
    : sortedCourses.slice(0, 4);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="w-full">
      {/* Enhanced Hero Section */}
      {showAll && (
        <div className="  ">
          <section className="relative w-full mt-0 overflow-hidden">
            {/* Enhanced Background Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 w-full h-full">
              {/* Main background image with a soft blur and color overlay */}
              <Image
                src="/1.jpg"
                alt="Courses background"
                fill
                priority
                className="object-cover object-center w-full h-full opacity-90"
                style={{
                  filter:
                    "blur(1.5px) brightness(0.6) saturate(1.15) contrast(1.1)",
                }}
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/60 via-gray-600/50 to-amber-900/40 w-full h-full" />

              {/* Animated floating orbs for extra visual interest */}
              <motion.div
                className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-orange-200/40 to-yellow-200/40 rounded-full blur-3xl"
                animate={{
                  x: [0, 60, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"
                animate={{
                  x: [0, -50, 0],
                  y: [0, 40, 0],
                  scale: [1, 0.95, 1],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Decorative accent dots */}
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-400/60 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-400/80 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-orange-300/70 rounded-full animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 py-20 md:py-16 px-6 flex flex-col items-center text-center">
              {/* Animated headline */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight drop-shadow-2xl"
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.18), 0 1px 0 #fff",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-orange-600 drop-shadow-lg">Discover</span>{" "}
                <span className="relative">
                  <span className="text-orange-500 drop-shadow-lg">
                    Courses
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-orange-200/80 rounded-full -z-10 blur-[2px]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
                <br className="hidden md:block" />
                <span className="text-gray-700 drop-shadow-lg">That</span>{" "}
                <span className="relative inline-block">
                  <span className="text-orange-400 drop-shadow-lg">
                    Inspire
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-orange-100/90 rounded-full blur-[1px]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                  />
                </span>
              </motion.h1>

              {/* Animated description */}
              <motion.p
                className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-14 leading-relaxed font-light drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="inline-block bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/20">
                  Explore our curated collection of Islamic courses and
                  tutorials.
                  <br className="hidden md:inline" />
                  <span className="text-amber-400 font-semibold">
                    {" "}
                    Learn
                  </span>,{" "}
                  <span className="text-orange-400 font-semibold">grow</span>,
                  and{" "}
                  <span className="text-yellow-400 font-semibold">advance</span>{" "}
                  your knowledge at your own pace.
                </span>
              </motion.p>
              {/* Decorative divider */}
              <motion.div
                className="w-32 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 mx-auto mb-2 shadow-lg"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.7, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </section>
        </div>
      )}

      {/* Enhanced Featured Section Header */}
      {!showAll && (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🌟 Featured
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Discover Our{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Most Popular
            </span>{" "}
            Courses
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Carefully selected Islamic learning courses that guide you on a
            journey of knowledge, faith, and growth.
          </motion.p>
        </motion.div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 mt-20 px-4 md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayCourses.map((course) => {
          if (!course.is_published) return null;

          const imageUrl = getImageUrl(course.image);

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 
                         overflow-hidden border border-amber-100 flex flex-col h-[400px] group"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={course.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <span className="text-4xl">📚</span>
                  </div>
                )}

                {/* Enhanced Video Count Badge with Icon */}
                <motion.div
                  className="absolute top-3 left-3 bg-orange/500/2 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur-sm flex items-center gap-1.5"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <FaVideo size={20}/>
                  </svg>
                  {course.video_quantity}
                </motion.div>

                {/* Enhanced Duration Badge */}
                <motion.div
                  className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <svg
                    className="w-3 h-3 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 font-semibold text-xs ">
                    {" "}
                    Hours : {course.duration}
                  </span>
                </motion.div>

                {/* Resolution Badge */}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {course.title}
                </h3>

                <div className="text-sm text-black leading-relaxed">
                    <span
                      className="line-clamp-3 block"
                      dangerouslySetInnerHTML={{ __html: course.description }}
                    />
                  </div>


                <Link href={`/courses/${course.slug}`} className="mt-auto">
                  <button className="w-full bg-amber-600 text-white font-medium py-2 px-3 rounded-md hover:bg-amber-700 transition-all duration-300 text-sm shadow-sm outline-none focus:outline-none focus:ring-0">
                    View Course
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* See More Button */}
      {showAll && visibleCount < sortedCourses.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSeeMore}
            className="inline-flex items-center gap-2 px-5 py-2 bg-amber-600 
                       text-white font-medium text-sm rounded-md shadow-sm 
                       hover:bg-amber-700 transition-all duration-300"
          >
            See More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Explore All Button (only in Featured section) */}
      {!showAll && displayCourses.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Link href="/courses">
            <button
              className="inline-flex items-center gap-2 px-5 py-2 bg-amber-600 
                               text-white font-medium text-sm rounded-md shadow-sm 
                               hover:bg-amber-700 transition-all duration-300"
            >
              Explore All Courses
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
