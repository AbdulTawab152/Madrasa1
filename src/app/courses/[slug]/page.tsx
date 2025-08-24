// app/courses/[slug]/page.tsx
import { CoursesApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaClock, FaUsers, FaStar, FaBook, FaVideo } from 'react-icons/fa';

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
  resolution?: string;
  contact_no?: string | null;
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await CoursesApi.getAll();
  const courses = Array.isArray(res.data) ? (res.data as Course[]) : [];
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
          <Link href="/courses" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
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
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[32rem] bg-gradient-to-r from-indigo-600 to-blue-600 overflow-hidden">
        {course.image && (
          <Image
            src={getImageUrl(course.image)}
            alt={course.title}
            fill
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
              {course.title}
            </h1>
            {/* <p className="text-lg sm:text-xl text-blue-100 mb-6">{course.description}</p> */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-blue-100 bg-black/30 px-3 py-1 rounded-lg">
                <FaStar className="mr-2 text-yellow-400" />
                {course.rating?.toFixed(1) || '5.0'} ({course.enrolled || '25k'} students)
              </div>
              <div className="flex items-center text-blue-100 bg-black/30 px-3 py-1 rounded-lg">
                <FaBook className="mr-2" />
                {course.lessons || 8} Lessons
              </div>
              <div className="flex items-center text-blue-100 bg-black/30 px-3 py-1 rounded-lg">
                <FaVideo className="mr-2" />
                {course.video_quantity || 0} Videos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:mt-24 relative">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden md:flex">
          {/* About Section */}
          <div className="p-10 md:w-2/3">
            <h2 className="text-2xl font-bold mb-6">About This Course</h2>
            <div className="prose max-w-none mb-8">
              <p>{course.description || 'This course provides comprehensive knowledge and practical skills.'}</p>
            </div>

            <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Comprehensive course content',
                'Expert instruction',
                'Practical exercises',
                'Lifetime access',
                'Certificate of completion',
                'Mobile and desktop access'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg hover:bg-green-100 transition">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div> */}
          </div>

          {/* Sidebar */}
          <div className="bg-gray-50/70 backdrop-blur-lg p-8 md:w-1/3 border-l border-gray-200">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold mb-2">Free</div>
                <p className="mb-6">Start learning today</p>
                <button className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:opacity-90 transition">
                  Enroll Now
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-500" />
                  <span>Duration: {course.duration || 'Lifetime Access'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaVideo className="text-gray-500" />
                  <span>{course.video_quantity || 0} Video Lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaBook className="text-gray-500" />
                  <span>{course.lessons || 8} Lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="text-gray-500" />
                  <span>{course.enrolled || '25k'} Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
