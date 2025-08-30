"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      {/* Home Page Hero / Title */}
        {!homePage && (
        <section className="relative w-full  md:mt-12 mb-16 md:mb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50 z-0"></div>
          <div className="relative z-10 py-16 md:py-24 px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white shadow-md border border-orange-100 text-orange-600 text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Our Blogs
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 leading-tight">
              Discover{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Blogs
              </span>{" "}
              <br className="hidden md:block" />
              That{" "}
              <span className="relative inline-block">
                Inspire
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore our curated collection of Islamic courses and tutorials. Learn, grow, and advance your knowledge at your own pace.
            </p>
          </div>
        </section>
      )}
      {homePage && (
        <div className="max-w-7xl mt-32  mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Our <span className="text-orange-500">Latest Blogs</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore curated tips, insights, and stories about saffron cultivation, health, and lifestyle.
          </p>
        </div>
      )}

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
     <div className="flex flex-wrap justify-center gap-3 mb-12">
  {!homePage &&
    categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedCategory === cat
            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform -translate-y-1"
            : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:shadow-md"
        }`}
      >
        {cat}
      </button>
    ))}
</div>


        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(limit || 6)].map((_, i) => (
              <div key={i} className="flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="h-56 w-full bg-gray-200"></div>
                <div className="p-6 flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                  <div className="flex justify-between mt-auto">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs found</h3>
            <p className="text-gray-500">We couldn't find any blogs in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((item: any) => (
              <Link key={item.slug} href={`/blogs/${item.slug}`} className="group block h-full">
                <div className="relative flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                      width={500}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                      {item.category?.name || "General"}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-white font-bold text-xl line-clamp-2 drop-shadow-lg">{item.title}</h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {item.description?.replace(/<[^>]*>/g, "")}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500 gap-3 pt-4 border-t border-gray-100">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {item.date?.split("T")[0] || "Unknown date"}
                      </span>
                      <span className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full text-amber-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.author || "Admin"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Blogs button */}
        {homePage && displayBlogs.length > 0 && (
          <div className="col-span-full text-center mt-16">
            <Link
              href="/blogs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              View All Blogs
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
