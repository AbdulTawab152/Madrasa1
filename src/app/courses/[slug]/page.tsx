// app/courses/[slug]/page.tsx
import { CoursesApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUsers, FaStar, FaBook, FaVideo, FaPlay, FaGraduationCap } from 'react-icons/fa';

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

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await CoursesApi.getAll();
  const courses = Array.isArray(res.data) ? (res.data as Course[]) : [];
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen mt-24 flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full border border-amber-100">
          <h2 className="text-2xl font-bold text-black mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const getImageUrl = (img?: string | null) => {
    if (img?.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center gap-2 text-sm md:text-base">
        <Link 
          href="/" 
          className="inline-flex items-center text-amber-700 hover:text-amber-900 transition-colors group font-medium"
        >
          <svg className="w-5 h-5 mr-2 text-amber-600 group-hover:text-amber-700 transition-colors" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </Link>

        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>

        <Link 
          href="/courses" 
          className="inline-flex items-center text-amber-700 hover:text-amber-900 transition-colors font-medium"
        >
          Courses
        </Link>

        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>

        <span className="text-black font-medium">{course.title}</span>
      </div>

      {/* Hero Section */}
      <div className="relative h-[28rem] lg:h-[32rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden rounded-b-3xl shadow-xl flex items-center justify-center">
        {course.image && (
          <Image
            src={getImageUrl(course.image)}
            alt={course.title}
            fill
            className="object-cover object-center opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              {course.title}
            </h1>
            <p className="text-white text-lg sm:text-xl mb-6 opacity-90">
              Learn from <span className="font-semibold">{course.first_name} {course.last_name}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <div className="flex items-center text-white text-lg bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <FaStar className="mr-2 text-yellow-300" />
                {course.rating?.toFixed(1) || '5.0'} ({course.enrolled || '25k'} students)
              </div>
              <div className="flex items-center text-white text-lg bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <FaBook className="mr-2" />
                <span className="font-medium">Published</span>
                <span className="ml-1 text-sm">({course.publish_date ? new Date(course.publish_date).getFullYear() : 'New'})</span>
              </div>
              <div className="flex items-center text-white text-lg bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <FaVideo className="mr-2" />
                <span className="font-medium">{course.duration || 'Flexible'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 relative flex flex-col md:flex-row gap-8">
        
        {/* Course Info */}
        <div className="flex-[2] bg-white rounded-3xl shadow-lg p-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-gray-800 border-b-2 border-orange-500 pb-4 mb-6">About This Course</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{course.description || "This course provides comprehensive knowledge and practical skills in a clear and engaging manner. Designed for students of all levels, it covers essential concepts and advanced topics, ensuring a thorough understanding of the subject matter. Through interactive lessons and practical exercises, you will gain valuable insights and develop the expertise needed to excel."}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="flex items-center gap-4 text-gray-800 font-semibold text-lg bg-orange-50 p-4 rounded-xl shadow-sm">
              <FaClock className="text-orange-500 text-2xl" />
              Duration: <span className="text-orange-600">{course.duration || "Lifetime Access"}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800 font-semibold text-lg bg-orange-50 p-4 rounded-xl shadow-sm">
              <FaVideo className="text-orange-500 text-2xl" />
              Videos: <span className="text-orange-600">{course.video_quantity || 0} Lessons</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800 font-semibold text-lg bg-orange-50 p-4 rounded-xl shadow-sm">
              <FaBook className="text-orange-500 text-2xl" />
              Total Lessons: <span className="text-orange-600">{course.lessons || 8}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800 font-semibold text-lg bg-orange-50 p-4 rounded-xl shadow-sm">
              <FaUsers className="text-orange-500 text-2xl" />
              Enrolled: <span className="text-orange-600">{course.enrolled || '25k'} Students</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3 bg-white p-8 rounded-3xl shadow-lg space-y-8 sticky top-8 h-fit">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl text-center">
            <div className="text-4xl font-extrabold mb-3">Free</div>
            <p className="mb-7 text-lg opacity-90">Unlock your potential. Start learning today!</p>
            <button className="w-full bg-white text-indigo-700 font-bold py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md">
              Enroll Now
            </a>
          </div>

          {/* Course Details from API */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black mb-4">Course Details</h3>
            <div className="space-y-3">
              {course.duration && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-black">{course.duration}</span>
                </div>
              )}
              {course.video_quantity && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Videos</span>
                  <span className="font-medium text-black">{course.video_quantity}</span>
                </div>
              )}
              {course.publish_date && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Published</span>
                  <span className="font-medium text-black">{new Date(course.publish_date).toLocaleDateString()}</span>
                </div>
              )}
              {course.resolution && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Quality</span>
                  <span className="font-medium text-black">{course.resolution}</span>
                </div>
              )}
              {course.space && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium text-black">{course.space}</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
fundamentals</li>
                <li>• Practical skills with real examples</li>
                <li>• Tips, shortcuts, and best practices</li>
              </ul>
            </div>
            <div className="rounded-2xl p-4 border border-gray-100 bg-white">
              <h3 className="font-semibold text-black mb-2">Prerequisites</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Basic familiarity with the topic</li>
                <li>• Willingness to learn</li>
                <li>• Internet connection for resources</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-amber-100">
            <div className="bg-gradient-to-r from-amber-400 to-pink-500 text-white p-6 rounded-2xl shadow-md text-center">
              <div className="text-3xl font-extrabold mb-1">Free</div>
              <p className="text-white/90 mb-6">Start learning today</p>
              <button className="w-full bg-white text-amber-600 font-semibold py-3 rounded-xl hover:opacity-95 active:opacity-90 transition shadow">
                Start Course
              </button>
              {course.short_video && (
                <button className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 font-medium py-2.5 rounded-xl hover:bg-white/15 transition">
                  <FaPlay className="text-white" /> Preview
                </button>
              )}
            </div>
          </div>

          {/* Course Details from API */}
          <div className="bg-white/90 backdrop-blur rounded-3xl shadow-lg p-6 border border-amber-100">
            <h3 className="text-lg font-semibold text-black mb-4">Course details</h3>
            <div className="space-y-3">
              {course.duration && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-black">{course.duration}</span>
                </div>
              )}
              {course.video_quantity && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Videos</span>
                  <span className="font-medium text-black">{course.video_quantity}</span>
                </div>
              )}
              {course.publish_date && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Published</span>
                  <span className="font-medium text-black">{new Date(course.publish_date).toLocaleDateString()}</span>
                </div>
              )}
              {course.resolution && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Quality</span>
                  <span className="font-medium text-black">{course.resolution}</span>
                </div>
              )}
              {course.space && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium text-black">{course.space}</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
