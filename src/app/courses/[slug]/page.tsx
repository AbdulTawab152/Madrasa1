// app/event/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchWithCache } from "../../../lib/api";
import { endpoints } from "../../../lib/config";
import { Course } from "../../../lib/types";

interface CoursePageProps {
  params: {
    slug: string;
  };
}

async function fetchCourse(slug: string): Promise<Course | null> {
  try {
    const data = await fetchWithCache<Course>(`${endpoints.courses}/${slug}`);
    return data;
  } catch (error) {
    return null;
  }
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = params;
  const course = await fetchCourse(slug);

  if (!course) {
    notFound(); // ✅ show Next.js 404 page if not found
  }

  return (
    <main className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {course.image ? (
              <Image
                src={getImageUrl(course.image)}
                alt={course.title}
                className="w-full h-96 md:h-full object-cover"
                width={600}
                height={400}
              />
            ) : (
              <div className="w-full h-96 md:h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>

            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> {course.name}
                </div>
                <div>
                  <strong>Category ID:</strong> {course.category_id}
                </div>
                <div>
                  <strong>Published:</strong>{" "}
                  {course.is_published ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Top Course:</strong> {course.is_top ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(course.date).toLocaleDateString()}
                </div>
                <div>
                  <strong>Rating:</strong> {course.rating || "N/A"}
                </div>
                <div>
                  <strong>Lessons:</strong> {course.lessons || "N/A"}
                </div>
                <div>
                  <strong>Enrolled:</strong> {course.enrolled || "N/A"}
                </div>
              </div>

              {course.content && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Course Content
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{course.content}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
