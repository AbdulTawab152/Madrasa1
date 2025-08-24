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
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Hero Section */}
{showAll && (
  <section className="relative w-full h-[500px] md:h-[600px] mb-16 overflow-hidden rounded-2xl shadow-2xl">
    {/* Background Image */}
    <Image
      src="/1.jpg"
      alt="Courses Banner"
      fill
      className="object-cover scale-105 hover:scale-110 transition-transform duration-1000 ease-in-out"
      priority
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 animate-gradient-x"></div>

    {/* Hero Content */}
    <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-fade-in-up drop-shadow-lg">
        Expand Your{" "}
        <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-text-gradient">
          Knowledge
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up delay-200 drop-shadow-md">
        Explore our curated Islamic courses and start your journey toward learning and growth.
      </p>

      {/* Hero CTA */}
      {/* <Link href="/courses" className="mt-8">
        <button className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl shadow-xl hover:from-orange-500 hover:to-pink-500 
                               transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:brightness-110 animate-bounce-slow">
          Browse Courses
        </button>
      </Link> */}

      {/* Decorative underline */}
      <div className="mt-6 flex justify-center">
        <span className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-full animate-pulse"></span>
      </div>
    </div>

    {/* Floating shapes */}
    <div className="absolute top-10 left-10 w-6 h-6 bg-amber-400 rounded-full opacity-60 animate-float-slow hover:translate-x-2"></div>
    <div className="absolute bottom-20 right-20 w-10 h-10 bg-pink-500 rounded-full opacity-50 animate-float-slower hover:-translate-y-2"></div>
    <div className="absolute top-32 right-1/3 w-4 h-4 bg-orange-400 rounded-full opacity-40 animate-float-slow hover:translate-y-1"></div>

    {/* Subtle moving particles */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="w-1 h-full bg-gradient-to-b from-white/20 to-transparent absolute left-1/4 animate-pulse-slow"></div>
      <div className="w-1 h-full bg-gradient-to-b from-white/15 to-transparent absolute left-3/4 animate-pulse-slower"></div>
      <div className="w-2 h-2 bg-white rounded-full absolute top-10 left-1/2 animate-ping-slow opacity-30"></div>
      <div className="w-2 h-2 bg-white rounded-full absolute top-1/3 left-1/3 animate-ping-slower opacity-20"></div>
    </div>
  </section>
)}



      {/* Featured Section Header */}
      {!showAll && (
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-full shadow-md">
            🌟 Featured Courses
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Discover Our <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Most Popular</span> Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carefully selected Islamic learning programs that guide you on a journey of knowledge, faith, and growth.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="w-24 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-full"></span>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {displayCourses.map(course => (
          <div
            key={course.id}
            className="bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 
                       overflow-hidden border border-gray-100 h-[500px] w-[360px] md:w-[380px] flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-[240px]">
              {course.image ? (
                <Image
                  src={getImageUrl(course.image)}
                  alt={course.title}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
              )}

              {/* Featured Badge */}
              {course.is_top && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 
                                text-white px-3 py-1 rounded-full text-xs font-bold shadow-md 
                                animate-pulse hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-4 h-4 text-white drop-shadow-sm"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </div>
              )}

              {/* Rating */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <span className="text-amber-500 text-xs">★</span>
                <span className="text-gray-800 font-semibold text-xs">
                  {course.rating?.toFixed(1) || "5.0"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-amber-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                {course.description}
              </p>

              <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">📚 {course.lessons || 8}</span>
                  <span className="flex items-center gap-1">👥 {course.enrolled || "1.2k"}</span>
                </div>
              </div>

              <Link href={`/courses/${course.slug}`} className="w-full">
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                  View Course
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Explore All Button */}
      {!showAll && displayCourses.length > 0 && (
        <div className="mt-14 flex justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 
                       text-white font-semibold text-lg rounded-2xl shadow-lg 
                       hover:from-amber-600 hover:to-amber-700 hover:shadow-xl 
                       transition-all duration-300 transform hover:scale-110"
          >
            Explore All Courses
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
