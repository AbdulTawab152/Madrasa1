"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 pt-32">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/1.jpg"
          alt="Islamic Learning Background"
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-amber-700/20"></div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-center md:items-start">
          
          {/* Badge */}
          <button className="mt-16 mb-6 flex items-center space-x-2 border border-amber-600 text-amber-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-amber-50 transition">
            <span>63 Years of Islamic Excellence</span>
            <span className="flex items-center justify-center size-6 p-1 rounded-full bg-amber-600">
              <svg width="14" height="11" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6.5h14M9.5 1 15 6.5 9.5 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* Main Heading */}
          <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
            Anwarul Uloom
            <span className="block text-amber-600 mt-2">
              أنوار العلوم
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="mt-4 text-gray-700 font-medium text-xl sm:text-2xl max-w-xl leading-relaxed">
            Illuminating Minds with Sacred Knowledge
          </h2>

          {/* Description */}
          <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
            Established in 1961, we nurture hearts and minds through authentic Islamic teachings, scholarly wisdom, and spiritual guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
            <Link
              href="/courses"
              className="bg-amber-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-amber-700 transition"
            >
              <span>Explore Our Courses</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="text-amber-600 bg-amber-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition"
            >
              Learn About Us
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center mt-12 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">63+</div>
              <div className="text-xs text-gray-600">Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">500+</div>
              <div className="text-xs text-gray-600">Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">50+</div>
              <div className="text-xs text-gray-600">Scholars</div>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div aria-label="Islamic Education Images" className="mt-12 grid grid-cols-2 gap-6 pb-6">
          <div className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
            <span className="text-amber-800 font-bold text-lg">📚</span>
          </div>
          <div className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center">
            <span className="text-amber-800 font-bold text-lg">🕌</span>
          </div>
          <div className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <span className="text-amber-800 font-bold text-lg">📖</span>
          </div>
          <div className="w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">✨</span>
          </div>
        </div>
      </main>
    </section>
  );
}
