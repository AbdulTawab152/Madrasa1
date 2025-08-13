// app/components/courses/CoursesCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Course } from "../../courses/data";
import { PlayCircle, Clock, Video } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group relative border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/30 transition-all duration-500 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Resolution Badge */}
        <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {course.resolution.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors duration-300">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {course.description}
        </p>

        {/* Extra Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-blue-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Video size={16} className="text-blue-500" />
            <span>{course.video_quantity} Videos</span>
          </div>
        </div>

        {/* Button */}
        <Link href={`/courses/${course.slug}`}>
          <button className="relative w-full flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-lg hover:shadow-blue-500/50 transition-all duration-500 group">
            <PlayCircle size={18} className="group-hover:scale-110 transition-transform duration-300" />
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
