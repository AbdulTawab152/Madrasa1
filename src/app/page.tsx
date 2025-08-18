import { Suspense } from "react";
import Image from "next/image";
import Hero from "../app/herosection/page";
import About from "../app/about/page";
import Blogs from "../app/components/blog/BlogCard";
import Course from "../app/components/courses/courseCard";
import FeaturedBooks from "../app/components/books/FeaturedBooks";
import { fetchWithCache } from "../lib/api";
import { endpoints } from "../lib/config";
import { Blog, Course as CourseType } from "../lib/types";

async function fetchBlogsData(): Promise<Blog[]> {
  try {
    const data = await fetchWithCache<Blog[]>(endpoints.blogs);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

async function fetchCourseData(): Promise<CourseType[]> {
  try {
    const data = await fetchWithCache<CourseType[]>(endpoints.courses);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function HomePage() {
  const [blogs, courses] = await Promise.all([
    fetchBlogsData(),
    fetchCourseData()
  ]);

  return (
    <div className="min-h-screen bg-background-primary">
      <Hero />
      <About />

        <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="spinner w-8 h-8"></div>
          <span className="ml-3 text-gray-600">Loading courses...</span>
        </div>
      }>
        <Course courses={courses} showAll={false} />
      </Suspense>
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="spinner w-8 h-8"></div>
          <span className="ml-3 text-gray-600">Loading books...</span>
        </div>
      }>
        <FeaturedBooks showAll={false} />
      </Suspense>

      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="spinner w-8 h-8"></div>
          <span className="ml-3 text-gray-600">Loading blogs...</span>
        </div>
      }>
        <Blogs blogs={blogs} showAll={false} />
      </Suspense>

    
    </div>
  );
}
