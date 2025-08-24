// app/courses/[slug]/page.tsx
import { CoursesApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUsers, FaStar, FaBook, FaVideo } from 'react-icons/fa';

interface Course {
  id: number;
  title: string;
  slug: string;
  first_name: string;
  last_name: string;
  description?: string;
  image?: string | null;
  duration?: string;
  video_quantity?: number;
  rating?: number;
  lessons?: number;
  enrolled?: string;
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await CoursesApi.getAll();
  const courses = Array.isArray(res.data) ? (res.data as Course[]) : [];
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen mt-32 flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <Link href="/courses" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
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
    <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center gap-2 text-sm md:text-base">
        <Link 
          href="/" 
          className="inline-flex items-center text-orange-700 hover:text-orange-900 transition-colors group font-medium"
        >
          <svg className="w-5 h-5 mr-2 text-orange-500 group-hover:text-orange-700 transition-colors" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </Link>

        <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>

        <Link 
          href="/courses" 
          className="inline-flex items-center text-orange-700 hover:text-orange-900 transition-colors font-medium"
        >
          Courses
        </Link>

        <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>

        <span className="text-gray-600">{course.title}</span>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 lg:h-[32rem] bg-gradient-to-r from-orange-400 to-pink-500 overflow-hidden rounded-b-3xl shadow-lg">
        {course.image && (
          <Image
            src={getImageUrl(course.image)}
            alt={course.title}
            fill
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              {course.title}
            </h1>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-white bg-black/30 px-3 py-1 rounded-lg">
                <FaStar className="mr-2 text-yellow-400" />
                {course.rating?.toFixed(1) || '5.0'} ({course.enrolled || '25k'} students)
              </div>
              <div className="flex items-center text-white bg-black/30 px-3 py-1 rounded-lg">
                <FaBook className="mr-2" />
                {course.lessons || 8} Lessons
              </div>
              <div className="flex items-center text-white bg-black/30 px-3 py-1 rounded-lg">
                <FaVideo className="mr-2" />
                {course.video_quantity || 0} Videos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:mt-12 relative flex flex-col md:flex-row gap-8">
        
        {/* Course Info */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">About this Course</h2>
          <p className="text-gray-700">{course.description || "This course provides comprehensive knowledge and practical skills."}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 text-orange-500 font-medium">
              <FaClock />
              Duration: {course.duration || "Lifetime Access"}
            </div>
            <div className="flex items-center gap-3 text-orange-500 font-medium">
              <FaVideo />
              {course.video_quantity || 0} Video Lessons
            </div>
            <div className="flex items-center gap-3 text-orange-500 font-medium">
              <FaBook />
              {course.lessons || 8} Lessons
            </div>
            <div className="flex items-center gap-3 text-orange-500 font-medium">
              <FaUsers />
              {course.enrolled || '25k'} Students
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3 bg-gray-50/70 backdrop-blur-lg p-6 rounded-3xl shadow-lg sticky top-8 space-y-6">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold mb-2">Free</div>
            <p className="mb-6">Start learning today</p>
            <button className="w-full bg-white text-orange-500 font-semibold py-3 rounded-lg hover:opacity-90 transition">
              Enroll Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
