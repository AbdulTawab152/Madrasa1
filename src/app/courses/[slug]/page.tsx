// app/courses/[slug]/page.tsx
import { CoursesApi, extractArray } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import type { Course } from "@/lib/types";
import VideoPlayer from "../../components/VideoPlayer";
import { getTranslation } from "@/lib/translations";
import Breadcrumb from "@/components/Breadcrumb";


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
  
  // For server-side rendering, default to Pashto
  // Client-side language switching will handle the rest
  const currentLang = 'ps';
  
  const t = (key: string): string => {
    const translation = getTranslation(key, currentLang);
    return typeof translation === 'string' ? translation : key;
  };
  
  // Helper function to translate course data values
  const translateCourseValue = (value: string, type: 'duration' | 'quality' | 'size') => {
    if (!value) return value;
    
    switch (type) {
      case 'duration':
        return value.replace(/hours?/gi, t('courses.hours'));
      case 'quality':
        return value.replace(/hd/gi, t('courses.hd'))
                   .replace(/sd/gi, t('courses.sd'))
                   .replace(/fullhd/gi, t('courses.fullHd'))
                   .replace(/4k/gi, t('courses.ultraHd'));
      case 'size':
        return value.replace(/gb/gi, t('courses.gb'));
      default:
        return value;
    }
  };

  // Helper function to clean HTML from descriptions - improved version
  const cleanHtml = (html: string | null | undefined) => {
    if (!html) return '';
    
    let cleaned = html;
    
    // First, handle common HTML entity encoding
    cleaned = cleaned.replace(/&nbsp;/g, ' ');
    cleaned = cleaned.replace(/&amp;/g, '&');
    cleaned = cleaned.replace(/&lt;/g, '<');
    cleaned = cleaned.replace(/&gt;/g, '>');
    cleaned = cleaned.replace(/&quot;/g, '"');
    cleaned = cleaned.replace(/&#39;/g, "'");
    cleaned = cleaned.replace(/&apos;/g, "'");
    cleaned = cleaned.replace(/&mdash;/g, '—');
    cleaned = cleaned.replace(/&ndash;/g, '–');
    
    // Remove ALL HTML/XML tags including malformed ones
    cleaned = cleaned.replace(/<[^>]*>/g, '');           // Standard tags
    cleaned = cleaned.replace(/<[^>]*$/g, '');           // Unclosed opening tags
    cleaned = cleaned.replace(/<\/[^>]*/g, '');         // Closing tags without >
    cleaned = cleaned.replace(/<[^<]*>/g, '');          // Any remaining tags
    cleaned = cleaned.replace(/\[(\w+)\s[^\]]*\]/g, ''); // Markdown-style tags
    
    // Clean up any remaining HTML entities
    cleaned = cleaned.replace(/&[#\w]+;/g, ' ');
    
    // Clean up whitespace
    cleaned = cleaned.replace(/  +/g, ' ');              // Multiple spaces
    cleaned = cleaned.replace(/\n\s*\n+/g, '\n');        // Multiple line breaks
    cleaned = cleaned.replace(/\s+/g, ' ');              // Any whitespace sequence
    cleaned = cleaned.trim();
    
    return cleaned;
  };


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
          <h2 className="text-2xl font-bold text-black mb-4">{t('courses.courseNotFound')}</h2>
          <p className="text-gray-600 mb-6">
            {t('courses.courseNotFoundMessage')}
          </p>
          <Link
            href="/courses"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg"
          >
            {t('courses.browseAllCourses')}
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
      <Breadcrumb />
      
      {/* Hero Section - Modern & Clean Design - Full Width */}
      <section className="relative min-h-[400px] sm:min-h-[480px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={course?.image ? getImageUrl(course.image, "/placeholder-course.jpg") : "/placeholder-course.jpg"}
            alt={course.title}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 animate-fade-in flex justify-start">
            <nav className="flex items-center gap-2 text-sm text-amber-400/80">
              <Link href="/courses" className="hover:text-amber-400 transition-colors">
                کورسونه
              </Link>
              <span>/</span>
              <span className="text-white/60">{course.title}</span>
            </nav>
          </div>
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative">
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
                {course.title}
              </h1>

              {course.description && (
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg text-gray-300 leading-relaxed animate-fade-in-up line-clamp-2" style={{ animationDelay: '0.2s' }}>
                    {cleanHtml(course.description)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <div className="max-w-7xl z-50 mx-auto px-4 py-6">
      {/* Video Section - Enhanced Design */}
    
      {course.short_video && (
        <section className="relative w-full py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#e0f2f2] text-[#4a8a8a] px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-[#d0e8e8]">
                <FaVideo className="w-4 h-4" />
                {t('courses.coursePreview')}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                {t('courses.watchAndLearn')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Amiri, serif' }}>
                {t('courses.previewDescription')}
              </p>
            </div>
          
            {/* Video Player Container */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2">
                <VideoPlayer
                  videoUrl={course.short_video}
                  posterUrl={course.image ? getImageUrl(course.image, "/placeholder-course.jpg") : "/placeholder-course.jpg"}
                  title={course.title}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-0 lg:mt-8 relative flex flex-col lg:flex-row gap-10 items-start">

        {/* Main Info Section */}
        <div className="flex-1 rounded-3xl bg-white/95 p-8 space-y-10 border border-amber-50">

          {/* Mobile Get Course Info (only visible on mobile, before Book and Recorder Card) */}
          <div className="block lg:hidden mb-8">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-7 px-5 rounded-2xl text-center shadow-lg border-amber-200 border">
              <div className="text-2xl font-extrabold mb-3 tracking-tight">{t('courses.getCourseInfo')}</div>
              <p className="mb-6 text-white/90 text-base">
                {t('courses.enrollmentMessage')}
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
                {t('courses.enrollNow')}
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
                {t('courses.aboutThisCourse')}
              </h2>
            </header>
            <div>
              {course.description ? (
                <div className="prose prose-lg prose-amber max-w-none text-gray-800 leading-relaxed animate-fade-in">
                  <p className="whitespace-pre-line">{cleanHtml(course.description)}</p>
                </div>
              ) : (
                <div className="bg-amber-50 border-l-4 border-amber-500 px-6 py-4 rounded-md animate-fade-in shadow-inner">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t('courses.defaultDescription')}
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
                  src={getImageUrl(book?.image, "/placeholder-book.jpg")}
                  alt={book?.title || 'Book'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
                  <span>{t('courses.edition')}: <span className="font-semibold">{book.edition || "N/A"}</span></span>
                  <span>| {t('courses.pages')}: <span className="font-semibold">{book.pages || "N/A"}</span></span>
                  <span>| {t('courses.year')}: <span className="font-semibold">{book.written_year || "N/A"}</span></span>
                </div>
                <div className="text-gray-700 text-base leading-relaxed mb-3 whitespace-pre-line">{cleanHtml(book.description)}</div>
                {book.pdf_file && (
                  <a
                    href={getImageUrl(book.pdf_file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 transition text-white rounded-lg font-semibold shadow"
                  >
                    <FaBook className="text-white opacity-80" />
                    {t('courses.downloadPdf')}
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
                  src={getImageUrl(recordedBy?.image, "/placeholder-author.jpg")}
                  alt={`${recordedBy?.first_name || ''} ${recordedBy?.last_name || ''}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
                    <span className="text-gray-700 text-base whitespace-pre-line">{cleanHtml(recordedBy.description)}</span>
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
                href={`https://wa.me/+93796148087?text=${encodeURIComponent(
                  `Hi! I'm interested in this course: ${course.title}. سلام! زه د «کمپیوټر» کورس کې علاقه لرم. کولای شئ ماته د نوم لیکنې، بيې، او د کورس جزییاتو په اړه نور معلومات راکړئ؟?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/95 hover:bg-amber-50 transition text-amber-700 font-bold py-3 rounded-lg flex items-center justify-center gap-3 shadow"
              >
                <FaPlay className="text-amber-600 text-lg" />
                {t('courses.enrollNow')}
              </a>
            </div>
          </div>

          {/* Course Details from API */}
          <div className="space-y-5 bg-white/90 p-6 rounded-2xl border border-amber-100 shadow-sm">
            <h3 className="text-xl font-bold text-amber-800 mb-4 tracking-tight flex items-center gap-2">
              <FaGraduationCap className="text-xl text-amber-500" />
              {t('courses.courseDetails')}
            </h3>
            <ul className="space-y-4">
              {course.duration && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">{t('courses.duration')}</span>
                  <span className="font-semibold text-amber-900">{translateCourseValue(course.duration, 'duration')}</span>
                </li>
              )}
              {course.video_quantity && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">{t('courses.videos')}</span>
                  <span className="font-semibold text-amber-900">{course.video_quantity}</span>
                </li>
              )}
              {course.publish_date && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">{t('courses.published')}</span>
                  <span className="font-semibold text-amber-900">
                    {new Date(course.publish_date).toLocaleDateString()}
                  </span>
                </li>
              )}
              {course.resolution && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">{t('courses.quality')}</span>
                  <span className="font-semibold text-amber-900">{translateCourseValue(course.resolution, 'quality')}</span>
                </li>
              )}
              {course.space && (
                <li className="flex justify-between items-center border-b border-dashed border-amber-50 pb-2">
                  <span className="text-gray-600">{t('courses.size')}</span>
                  <span className="font-semibold text-amber-900">{translateCourseValue(course.space, 'size')}</span>
                </li>
              )}
              {course.short_video && (
                <li className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaVideo className="text-amber-600" />
                    {t('courses.introVideo')}
                  </span>
                  <span className="font-semibold text-emerald-600 animate-pulse">{t('courses.available')}</span>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
      </div>
    </div>
  );
}
