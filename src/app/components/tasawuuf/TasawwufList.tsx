"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tasawwuf } from "@/lib/models/tasawwuf";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  limit?: number;
  homePage?: boolean;
}

export default function TasawwufList({ limit, homePage }: Props) {
  const [posts, setPosts] = useState<Tasawwuf[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://lawngreen-dragonfly-304220.hostingersite.com/api/tasawwuf"
        );
        const json = await res.json();

        const data = Array.isArray(json) ? json : [json];
        const filtered = homePage ? data.filter((post) => post.is_top === 1) : data;

        setPosts(limit ? filtered.slice(0, limit) : filtered);

        // extract unique categories
        const uniqueCats = Array.from(
          new Set(data.map((p) => p.category?.name || "Uncategorized"))
        );
        setCategories(["All", ...uniqueCats]);
      } catch (error) {
        console.error("Error fetching Tasawwuf posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [homePage, limit]);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category?.name === selectedCategory);

  // Hero section component
  const HeroSection = () => (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Spiritual <span className="text-orange-600">Wisdom</span> Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            Explore the depths of Islamic spirituality and personal development through timeless teachings and practices.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              href="#content" 
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Explore Content
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 bg-white text-orange-600 font-medium rounded-full border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-12">
        {homePage && <HeroSection />}
        
        {/* Category filter skeleton */}
        {!homePage && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* Posts skeleton */}
        <div className="space-y-10 max-w-7xl mx-auto px-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="relative">
              <div className="flex flex-col md:flex-row gap-8 items-start pb-10 border-b border-gray-100">
                <div className="w-full md:w-72 h-48 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse mt-6"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-1 bg-gray-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length)
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No posts found
        </h3>
        <p className="text-gray-500">
          Check back later for new content.
        </p>
      </div>
    );
    
  return (
    <div className="space-y-12">
      {homePage && <HeroSection />}
      
      <div id="content" className="max-w-7xl mx-auto px-4">
        {/* Category filter buttons */}
        {!homePage && (
          <div className="flex justify-center items-center w-full mb-16">
            <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl shadow-sm p-6 w-full max-w-4xl border border-gray-100">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Posts with animation */}
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  {post.image && (
                    <div className="relative lg:w-5/12 xl:w-4/12 h-72 lg:h-auto overflow-hidden">
                      <Image
                        src={`https://lawngreen-dragonfly-304220.hostingersite.com/storage/${post.image}`}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {homePage && post.is_top === 1 && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          FEATURED
                        </span>
                      )}
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex-1 p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                        {post.category?.name || "Uncategorized"}
                      </span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-500 text-sm">
                        {post.read_time || "5"} min read
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link
                        href={`/tasawwuf/${post.slug}`}
                        className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors duration-300 group/btn"
                      >
                        Read more
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                      
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium text-sm">
                          {post.author?.name?.charAt(0) || "A"}
                        </div>
                        <div className="ml-2 text-sm">
                          <p className="text-gray-900 font-medium">{post.author?.name || "Admin"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              No posts found in this category
            </h3>
            <p className="text-gray-500 mb-6">
              Try selecting a different category
            </p>
            <button 
              onClick={() => setSelectedCategory("All")}
              className="px-6 py-2.5 bg-orange-100 text-orange-700 rounded-full font-medium hover:bg-orange-200 transition-colors duration-300"
            >
              View All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}