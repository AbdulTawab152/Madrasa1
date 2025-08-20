import Link from "next/link";
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
  is_top: boolean;
  category_id: number;
  rating?: number;
  lessons?: number;
  enrolled?: string;
}

interface CoursesSectionProps {
  courses: Course[];
  showAll?: boolean;
}

export default function CoursesSection({ courses, showAll = false }: CoursesSectionProps) {
  const sortedCourses =
    courses
      ?.filter(course => course.is_published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const displayCourses = showAll ? sortedCourses : sortedCourses.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <div className="w-full">
      {!showAll && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {showAll ? "All Courses" : "Featured Courses"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showAll
              ? "Explore our comprehensive collection of Islamic education courses"
              : "Discover our most popular and essential Islamic learning programs"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map(course => (
          <Link key={course.id} href={`/courses/${course.slug}`} className="group">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 h-[420px] flex flex-col">
              
              {/* Course Image */}
              <div className="relative overflow-hidden h-48">
                {course.image ? (
                  <Image
                    src={getImageUrl(course.image)}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">📚</span>
                      <span className="text-amber-800 font-medium text-sm">Course Image</span>
                    </div>
                  </div>
                )}
                
                {/* Top badge for featured courses */}
                {course.is_top && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                    ⭐ Featured
                  </div>
                )}
                
                {/* Rating overlay */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <span className="text-amber-500 text-xs">★</span>
                  <span className="text-gray-800 font-semibold text-xs">
                    {course.rating?.toFixed(1) || "5.0"}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Course Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                  {course.title}
                </h3>
                
                {/* Course Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="text-amber-500 text-sm">📚</span>
                      <span className="text-xs font-medium">{course.lessons || 8}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="text-amber-500 text-sm">👥</span>
                      <span className="text-xs font-medium">{course.enrolled || "1.2k"}</span>
                    </div>
                  </div>
                  
                  {/* Course duration */}
                  <div className="text-right">
                    <div className="text-amber-500 text-sm">⏱️</div>
                    <div className="text-xs text-gray-500">8 weeks</div>
                  </div>
                </div>

                {/* Course Details Button */}
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-md text-sm">
                  View Course
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && displayCourses.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-base rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore All Courses
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
