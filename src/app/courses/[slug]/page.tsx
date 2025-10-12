// app/courses/[slug]/page.tsx
import { CoursesApi, extractArray } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import type { Course } from "@/lib/types";
import VideoPlayer from "../../components/VideoPlayer";


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
      <div className="max-w-7xl z-50 mx-auto px-4 py-6 flex flex-wrap items-center gap-2 text-sm md:text-base">
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

      {/* Hero Section with Full Width Image */}
      <section className="relative min-h-56 h-60 sm:h-72 md:h-96 lg:h-[420px] xl:h-[480px] 2xl:h-[540px] overflow-hidden rounded-b-[40px] sm:rounded-b-[80px] shadow-xl">
        {/* Layered Background */}
        <div className="absolute inset-0 z-0">
          {/* Backdrop Image */}
          <Image
            src={course.image ? getImageUrl(course.image, "/placeholder-course.jpg") : "/placeholder-course.jpg"}
            alt={course.title}
            fill
            className="object-cover scale-105 brightness-90 transition-all duration-700"
            priority
          />
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_60%_90%,rgba(251,191,36,0.15),transparent_70%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-900/90 to-amber-900/80 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 via-black/45 to-transparent"></div>
          {/* Decorative Emerald Orb */}
          <div className="absolute left-8 top-1/3 w-56 h-56 bg-emerald-400 opacity-40 blur-3xl rounded-full pointer-events-none"></div>
          {/* Bottom Amber Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-400/90 via-transparent to-transparent pointer-events-none"></div>
          {/* Decorative BG Ship SVG (floating, blurred) */}
          <div className="absolute right-8 bottom-6 z-10 pointer-events-none opacity-90">
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl blur-[1.5px] opacity-90">
              <ellipse cx="60" cy="40" rx="45" ry="16" fill="#FFBF46" fillOpacity="0.13"/>
              <rect x="35" y="25" width="50" height="18" rx="7" fill="#FDBA74" fillOpacity="0.34"/>
              <rect x="55" y="16" width="12" height="18" rx="5" fill="#059669" fillOpacity="0.28"/>
              <polygon points="53,41 67,41 60,29" fill="#059669" fillOpacity="0.20"/>
              <rect x="48" y="27" width="2.5" height="9" rx="1" fill="#bbf7d0" fillOpacity="0.45"/>
              <rect x="69.5" y="27" width="2.5" height="9" rx="1" fill="#bbf7d0" fillOpacity="0.45"/>
            </svg>
          </div>
          {/* One more decorative shape, top left */}
          <div className="absolute -left-8 -top-10 z-10 pointer-events-none opacity-60">
            <svg width="72" height="40" viewBox="0 0 72 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="blur-[2.5px] drop-shadow-2xl">
              <ellipse cx="40" cy="26" rx="28" ry="11" fill="#059669" fillOpacity="0.09"/>
              <rect x="15" y="12" width="25" height="8" rx="4" fill="#fbbf24" fillOpacity="0.17"/>
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center py-8">
          <div className="container mx-auto px-4 flex flex-col justify-center">
            <div className="w-full pt-10 sm:pt-0 max-w-3xl">
              {/* Animated course label */}
            
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white mb-6 drop-shadow-xl leading-tight animate-fade-in-up">
                {course.title}
              </h1>

              {/* Course Meta Info: Duration, Level, Videos (if available) */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 items-center text-white/90 text-base font-semibold mb-0 animate-fade-in-up">
                {course.duration && (
                  <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
                      <path d="M12 6v6l4 2" strokeLinecap="round" />
                    </svg>
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.video_quantity && (
                  <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    <svg className="w-5 h-5 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15.75 10.01a1.75 1.75 0 1 0-3.5 0 1.75 1.75 0 0 0 3.5 0Zm-8 0a1.75 1.75 0 1 0-3.5 0 1.75 1.75 0 0 0 3.5 0Zm8 0c0-2.75-2.25-5-5-5s-5 2.25-5 5c0 2.75 2.25 5 5 5s5-2.25 5-5Z" />
                    </svg>
                    <span>{course.video_quantity} videos</span>
                  </div>
                )}
              
              </div>

              {/* No description here, improved background visuals instead */}
            </div>
          </div>
        </div>

        {/* Decorative Corners */}
        <div className="absolute left-0 bottom-0 w-40 h-10 bg-gradient-to-r from-amber-300/30 via-transparent to-transparent blur-lg opacity-70 pointer-events-none" />
        <div className="absolute right-0 top-0 w-40 h-10 bg-gradient-to-l from-emerald-400/30 via-transparent to-transparent blur-lg opacity-50 pointer-events-none" />
      </section>

      {/* Video Section - Enhanced Design */}
    
      {course.short_video && (
        <section className="relative w-full py-12 sm:py-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FaVideo className="w-4 h-4" />
                Course Preview
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Watch & Learn
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get a preview of what you'll learn in this comprehensive course
              </p>
            </div>
            
            {/* Debug Output: Show video URL */}
          
            {/* Improved Video Player for reliable playback */}
            <div className="relative group">
              <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-500/10 border border-emerald-100/50 overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500">
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <VideoPlayer
                    videoUrl={course.short_video}
                    posterUrl={course.image ? getImageUrl(course.image, "/placeholder-course.jpg") : "/placeholder-course.jpg"}
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py- lg:py-0 lg:mt relative flex flex-col lg:flex-row gap-10 items-start">

        {/* Main Info Section */}
        <div className="flex-1 rounded-3xl bg-white/95  p- space-y-10 border border-amber-50">

          {/* Mobile Get Course Info (only visible on mobile, before Book and Recorder Card) */}
          <div className="block lg:hidden mb-8">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-7 px-5 rounded-2xl text-center shadow-lg border-amber-200 border">
              <div className="text-2xl font-extrabold mb-3 tracking-tight">Get Course Info</div>
              <p className="mb-6 text-white/90 text-base">
                Contact us for enrollment details
              </p>
              <a
                href={`https://wa.me/+1234567890?text=${encodeURIComponent(
                  `Hi! I'm interested in the course: ${course.title}. Can you provide me with more information about enrollment, pricing, and course details?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/95 hover:bg-amber-50 transition text-amber-700 font-bold py-3 rounded-lg flex items-center justify-center gap-3 shadow"
              >
                <FaPlay className="text-amber-600 text-lg" />
                Enroll Now
              </a>
            </div>
          </div>

          {/* About this Course - right below book */}
          <section className="rounded-2xl overflow-hidden pt-6 px-6 sm:px-10 mb-8">
            <header className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full ">
                <FaGraduationCap className="text-2xl text-amber-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-900 tracking-tight">
                About this Course
              </h2>
            </header>
            <div>
              {course.description ? (
                <div
                  className="prose prose-lg prose-amber max-w-none text-gray-800 leading-relaxed animate-fade-in"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
              ) : (
                <div className="bg-amber-50 border-l-4 border-amber-500 px-6 py-4 rounded-md animate-fade-in shadow-inner">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This course provides comprehensive knowledge and practical skills in Islamic education. 
                    Designed to help you deepen your understanding and strengthen your faith through structured learning.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Book Card */}
          {book && (
            <div className="flex flex-col md:flex-row gap-8 p-6 rounded-2xl shadow-sm bg-gradient-to-br from-white via-amber-50 to-amber-100/60 border border-amber-200">
              <div className="w-32 h-32 relative rounded-xl overflow-hidden flex-shrink-0 border-2 border-amber-300 bg-white/50 shadow">
                <Image
                  src={getImageUrl(book.image, "/placeholder-book.jpg")}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FaBook className="text-amber-600 text-2xl" />
                  <span className="font-extrabold text-xl text-primary-900">{book.title}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-amber-700/90 text-sm font-medium mb-2">
                  <span>Edition: <span className="font-semibold">{book.edition || "N/A"}</span></span>
                  <span>| Pages: <span className="font-semibold">{book.pages || "N/A"}</span></span>
                  <span>| Year: <span className="font-semibold">{book.written_year || "N/A"}</span></span>
                </div>
                <div className="text-gray-700 text-base leading-relaxed mb-3">{book.description}</div>
                {book.pdf_file && (
                  <a
                    href={getImageUrl(book.pdf_file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 transition text-white rounded-lg font-semibold shadow"
                  >
                    <FaBook className="text-white opacity-80" />
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          )}
          {/* Recorder Card */}
          {recordedBy && (
            <div className="flex flex-col md:flex-row gap-8 p-6 rounded-2xl shadow-sm bg-gradient-to-br from-white via-emerald-50 to-emerald-100/70 border border-emerald-100">
              <div className="w-32 h-32 relative rounded-xl overflow-hidden flex-shrink-0 border-2 border-emerald-300 bg-white/50 shadow">
                <Image
                  src={getImageUrl(recordedBy.image, "/placeholder-author.jpg")}
                  alt={`${recordedBy.first_name} ${recordedBy.last_name}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FaUsers className="text-emerald-600 text-2xl" />
                  <span className="font-extrabold text-xl text-emerald-900">{recordedBy.first_name} {recordedBy.last_name}</span>
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  {recordedBy.full_address && (
                    <span className="text-gray-600 text-sm flex items-center pl-1">
                      <FaClock className="inline mr-1 text-emerald-400" /> {recordedBy.full_address}
                    </span>
                  )}
                  {recordedBy.description && (
                    <span className="text-gray-700 text-base">{recordedBy.description}</span>
                  )}
                </div>
                {recordedBy.contact_no && (
                  <div className="mt-1 text-sm font-semibold text-emerald-700/80">
                    Contact: <a href={`tel:${recordedBy.contact_no}`} className="hover:underline">{recordedBy.contact_no}</a>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar with get course info and details, FLEXED beside main */}
        <aside className="lg:w-96 w-full bg-gradient-to-br from-amber-100 to-white/90 p-8 rounded-3xl border-2 border-amber-100 lg:sticky lg:top-24 shadow space-y-8 z-20 flex flex-col items-stretch">

          {/* Desktop Get Course Info (hidden on mobile, visible on lg+) */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-7 px-5 rounded-2xl text-center shadow-lg border-amber-200 border">
              <div className="text-2xl font-extrabold mb-3 tracking-tight">Get Course Info</div>
              <p className="mb-6 text-white/90 text-base">
                Contact us for enrollment details
              </p>
              <a
                href={`https://wa.me/+1234567890?text=${encodeURIComponent(
                  `Hi! I'm interested in the course: ${course.title}. Can you provide me with more information about enrollment, pricing, and course details?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/95 hover:bg-amber-50 transition text-amber-700 font-bold py-3 rounded-lg flex items-center justify-center gap-3 shadow"
              >
                <FaPlay className="text-amber-600 text-lg" />
                Enroll Now
              </a>
            </div>
          </div>

          {/* Course Details from API */}
          <div className="space-y-5 bg-white/90 p-6 rounded-2xl border border-amber-100 shadow-sm">
            <h3 className="text-xl font-bold text-amber-800 mb-4 tracking-tight flex items-center gap-2">
              <FaGraduationCap className="text-xl text-amber-500" />
              Course Details
            </h3>
            <ul className="space-y-4">
              {course.duration && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-amber-900">{course.duration}</span>
                </li>
              )}
              {course.video_quantity && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">Videos</span>
                  <span className="font-semibold text-amber-900">{course.video_quantity}</span>
                </li>
              )}
              {course.publish_date && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">Published</span>
                  <span className="font-semibold text-amber-900">
                    {new Date(course.publish_date).toLocaleDateString()}
                  </span>
                </li>
              )}
              {course.resolution && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">Quality</span>
                  <span className="font-semibold text-amber-900">{course.resolution}</span>
                </li>
              )}
              {course.space && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">Size</span>
                  <span className="font-semibold text-amber-900">{course.space}</span>
                </li>
              )}
              {course.short_video && (
                <li className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaVideo className="text-amber-600" />
                    Intro Video
                  </span>
                  <span className="font-semibold text-emerald-600 animate-pulse">Available</span>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
