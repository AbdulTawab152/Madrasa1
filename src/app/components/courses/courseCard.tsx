"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "../../../lib/utils";

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

export default function CoursesSection({ courses, showAll = false }: CoursesSectionProps) {
  const sortedCourses =
    courses
      ?.filter(course => course.is_published === 1)
      .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()) || [];

  const [visibleCount, setVisibleCount] = useState(showAll ? sortedCourses.length : 6);
  const displayCourses = showAll ? sortedCourses.slice(0, visibleCount) : sortedCourses.slice(0, 4);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="w-full mx-auto px-4">
      {/* Hero Section */}
      {showAll && (
        <section className="relative w-full mt-0 mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 z-0"></div>
          <div className="relative z-10 py-10 md:py-10 px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Our Courses
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-black leading-tight">
              Discover{" "}
              <span className="text-amber-600">
                Courses
              </span>{" "}
              <br className="hidden md:block" />
              That{" "}
              <span className="relative inline-block">
                Inspire
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore our curated collection of Islamic courses and tutorials. Learn, grow, and advance your knowledge at your own pace.
            </p>
          </div>
        </section>
      )}

      {/* Featured Section Header */}
      {!showAll && (
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full shadow-sm">
            🌟 Featured
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Discover Our{" "}
            <span className="text-amber-600">
              Most Popular
            </span>{" "}
            Programs
          </h2>
          <p className="text-black max-w-2xl mx-auto">
            Carefully selected Islamic learning programs that guide you on a journey of knowledge, faith, and growth.
          </p>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayCourses.map(course => {
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
                
                {/* Video Count Badge */}
                <div className="absolute top-3 left-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  📹 {course.video_quantity} Videos
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="text-amber-500 text-xs">⏱️</span>
                  <span className="text-black font-medium text-xs">{course.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {course.title}
                </h3>
                
                <div
                  className="text-black text-sm mb-4 flex-1 line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
                
                <Link href={`/courses/${course.slug}`} className="mt-auto">
                  <button className="w-full bg-amber-600 text-white font-medium py-2 px-3 rounded-md hover:bg-amber-700 transition-all duration-300 text-sm shadow-sm">
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      )}

      {/* Explore All Button (only in Featured section) */}
      {!showAll && displayCourses.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Link href="/courses">
            <button className="inline-flex items-center gap-2 px-5 py-2 bg-amber-600 
                               text-white font-medium text-sm rounded-md shadow-sm 
                               hover:bg-amber-700 transition-all duration-300">
              Explore All Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
