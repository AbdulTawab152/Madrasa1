// app/courses/[slug]/page.tsx
import { CoursesApi, extractArray } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import type { Course } from "@/lib/types";


interface Book {
  id: number;
  title: string;
  edition?: string;
  pages?: number;
  description?: string;
  written_year?: string;
  pdf_file?: string;
  image?: string;
}

interface Recorder {
  id: number;
  first_name: string;
  last_name: string;
  description?: string;
  full_address?: string;
  dob?: string;
  image?: string;
  contact_no?: string;
}
import {
  FaClock,
  FaUsers,
  FaBook,
  FaVideo,
  FaPlay,
  FaGraduationCap,
} from "react-icons/fa";

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;


  // ✅ Fetch course by slug
  const courseResponse = await CoursesApi.getBySlug(slug);
  const coursePayload = courseResponse.data;
  const course = Array.isArray(coursePayload)
    ? (coursePayload[0] as Course | undefined)
    : (coursePayload as Course | undefined);


  // Extract recorded_by if present
  const recordedBy: Recorder | undefined = course?.recorded_by;

  // Fetch book details if not present but book_id exists
  let book: Book | undefined = (course as any)?.book;
  if (!book && (course as any)?.book_id) {
    try {
      const bookRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawngreen-dragonfly-304220.hostingersite.com/api'}/book/${(course as any).book_id}`);
      if (bookRes.ok) {
        const bookData = await bookRes.json();
        book = Array.isArray(bookData) ? bookData[0] : bookData;
      }
    } catch (err) {
      // ignore error, book will be undefined
    }
  }


  if (!course) {
    return (
      <div className="min-h-screen mt-24 flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center p-8 bg-white rounded-xl max-w-md w-full border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-black mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Fetch related courses
  let relatedCourses: Course[] = [];
  try {
    const relatedResponse = await CoursesApi.getAll({ limit: 6 });
    if (relatedResponse.success) {
      const data = extractArray<Course>(relatedResponse.data);
      relatedCourses = data.filter((item) => item.slug !== slug).slice(0, 3);
    }
  } catch (relatedError) {
    console.warn("Failed to load related courses:", relatedError);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center gap-2 text-sm md:text-base">
        <Link
          href="/"
          className="inline-flex items-center text-amber-700 hover:text-amber-900 transition-colors group font-medium"
        >
          <svg
            className="w-5 h-5 mr-2 text-amber-600 group-hover:text-amber-700 transition-colors"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </Link>

        <svg
          className="w-4 h-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>

        <Link
          href="/courses"
          className="inline-flex items-center text-amber-700 hover:text-amber-900 transition-colors font-medium"
        >
          Courses
        </Link>

        <svg
          className="w-4 h-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>

        <span className="text-black font-medium">{course.title}</span>
      </div>

      {/* Hero Section */}
      <div className="relative h-60 lg:h-72 bg-gradient-to-r from-amber-600 to-amber-700 overflow-hidden rounded-b-3xl">
        {course.image && (
          <Image
            src={
              getImageUrl(course.image, "/placeholder-course.jpg") ||
              "/placeholder-course.jpg"
            }
            alt={course.title}
            fill
            className="object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-primary-900/25"></div>
        <div className="container pt-10 mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 py-12 lg:mt-8 relative flex flex-col lg:flex-row gap-8 items-start">
        {/* Course Info */}
        <div className="flex-1 bg-white rounded-2xl p-8 space-y-8 border-2 border-amber-100">
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
                This course provides comprehensive knowledge and practical skills
                in Islamic education. Designed to help you deepen your
                understanding and strengthen your faith through structured
                learning.
              </p>
            )}
          </div>

          {/* Book Info */}
        

          {/* Short Video */}
          {course.short_video && (
            <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <FaVideo className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Course Introduction</h3>
                  <p className="text-gray-600 text-sm">Watch this short video to get an overview of the course</p>
                </div>
              </div>
              
              <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full h-auto max-h-96 object-cover"
                  poster={course.image ? getImageUrl(course.image, "/placeholder-course.jpg") : "/placeholder-course.jpg"}
                >
                  <source src={getImageUrl(course.short_video)} type="video/mp4" />
                  <source src={getImageUrl(course.short_video)} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video overlay for better UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FaPlay className="text-amber-600" />
                  Introduction Video
                </span>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                  Preview
                </span>
              </div>
            </div>
          )}

          {/* Course Features */}
         
            {book && (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 flex flex-col items-center md:flex-row md:items-start gap-6">
              <div className="w-28 h-40 relative  flex-shrink-0 rounded-lg overflow-hidden border border-amber-100 bg-white">
                <Image
                  src={getImageUrl(book.image, "/placeholder-book.jpg") || "/placeholder-book.jpg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="flex items-center gap-2 mb-2">
                  <FaBook className="text-amber-600 text-lg" />
                  <span className="font-bold text-lg text-amber-800">{book.title}</span>
                </div>
                <div className="text-gray-600 mb-1 text-sm">Edition: {book.edition || "N/A"} | Pages: {book.pages || "N/A"} | Year: {book.written_year || "N/A"}</div>
                <div className="text-gray-700 mb-2 text-sm">{book.description}</div>
                {book.pdf_file && (
                  <a
                    href={getImageUrl(book.pdf_file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold"
                  >
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Recorder Info */}
          {recordedBy && (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 flex flex-col items-center md:flex-row md:items-start gap-6">
              <div className="w-28 h-28 relative flex-shrink-0 rounded-full overflow-hidden border border-amber-100 bg-white">
                <Image
                  src={getImageUrl(recordedBy.image, "/placeholder-author.jpg") || "/placeholder-author.jpg"}
                  alt={recordedBy.first_name + ' ' + recordedBy.last_name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="flex items-center gap-2 mb-2">
                  <FaUsers className="text-amber-600 text-lg" />
                  <span className="font-bold text-lg text-amber-800">{recordedBy.first_name} {recordedBy.last_name}</span>
                </div>
                <div className="text-gray-600 mb-1 text-sm">{recordedBy.full_address}</div>
                <div className="text-gray-700 mb-2 text-sm">{recordedBy.description}</div>
                {recordedBy.contact_no && (
                  <div className="text-sm text-amber-700 font-medium">Contact: {recordedBy.contact_no}</div>
                )}
              </div>
            </div>
          )}
        </div>

  {/* Sidebar */}
  <div className="lg:w-96 w-full bg-white p-6 rounded-2xl border-2 border-amber-100 lg:sticky lg:top-24 space-y-6 z-20">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-xl text-center">
            <div className="text-2xl font-bold mb-2">Get Course Info</div>
            <p className="mb-6 text-amber-100">
              Contact us for enrollment details
            </p>
            <a
              href={`https://wa.me/+1234567890?text=${encodeURIComponent(
                `Hi! I'm interested in the course: ${course.title}. Can you provide me with more information about enrollment, pricing, and course details?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-amber-600 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <FaPlay className="text-sm" />
              Enroll Now
            </a>
          </div>

          {/* Course Details from API */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black mb-4">
              Course Details
            </h3>
            <div className="space-y-3">
              {course.duration && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-black">
                    {course.duration}
                  </span>
                </div>
              )}
              {course.video_quantity && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Videos</span>
                  <span className="font-medium text-black">
                    {course.video_quantity}
                  </span>
                </div>
              )}
              {course.publish_date && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Published</span>
                  <span className="font-medium text-black">
                    {new Date(course.publish_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              {course.resolution && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Quality</span>
                  <span className="font-medium text-black">
                    {course.resolution}
                  </span>
                </div>
              )}
              {course.space && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium text-black">{course.space}</span>
                </div>
              )}
              {course.short_video && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaVideo className="text-amber-600" />
                    Intro Video
                  </span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
