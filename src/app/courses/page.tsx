// app/course/page.tsx
import Link from "next/link";
import Image from 'next/image';

interface Course {
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

async function fetchCoursesData(): Promise<Course[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/courses";
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
}


export default async function CoursesPage() {
  const courses = await fetchCoursesData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`} className="block group">
            <Image
              src={course.image || "https://via.placeholder.com/300x400"}
              alt={course.title}
              className="w-full h-48 object-cover rounded group-hover:opacity-80 transition"
            />
            <h2 className="mt-4 text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 mt-1 text-sm line-clamp-3">{course.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
