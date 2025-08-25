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
    <div className="w-full  mx-auto px-4">
      {/* Hero Section */}
{showAll && (
  <section className="relative w-full mt-6 md:mt-12 mb-16 md:mb-20 overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50 z-0"></div>

    <div className="relative z-10 py-16 md:py-24 px-6 flex flex-col items-center text-center">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white shadow-md border border-orange-100 text-orange-600 text-sm font-medium rounded-full">
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
        Our Courses
      </div>

      {/* Main headline with gradient text + underline */}
      <div
        className={`transition-all duration-1000 transform 
         "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 leading-tight">
          Discover{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Courses
          </span>{" "}
          <br className="hidden md:block" />
          That{" "}
          <span className="relative inline-block">
            Inspire
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse"></span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Explore our curated collection of Islamic courses and tutorials. Learn, grow, and advance your knowledge at your own pace.
        </p>
      </div>

      {/* Decorative minimal floating dots */}
      <div className="absolute top-24 left-10 w-4 h-4 bg-orange-300 rounded-full opacity-50 animate-float-1"></div>
      <div className="absolute top-1/3 right-16 w-5 h-5 bg-pink-300 rounded-full opacity-50 animate-float-2"></div>
      <div className="absolute bottom-28 left-1/3 w-3 h-3 bg-amber-200 rounded-full opacity-60 animate-float-3"></div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div> */}
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
