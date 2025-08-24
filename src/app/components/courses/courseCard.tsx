import Link from "next/link";
import Image from "next/image";
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

  const displayCourses = showAll ? sortedCourses : sortedCourses.slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      {showAll && (
        <section className="relative w-full h-[500px] md:h-[600px] mb-16 overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/1.jpg"
            alt="Courses Banner"
            fill
            className="object-cover scale-105 hover:scale-110 transition-transform duration-1000 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Expand Your{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Knowledge
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow-md">
              Explore our curated Islamic courses and start your journey toward learning and growth.
            </p>
            <div className="mt-6 flex justify-center">
              <span className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-full"></span>
            </div>
          </div>
        </section>
      )}

      {/* Featured Section Header */}
      {!showAll && (
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">
            🌟 Featured
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Our <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Most Popular</span> Programs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Carefully selected Islamic learning programs that guide you on a journey of knowledge, faith, and growth.
          </p>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map(course => {
          const imageUrl = getImageUrl(course.image);
          
          return (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 
                         overflow-hidden border border-gray-100 flex flex-col h-[420px]"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={course.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <span className="text-3xl">📚</span>
                  </div>
                )}

                {/* Video Count Badge */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 
                                text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                  📹 {course.video_quantity} Videos
                </div>

                {/* Duration */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="text-amber-500 text-xs">⏱️</span>
                  <span className="text-gray-800 font-semibold text-xs">
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-amber-600 transition-colors">
                  {course.title}
                </h3>
                
                <div
                  className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />

                <Link href={`/courses/${course.slug}`} className="mt-auto">
                  <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium py-2 px-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm">
                    View Course
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explore All Button */}
      {!showAll && displayCourses.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link href="/courses">
            <button className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 
                               text-white font-medium text-sm rounded-lg shadow-sm 
                               hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
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
