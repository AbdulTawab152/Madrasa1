// components/iftah/IftahSection.tsx
'use client';
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Author {
  name: string;
  bio?: string;
}

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  references?: string[];
  is_published?: boolean;
  viewCount?: number;
}

interface IftahSectionProps {
  fatwas: Iftah[];
  showAll?: boolean;
}

export default function IftahSection({ fatwas, showAll = false }: IftahSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const sortedFatwas =
    fatwas
      ?.filter(iftah => iftah.is_published)
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)) || [];

  const displayFatwas = showAll ? sortedFatwas : sortedFatwas.slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}

{showAll && (
  <div className="relative overflow-hidden min-h-screen flex items-center justify-center mb-20">
    {/* Background Image with Enhanced Overlay */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/1.jpg" // replace with your image path
        alt="Islamic Guidance Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/90 via-amber-900/85 to-orange-800/80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTAgMEg2MFY2MEgwVjBaIi8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyMCIvPjwvZz48L3N2Zz4=')] opacity-15"></div>
    </div>

    {/* Enhanced Animated Elements */}
    <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-amber-400/15 to-orange-500/10 rounded-full animate-pulse-slow"></div>
    <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-amber-400/15 rounded-full animate-pulse-slower"></div>
    <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-white/15 to-amber-100/10 rounded-full animate-float"></div>
    
    {/* Additional floating elements for depth */}
    <div className="absolute top-1/4 left-1/5 w-10 h-10 bg-amber-300/10 rounded-full animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute bottom-1/4 right-1/5 w-14 h-14 bg-orange-400/10 rounded-full animate-float-medium" style={{ animationDelay: "2s" }}></div>
    
    {/* Arabic Calligraphy Elements */}
    <div className="absolute top-5 right-5 md:top-10 md:right-10 opacity-25 text-5xl md:text-7xl text-white font-arabic">
      ﷲ
    </div>
    <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 opacity-20 text-4xl md:text-6xl text-amber-200 font-arabic">
      ﷴ
    </div>

    {/* Main Content Container */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 py-12"
    >
      {/* Icon with enhanced glow */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 10 }}
        className="inline-flex items-center justify-center mb-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/40 ring-2 ring-amber-300/30"
      >
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>

      {/* Decorative elements */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>
        <div className="w-3 h-3 mx-4 bg-amber-400 rounded-full animate-ping"></div>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"></div>
      </div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
      >
        <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 bg-clip-text text-transparent drop-shadow-md">
          Islamic Guidance
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-xl md:text-2xl text-amber-100 mb-8 font-medium max-w-3xl mx-auto leading-relaxed"
      >
        Discover authentic answers from qualified scholars and Islamic authorities
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="text-lg text-orange-100/90 mb-10 max-w-2xl mx-auto leading-relaxed px-4"
      >
        Find authentic fatwas and guidance for your daily life according to Quran and Sunnah, 
        all in one clean and easy-to-read space.
      </motion.p>

      {/* Feature Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4"
      >
        {[
          { icon: "📖", title: "Quran & Sunnah", desc: "Based on authentic sources" },
          { icon: "👳", title: "Qualified Scholars", desc: "Verified Islamic authorities" },
          { icon: "🔍", title: "Easy Search", desc: "Find answers quickly" }
        ].map((feature, index) => (
          <div key={index} className="bg-orange-900/30 p-5 rounded-xl border border-orange-700/30 backdrop-blur-sm">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <div className="text-amber-200 font-semibold mb-2">{feature.title}</div>
            <div className="text-orange-100/80 text-sm">{feature.desc}</div>
          </div>
        ))}
      </motion.div>

      {/* Stats with improved design */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="grid grid-cols-3 gap-8 py-8 max-w-2xl mx-auto border-t border-orange-400/20"
      >
        {[
          { number: "500+", label: "Fatwas" },
          { number: "50+", label: "Scholars" },
          { number: "10K+", label: "Readers" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-amber-300 mb-2 drop-shadow-md">{stat.number}</div>
            <div className="text-orange-100/80 text-sm uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </motion.div> */}
    </motion.div>

    {/* Enhanced Scroll Indicator */}

  </div>
)}


{!showAll && (
  <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-24 px-6 rounded-3xl mb-20 shadow-2xl border border-indigo-100">
    {/* Enhanced Background Pattern - More visible */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM1QjgwREUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2Utb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxNSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjI1Ii8+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNSIvPjxsaW5lIHgxPSIzMCIgeTE9IjAiIHgyPSIzMCIgeTI9IjYwIi8+PGxpbmUgeDE9IjAiIHkxPSIzMCIgeDI9IjYwIiB5Mj0iMzAiLz48L2c+PC9zdmc+')]"></div>
    </div>

    {/* Floating Elements - New color scheme */}
    <div className="absolute top-12 left-12 w-28 h-28 bg-gradient-to-br from-blue-300/30 to-indigo-300/20 rounded-full blur-2xl animate-float-slow"></div>
    <div className="absolute bottom-12 right-16 w-20 h-20 bg-gradient-to-br from-purple-300/30 to-blue-300/20 rounded-full blur-2xl animate-float-medium" style={{ animationDelay: "1.5s" }}></div>
    <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-indigo-300/20 to-blue-200/10 rounded-full blur-xl animate-float-slow" style={{ animationDelay: "2.5s" }}></div>

    {/* Content Container with subtle border */}
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="text-center relative z-10 max-w-4xl mx-auto bg-white/40 backdrop-blur-sm rounded-2xl py-12 px-8 border border-white/50 shadow-sm"
    >
      {/* Icon Badge - New design */}
      <motion.div 
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 10 }}
        className="inline-flex items-center justify-center mb-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 shadow-lg shadow-blue-200/60 ring-2 ring-white ring-opacity-50"
      >
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>

      {/* Heading - New color scheme */}
      <motion.h2 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight"
      >
        <span className="bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent drop-shadow-sm">
          Islamic
        </span>
      </motion.h2>

      {/* Description - Improved readability */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl text-indigo-900/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
      >
        Discover trusted answers to your questions from qualified scholars and authentic Islamic sources.
      </motion.p>

      {/* Decorative separator */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="h-1 bg-gradient-to-r from-indigo-300 to-blue-400 mx-auto mb-10 rounded-full"
      ></motion.div>

      {/* Feature highlights */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {[
          { icon: "📚", text: "Authentic Sources" },
          { icon: "👳", text: "Qualified Scholars" },
          { icon: "🔍", text: "Detailed Answers" }
        ].map((feature, index) => (
          <div key={index} className="bg-white/70 p-4 rounded-xl border border-white/50 shadow-sm">
            <div className="text-2xl mb-2">{feature.icon}</div>
            <div className="text-indigo-800 font-medium">{feature.text}</div>
          </div>
        ))}
      </motion.div>

      {/* Pulsing Dots - New color scheme */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center space-x-3"
      >
        <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full animate-ping-slow"></div>
        <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-ping-medium" style={{ animationDelay: "0.3s" }}></div>
        <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full animate-ping-slow" style={{ animationDelay: "0.6s" }}></div>
      </motion.div>
    </motion.div>
  </div>
)}




      {/* Fatwas List */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
        className="space-y-8 px-20 "
      >
        {displayFatwas.map((iftah, index) => (
          <motion.div
            key={iftah.slug}
       
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl  p-6  hover: transition-all duration-300 border border-orange-100 group relative overflow-hidden"
          >
            {/* Animated background element */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10"></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
              <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-orange-100/30 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
            </div>

            {/* Header with title and metadata */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 relative z-10">
              <div className="flex-1">
                <motion.h3 
                  whileHover={{ color: "#ea580c" }}
                  className="text-xl font-semibold text-gray-900 leading-tight mb-2"
                >
                  <Link href={`/iftah/${iftah.slug}`} className="hover:underline block">
                    {iftah.title}
                  </Link>
                </motion.h3>
                
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                  {iftah.mufti && (
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center bg-orange-50 px-3 py-1 rounded-full"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-amber-700">{iftah.mufti.name}</span>
                    </motion.div>
                  )}
                  
                  {iftah.category && (
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {iftah.category}
                    </motion.span>
                  )}
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center text-gray-500"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{iftah.viewCount || 0} views</span>
                  </motion.div>
                </div>
              </div>
              
              {index < 3 && !showAll && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex-shrink-0"
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Popular
                  </span>
                </motion.div>
              )}
            </div>

            {/* Question & Answer */}
            <div className="space-y-4 mb-5 relative z-10">
              <div className="flex items-start">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm"
                >
                  <span className="text-amber-700 font-semibold text-sm">Q</span>
                </motion.div>
                <p className="text-gray-800 font-medium leading-relaxed">
                  {iftah.question}
                </p>
              </div>

              <div className="flex items-start">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm"
                >
                  <span className="text-amber-700 font-semibold text-sm">A</span>
                </motion.div>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {iftah.answer}
                </p>
              </div>
            </div>

            {/* Footer with tags and read more */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-orange-100 relative z-10">
              {iftah.tags && iftah.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {iftah.tags.slice(0, 3).map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium cursor-pointer hover:bg-amber-100 transition-colors"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                  {iftah.tags.length > 3 && (
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full text-xs">
                      +{iftah.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
              
              <motion.div whileHover={{ x: 5 }}>
                <Link
                  href={`/iftah/${iftah.slug}`}
                  className="inline-flex items-center text-amber-600 font-medium hover:text-orange-700 transition-colors group-hover:underline flex-shrink-0"
                >
                  Read Full Answer
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {!showAll && displayFatwas.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/iftah"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group"
          >
            {/* Button shine effect */}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity -skew-x-12 group-hover:animate-shimmer"></span>
            
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Explore All Fatwas
          </Link>
        </motion.div>
      )}

      {displayFatwas.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100"
        >
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
          >
            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No fatwas available yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">We're preparing valuable Islamic rulings. Check back soon for new content.</p>
        </motion.div>
      )}

      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}