"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Fetch blogs from API
async function fetchBlogsData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/blogs";
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) throw new Error("Error fetching blogs");

  const data = await res.json();
  return data;
}

// Helper to get full image URL
const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

interface BlogsPreviewProps {
  limit?: number;
  homePage?: boolean;
}

export default function BlogsPreview({ limit, homePage }: BlogsPreviewProps) {
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchBlogsData()
      .then((data) => {
        let filtered = data.filter((item: any) => item.is_published);
        if (homePage) filtered = filtered.filter((item: any) => item.is_top);
        setBlogsData(filtered);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [homePage]);

  const categories = ["All", ...new Set(blogsData.map((item) => item.category?.name || "General"))];

  let displayBlogs = blogsData;
  if (selectedCategory !== "All") {
    displayBlogs = displayBlogs.filter((item) => item.category?.name === selectedCategory);
  }

  if (limit) displayBlogs = displayBlogs.slice(0, limit);

  return (
    <section id="blogs" className="bg-gradient-to-b from-gray-50 to-white py-16">
      {/* Enhanced Home Page Hero / Title */}
      {!homePage && (
        <section className="relative w-full overflow-hidden">
          {/* Multi-layered Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Enhanced multi-layered gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50" />
            {/* Subtle SVG pattern overlay for extra texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.08'%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3C/g%3E%3Cg fill='%23f472b6' fill-opacity='0.06'%3E%3Crect x='10' y='10' width='20' height='20' rx='5'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
                backgroundRepeat: "repeat",
              }}
            />
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-r from-orange-200/40 via-pink-100/30 to-pink-200/40 rounded-full blur-3xl shadow-2xl"
              animate={{
                x: [0, 140, 0],
                y: [0, -80, 0],
                scale: [1, 1.35, 1],
                rotate: [0, 15, 0],
              }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-16 right-16 w-[28rem] h-[28rem] bg-gradient-to-r from-pink-200/30 via-orange-100/30 to-orange-200/30 rounded-full blur-3xl shadow-xl"
              animate={{
                x: [0, -120, 0],
                y: [0, 100, 0],
                scale: [1, 0.95, 1],
                rotate: [0, -10, 0],
              }}
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Extra animated orb for depth */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-orange-100/60 to-pink-100/60 rounded-full blur-2xl"
              style={{ translate: "-50% -50%" }}
              animate={{
                x: [0, 40, -40, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.1, 0.95, 1],
                opacity: [0.7, 1, 0.8, 0.7],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Geometric accent dots with more variety and animation */}
            <motion.div
              className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-400/70 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400/80 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.1 }}
            />
            <motion.div
              className="absolute top-2/3 left-1/4 w-2 h-2 bg-orange-300/80 rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 2.1 }}
            />
            {/* New accent: animated star */}
            <motion.div
              className="absolute top-1/2 right-1/4 text-yellow-400"
              style={{ fontSize: "1.25rem" }}
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8" />
              </svg>
            </motion.div>
          </div>
          
          <div className="relative z-10 py-24 md:py-24 px-6 flex flex-col items-center text-center">
            <motion.div 
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 backdrop-blur-md border border-orange-200/50 text-orange-600 text-sm font-medium rounded-full shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              </motion.div>
              <span>Our Blogs</span>
              <motion.div
                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Blogs
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-200/50 to-pink-200/50 rounded-full -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <br className="hidden md:block" />
              That{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Inspire
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-300/60 to-orange-300/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore our curated collection of Islamic courses and tutorials. Learn, grow, and advance your knowledge at your own pace.
            </motion.p>
          </div>
        </section>
      )}
      
      {homePage && (
        <motion.div 
          className="max-w-4xl mt- space-y-8 mx-auto px-6 text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg uppercase tracking-wider font-semibold text-orange-500/90 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Knowledge & Guidance
          </motion.p>

          {/* Title */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
              Latest Blogs
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-md sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore articles, insights, and stories about{" "}
            <span className="font-semibold text-orange-600">Islamic education</span>,{" "}
            <span className="font-semibold text-orange-600">spiritual growth</span>, and{" "}
            <span className="font-semibold text-orange-600">community guidance</span>.
          </motion.p>
        </motion.div>
      )}

      {/* Category Filter */}

      {!homePage && (
      <div className="max-w-7xl mt-10 mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-orange-200 hover:bg-orange-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayBlogs.map((item: any, index: number) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <motion.div
              className="relative flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 transition-all duration-300"
              whileHover={{ y: -4, boxShadow: "0 20px 25px rgba(0,0,0,0.1)" }}
            
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-105"
                  width={500}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-xl backdrop-blur-sm">
                  {item.category?.name || "General"}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white font-bold text-xl line-clamp-2 drop-shadow-2xl">
                    {item.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.description?.replace(/<[^>]*>/g, "")}
                </p>  

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100/50 pt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{item.date?.split("T")[0] || "Unknown date"}</span>
                  </div>
               
                  <Link
                          href={`/blogs/${item.slug}`}
                          className="group block h-full text-orange-500 hover:text-orange-600 transition-colors rounded outline-none focus:outline-none focus:ring-0"
                        >
                          See More →
                        </Link>

                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* View All Button for Home Page */}
      {homePage && displayBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
          <Link href="/blogs">
            <motion.button 
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Blogs
            </motion.button>
          </Link>
        </div>
      )}
    </section>
  );
}