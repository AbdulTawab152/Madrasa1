// app/courses/[slug]/page.tsx
import { CoursesApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
// import Courses from "../../../lib/types"
import { FaClock, FaUsers, FaStar, FaBook, FaVideo, FaPlay, FaGraduationCap } from 'react-icons/fa';



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
      <div className="relative h-80 lg:h-96 bg-gradient-to-r from-amber-600 to-amber-700 overflow-hidden rounded-b-3xl shadow-xl">
        {course.image && (
          <Image
            src={getImageUrl(course.image)}
            alt={course.title}
            fill
            className="object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {course.title}
            </h1>
            {/* <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center text-white bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                <FaBook className="mr-2" />
                <span className="font-medium">Published</span>
                <span className="ml-1 text-sm">({course.publish_date ? new Date(course.publish_date).getFullYear() : 'New'})</span>
              </div>
              <div className="flex items-center text-white bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                <FaBook className="mr-2" />
                <span className="font-medium">{course.video_quantity || 0} Videos</span>
              </div>
              <div className="flex items-center text-white bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                <FaVideo className="mr-2" />
                <span className="font-medium">{course.duration || 'Flexible'}</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:mt-8 relative flex flex-col lg:flex-row gap-8">
        
        {/* Course Info */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-8 space-y-8 border border-amber-100">
          <div className="border-b border-amber-100 pb-6">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
              <FaGraduationCap className="mr-3 text-amber-600" />
              About this Course
            </h2>
            {course.description ? (
              <div 
                className="text-gray-700 leading-relaxed prose prose-amber max-w-none"
                dangerouslySetInnerHTML={{ __html: course.description }}

                
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                This course provides comprehensive knowledge and practical skills in Islamic education. 
                Designed to help you deepen your understanding and strengthen your faith through structured learning.
              </p>
            )}
          </div>

          {/* Course Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaClock className="text-amber-600 text-xl" />
              </div>
              <div>
                <div className="font-semibold text-black">Duration</div>
                <div className="text-gray-600">{course.duration || "Lifetime Access"}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaVideo className="text-amber-600 text-xl" />
              </div>
              <div>
                <div className="font-semibold text-black">Video Lessons</div>
                <div className="text-gray-600">{course.video_quantity || 0} Videos</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaBook className="text-amber-600 text-xl" />
              </div>
              <div>
                <div className="font-semibold text-black">Published Date</div>
                <div className="text-gray-600">
                  {course.publish_date
                    ? new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(course.publish_date))
                    : 'Recently'}
                </div>
              </div>

            </div>

            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <FaUsers className="text-amber-600 text-xl" />
              </div>
              <div>
                <div className="font-semibold text-black">Resolution</div>
                <div className="text-gray-600">{course.resolution || 'HD'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 bg-white p-6 rounded-2xl shadow-sm border border-amber-100 sticky top-8 space-y-6">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-2xl font-bold mb-2">Get Course Info</div>
            <p className="mb-6 text-amber-100">Contact us for enrollment details</p>
            <a 
              href={`https://wa.me/+1234567890?text=${encodeURIComponent(`Hi! I'm interested in the course: ${course.title}. Can you provide me with more information about enrollment, pricing, and course details?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-white text-amber-600 font-semibold py-3 rounded-lg hover:bg-amber-50 transition flex items-center justify-center gap-2"
            >
              <FaPlay className="text-sm" />
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
