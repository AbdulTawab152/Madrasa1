"use client";

import Link from "next/link";
import Image from "next/image";

interface Graduation {
  studentName: string;
  slug: string;
  img?: string;
  graduationDate: string;
  course?: string;
  grade?: string;
  certificate?: string;
  testimonial?: string;
  achievements?: string[];
  is_published?: boolean;
  is_featured?: boolean;
  description?: string;
  degree?: string;
  faculty?: string;
  location?: string;
}

interface GraduationsSectionProps {
  graduations: Graduation[];
  showAll?: boolean;
}

export default function GraduationsSection({ graduations, showAll = false }: GraduationsSectionProps) {
  const sortedGraduations =
    graduations
      ?.filter(g => g.is_published)
      .sort((a, b) => new Date(b.graduationDate).getTime() - new Date(a.graduationDate).getTime()) || [];

  const displayGraduations = showAll ? sortedGraduations : sortedGraduations.slice(0, 3);
  const featuredGraduation = sortedGraduations.find(g => g.is_featured);

  const getImageUrl = (img?: string) => {
    if (!img) return '/default-student.jpg'; // Default fallback image
    if (img.startsWith("http")) return img;
    // Clean up the path and construct the URL
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img.replace(/^\/+/, '')}`;
  };

  return (
    <div className="w-full relative px-4 md:px-0 py-16 bg-gray-50">

      {/* Hero Featured Graduation */}
      {featuredGraduation && !showAll && (
        <div className="relative w-full h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl mb-12 group">
          <Image
            src={getImageUrl(featuredGraduation.img)}
            alt={featuredGraduation.studentName}
            fill
            className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = '/default-student.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute bottom-12 left-8 md:left-16 text-white max-w-2xl z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight animate-fade-in-up">
              {featuredGraduation.studentName}
            </h1>
            <p className="text-lg md:text-xl mb-5 animate-fade-in-up delay-200">
              🎓 {featuredGraduation.degree || "Graduated with Excellence"} in {featuredGraduation.course || "Course Name"}
            </p>
            <Link
              href={`/graduated-students/${featuredGraduation.slug}`}
              className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              View Profile
            </Link>
          </div>

          {/* Floating Shapes */}
          <div className="absolute top-10 left-10 w-6 h-6 bg-orange-400 rounded-full opacity-50 animate-bounce-slow"></div>
          <div className="absolute bottom-20 right-20 w-10 h-10 bg-pink-400 rounded-full opacity-40 animate-bounce-slower"></div>
          <div className="absolute top-32 right-1/3 w-4 h-4 bg-orange-300 rounded-full opacity-50 animate-bounce-slow"></div>
        </div>
      )}

      {/* Section Header */}
      {!showAll && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse">
            🎓 Celebrating Success
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Our <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">Star Graduates</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-6 animate-fade-in-up">
            Meet the students who excelled and made their mark with dedication and hard work.
          </p>
        </div>
      )}

      {/* Graduation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayGraduations.map(graduation => (
          <Link
            key={graduation.slug}
            href={`/graduated-students/${graduation.slug}`}
            className="group relative w-full max-w-sm mx-auto cursor-pointer"
          >
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              
              {/* Student Image */}
              <Image
                src={getImageUrl(graduation.img)}
                alt={graduation.studentName}
                fill
                className="object-cover w-full h-full rounded-3xl transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-student.jpg';
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 rounded-3xl">
                <h3 className="text-white text-2xl font-bold mb-1">{graduation.studentName}</h3>
                {graduation.degree && <p className="text-white/90 text-sm mb-1">🎓 {graduation.degree}</p>}
                {graduation.course && <p className="text-white/80 text-sm mb-1">📘 {graduation.course}</p>}
                {graduation.grade && <p className="text-yellow-400 font-semibold text-sm mb-2">⭐ {graduation.grade}</p>}
                {graduation.description && <p className="text-white/80 text-xs line-clamp-3">{graduation.description}</p>}
                <button className="mt-3 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-semibold py-2 rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300">
                  View Details →
                </button>
              </div>

              {/* Featured Badge */}
              {graduation.is_featured && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md animate-pulse">
                  🌟 Featured
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Explore All Button */}
      {!showAll && displayGraduations.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/graduations"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.05]"
          >
            Explore All Graduations
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}