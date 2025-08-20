// app/courses/[slug]/page.tsx
import { CoursesApi } from "../../../lib/api";
import Image from "next/image";

interface Course {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date: string;
  is_published: boolean;
  rating?: number;
  lessons?: number;
  enrolled?: string;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailsPage({ params }: Params) {
  const { slug } = await params;

  // گرفتن جزئیات کورس از API
  const res = await CoursesApi.getAll();
  const courses = Array.isArray(res.data) ? res.data as Course[] : [];
  const course: Course | undefined = courses.find(c => c.slug === slug);

  if (!course) {
    return <p className="text-center mt-20 text-xl">Course not found!</p>;
  }

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>

      {course.image && (
        <div className="mb-6">
          <Image
            src={getImageUrl(course.image)}
            alt={course.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex gap-4 text-gray-700 mb-6">
        <span>📚 Lessons: {course.lessons || 8}</span>
        <span>👥 Enrolled: {course.enrolled || "25k"}</span>
        <span>⭐ Rating: {course.rating?.toFixed(1) || "5.0"}</span>
      </div>

      <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        Enroll Now
      </button>
    </main>
  );
}
