
"use client";

import Link from "next/link";
import Image from "next/image";
import { Book } from "../../../lib/types";
import { getImageUrl } from "../../../lib/utils";
import { motion } from "framer-motion";


interface BooksSectionProps {
  books: Book[];
  showAll?: boolean;
}

export default function BooksSection({ books, showAll = false }: BooksSectionProps) {
  const sortedBooks = books?.filter(book => book.is_published === 1);
  const displayBooks = showAll ? sortedBooks : sortedBooks.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section - Show only when viewing all books */}
   {showAll && (
  <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden mb-16  py-16">
    {/* Background with gradient animation */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 opacity-70"></div>
    
    {/* Animated gradient overlay */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-200/30 via-transparent to-orange-200/30 animate-moveGradient"></div>
    </div>
    
    {/* Floating shapes animation */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/10 rounded-full animate-float animate-float-slow"></div>
    <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-400/10 rounded-full animate-float animate-float-medium" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-amber-500/5 rounded-full animate-float animate-float-fast" style={{ animationDelay: '1s' }}></div>
    
    {/* Islamic pattern decorative elements */}
    <div className="absolute top-32 right-10 opacity-10 text-8xl md:text-8xl font-arabic transform rotate-12">﷽</div>
    <div className="absolute bottom-10 left-10 opacity-5 text-7xl md:text-8xl font-arabic transform -rotate-6">📚</div>
    
    {/* Subtle grid pattern */}
    <div className="absolute inset-0 bg-grid-pattern bg-center bg-cover opacity-5"></div>
    
    {/* Main content */}
    <div className="relative z-10 max-w-6xl mx-auto text-center">
      {/* Animated badge */}
      {/* <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center justify-center mb-10 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full text-amber-700 text-sm font-medium shadow-lg border border-amber-200/50"
      >
        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
        Divine Knowledge Collection
      </motion.div> */}
      
      {/* Main heading with animation */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 bg-clip-text text-transparent"
      >
        Journey Through <span className="text-amber-600">Islamic</span> Literature
      </motion.h1>
      
      {/* Subheading with animation */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
      >
        Explore timeless wisdom from renowned scholars and authors. Our carefully curated collection brings you authentic Islamic knowledge for spiritual growth.
      </motion.p>
      
      {/* Stats with animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-wrap justify-center gap-6 mt-12"
      >
        {[
          // { number: `${books?.length || 0}+`, label: "Sacred Texts", icon: "📖" },
          // { number: "50+", label: "Renowned Scholars", icon: "👳" },
          // { number: "100%", label: "Authentic Content", icon: "⭐" }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white/80 backdrop-blur-md p-5 rounded-2xl text-center min-w-[160px] border border-amber-100/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-amber-700 mb-1">{stat.number}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div> */}
          </motion.div>
        ))}
      </motion.div>
      
      {/* CTA Button with animation */}
      {/* <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="mt-14"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto gap-3 group"
        >
          Start Exploring
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </motion.div> */}
    </div>
    
    {/* Scroll indicator */}
    {/* <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
    >
      <span className="text-sm text-gray-500 mb-2 tracking-wider">SCROLL TO EXPLORE</span>
      <div className="w-7 h-12 border-2 border-amber-300/30 rounded-full flex justify-center p-1">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-2 h-3 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"
        />
      </div>
    </motion.div> */}
  </div>
)}

      {/* Section Header for featured books */}
      {!showAll && (
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Featured Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Sacred <span className="text-amber-600">Knowledge</span> Treasures
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most revered Islamic books carefully selected for their authenticity and spiritual value
          </p>
        </div>
      )}

      {/* Books Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {displayBooks.map(book => (
    <Link key={book.id} href={`/book/${book.id}`} className="group">
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full relative">
        
        {/* Premium Badge */}
        {book.is_featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              ⭐ Featured
            </div>
          </div>
        )}
        
        {/* Book Image Container */}
        <div className="relative overflow-hidden h-60">
          {book.image ? (
            <div className="relative w-full h-full">
              <Image
                src={getImageUrl(book.image) || ''}
                alt={book.title}
                width={400}
                height={240}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center relative">
              {/* Islamic Pattern Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 pattern-islamic pattern-amber-300 pattern-opacity-20 pattern-size-10"></div>
              </div>
              <div className="text-5xl text-amber-300 z-10">📚</div>
            </div>
          )}
          
          {/* Hover Effect - Read More Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white text-amber-700 font-medium py-2.5 px-5 rounded-full shadow-lg transform translate-y-5 group-hover:translate-y-0 transition-transform duration-500 flex items-center">
              Read More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Category Tag */}
          <div className="mb-3">
            <span className="inline-block text-xs font-medium text-amber-700 bg-amber-100 py-1 px-3 rounded-full">
              Islamic Studies
            </span>
          </div>
          
          {/* Title with elegant underline */}
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-amber-700 transition-colors duration-300">
            {book.title}
          </h2>
          
          {/* Author */}
          <p className="text-sm text-amber-600 mb-4 font-medium flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {book.author || "Islamic Scholar"}
          </p>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed flex-grow">
            {book.description.replace(/<[^>]*>/g, '')}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-5 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {book.pages} pages
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {book.written_year}
            </div>
          </div>

          {/* CTA Button - Visible on mobile */}
          <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg md:hidden flex items-center justify-center mt-auto">
            View Details
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  ))}
</div>

      {/* View All Button for featured section */}
      {!showAll && displayBooks.length > 0 && (
        <div className="mt-16 flex justify-center">
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:gap-4 hover:from-amber-600 hover:to-amber-700"
          >
            Browse Full Library
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}