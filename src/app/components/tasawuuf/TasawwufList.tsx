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

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-12">
        {/* Category filter skeleton */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        {/* Posts skeleton */}
        <div className="space-y-10">
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
      {/* Category filter buttons */}
{/* Category filter buttons */}
{!homePage && (
  <div className="flex justify-center items-center w-full">
    <div className="flex flex-wrap items-center justify-center gap-4 border rounded-lg bg-orange-600/10 py-6 px-6 max-w-2xl w-full">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-full text-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
            selectedCategory === cat
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600 border border-gray-200"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  </div>
)}




      {/* Posts with animation */}
      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start pb-10 border-b border-gray-100">
                {/* Image */}
                {post.image && (
                  <div className="relative w-full md:w-72 h-48 flex-shrink-0 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={`https://lawngreen-dragonfly-304220.hostingersite.com/storage/${post.image}`}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {homePage && post.is_top === 1 && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        TOP
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                )}

                {/* Text Content */}
                <div className="flex-1">
                  <div className="inline-block mb-4 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    {post.category?.name || "Uncategorized"}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-5 leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/tasawwuf/${post.slug}`}
                      className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors duration-300 group/btn"
                    >
                       See more
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1 transition-transform duration-300 group-hover/btn:translate-x-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    
                   
                  </div>
                </div>
              </div>
              
              {/* Accent line */}
              <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500 group-hover:w-24 transition-all duration-500"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-medium text-gray-700">
            No posts found in this category
          </h3>
          <p className="text-gray-500 mt-1">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  );
}