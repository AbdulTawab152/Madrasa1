"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Blog {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_featured: boolean;
  category_id: number;
  author?: string;
  reading_time?: string;
  views?: string;
  tags?: string[];
}

interface BlogsSectionProps {
  blogs: Blog[];
  showAll?: boolean;
}

export default function BlogsSection({ blogs, showAll = false }: BlogsSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sortedBlogs =
    blogs
      ?.filter(blog => blog.is_published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const displayBlogs = showAll ? sortedBlogs : sortedBlogs.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  const featuredBlog = sortedBlogs.find(b => b.is_featured);

  return (
    <div className="w-full relative overflow-hidden w-full mx-auto px-4 md:px-0">
      {/* New Hero Section */}
     {showAll && (
  <section className="relative w-full mt-6 px-0 md:mt-12 mb-16 md:mb-20 overflow-hidden">
    {/* Background with gradient mesh */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-white to-pink-50/70 z-0"></div>
    
    {/* Animated gradient blob background */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-50 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-50 blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-40 blur-3xl animate-blob animation-delay-4000"></div>
    </div>
    
    <div className="relative z-10 py-16 md:py-24 px-4 md: flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm border border-orange-200 text-orange-600 text-sm font-medium rounded-full shadow-sm">
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
        Welcome to our blog
      </div>
      
      {/* Main headline */}
      <div className={`transition-all duration-1000 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
          Discover <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Insights</span> <br className="hidden md:block" />
          That <span className="relative">
            Inspire
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 20">
              <path d="M 0 15 Q 100 0 200 15" stroke="url(#gradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF8A00" />
                  <stop offset="100%" stopColor="#DA1B60" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          Explore our collection of articles, tutorials, and thoughts on technology, design, and more. 
          Stay updated with the latest trends and insights.
        </p>
        
        {/* CTA Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link 
            href="#featured-blogs" 
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Read Latest Articles</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link 
            href="/blogs" 
            className="group px-8 py-4 border-2 border-orange-400 text-orange-500 font-semibold rounded-2xl hover:bg-orange-50 transition-all flex items-center gap-2"
          >
            <span>Browse All Content</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div> */}
      </div>
      
      {/* Stats Section with icons */}
      {/* <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 transition-all duration-1000 delay-500 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-orange-600">{sortedBlogs.length}+</div>
          <div className="text-gray-600 mt-2 font-medium">Articles</div>
        </div>
        
        <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-pink-600">10+</div>
          <div className="text-gray-600 mt-2 font-medium">Categories</div>
        </div>
        
        <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-amber-600">5K+</div>
          <div className="text-gray-600 mt-2 font-medium">Readers</div>
        </div>
      </div> */}
    </div>
    
    {/* Animated floating elements */}
    <div className="absolute top-20 left-10 w-6 h-6 bg-orange-300 rounded-full opacity-60 animate-float-1"></div>
    <div className="absolute top-1/3 right-20 w-8 h-8 bg-pink-300 rounded-full opacity-50 animate-float-2"></div>
    <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-amber-200 rounded-full opacity-60 animate-float-3"></div>
    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-orange-200 rounded-full opacity-50 animate-float-4"></div>
    
    {/* Scroll indicator */}
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  </section>
)}

      {/* Featured Blog Section */}
      {featuredBlog && !showAll && (
        <section id="featured-blogs" className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Article</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't miss our most popular and insightful piece of content
            </p>
          </div>
          
          <div className="relative w-full h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src={featuredBlog.image ? getImageUrl(featuredBlog.image) : "/1.jpg"}
              alt={featuredBlog.title}
              fill
              priority
              className="object-cover brightness-90 transform transition-transform duration-1000 ease-out group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute bottom-10 left-6 md:left-16 max-w-2xl z-10">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-semibold rounded-full">
                  Featured
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight text-white">
                  {featuredBlog.title}
                </h1>
                <p className="text-lg md:text-xl mb-5 text-gray-200 line-clamp-4">
                  {featuredBlog.description.replace(/<[^>]*>/g, '')}
                </p>
                <div className="flex items-center gap-4 mb-5 text-gray-200">
                  <span className="flex items-center gap-1">✍️ {featuredBlog.author || "Admin"}</span>
                  <span className="flex items-center gap-1">⏱️ {featuredBlog.reading_time || "5 min read"}</span>
                </div>
                <Link
                  href={`/blogs/${featuredBlog.slug}`}
                  className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rest of your existing content */}
      {/* Section Heading */}
      {!showAll && (
        <div className="text-center mb-12 relative px-4 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse">
            📝 Latest Blogs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Explore Our <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Newest Insights</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl mb-8">
            {showAll
              ? "Explore all our blogs and insights."
              : "Check out our newest and most popular articles."}
          </p>
          <div className="flex justify-center mt-2">
            <span className="w-28 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {displayBlogs.map(blog => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group w-full max-w-sm">
            <div className="bg-white rounded-xl overflow-hidden border border-orange-500/20 hover:border-orange-400/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-[500px] relative">
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-500"></div>

              {/* Blog Image */}
              <div className="relative h-56 overflow-hidden">
                {blog.image ? (
                  <Image
                    src={getImageUrl(blog.image)}
                    alt={blog.title}
                    width={400}
                    height={224}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                {blog.is_featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Blog Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1 line-clamp-4">
                  {blog.description.replace(/<[^>]*>/g, '')}
                </p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <span key={tag} className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded-full shadow-sm transition-all">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4 text-xs text-gray-500 gap-3 flex-wrap">
                  <span className="flex items-center gap-1">✍️ {blog.author || "Admin"}</span>
                  <span className="flex items-center gap-1">⏱️ {blog.reading_time || "5 min read"}</span>
                  <span className="flex items-center gap-1">👁️ {blog.views || "1.2k"} views</span>
                </div>

                <button className="mt-4 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-semibold py-2 rounded-2xl hover:scale-105 transition-all shadow-md text-sm">
                  Read More
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore All Blogs Button */}
      {!showAll && displayBlogs.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-semibold text-md rounded-md shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,165,0,0.6)]"
          >
            Explore All Blogs
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}