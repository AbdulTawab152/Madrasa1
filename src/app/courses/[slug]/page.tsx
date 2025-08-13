// app/event/[slug]/page.tsx
import React from "react";

interface CourseDetail {
  id: number;
  title: string;
  slug: string;
  book_id: number;
  recorded_by_id: number;
  description: string;
  publish_date: string;
  created_date: string;
  is_published: boolean;
  duration?: string;
  video_quantity?: number;
  resolution?: "hd" | string;
  space?: number;
  short_video?: boolean;
  image?: string;
}

async function fetchCourseDetail(slug: string): Promise<CourseDetail> {
  const API_URL = `https://lawngreen-dragonfly-304220.hostingersite.com/api/course/${slug}`;
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch course detail");
  }
  return res.json();
}




export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await fetchCourseDetail(params.slug);

  if (!course) return <div>دوره‌ای یافت نشد.</div>;

  return (
    <main className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <img
        src={course.image || "https://via.placeholder.com/600x400"}
        alt={course.title}
        className="w-full h-auto rounded-lg mb-6"
      />
      <p className="text-gray-700 leading-relaxed">{course.description}</p>

      <div className="mt-6 text-gray-600 text-sm space-y-1">
        <p>Publish Date: {new Date(course.publish_date).toLocaleDateString()}</p>
        <p>Created Date: {new Date(course.created_date).toLocaleDateString()}</p>
        {course.duration && <p>Duration: {course.duration}</p>}
        {course.video_quantity !== undefined && <p>Video Quantity: {course.video_quantity}</p>}
        {course.resolution && <p>Resolution: {course.resolution}</p>}
        {course.space !== undefined && <p>Space: {course.space} MB</p>}
        <p>Short Video: {course.short_video ? "Yes" : "No"}</p>
        <p>Published: {course.is_published ? "Yes" : "No"}</p>
      </div>
    </main>
  );
}
