"use client"; // ✅ Needed since we'll use state & interactivity

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Fetch articles from API
async function fetchArticlesData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/articles";
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) throw new Error("Error fetching data");

  const data = await res.json();
  return data;
}

// Helper to get full image URL
const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

interface ArticlesPreviewProps {
  limit?: number;
  homePage?: boolean; // true for homepage, false/undefined for articles page
}

export default function ArticlesPreview({ limit, homePage }: ArticlesPreviewProps) {
  const [articlesData, setArticlesData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchArticlesData().then((data) => {
      // Only published
      let filtered = data.filter((item: any) => item.is_published);
      if (homePage) {
        filtered = filtered.filter((item: any) => item.is_top);
      }
      setArticlesData(filtered);
    });
  }, [homePage]);

  // Extract unique categories
  const categories = ["All", ...new Set(articlesData.map((item) => item.category.name))];

  // Apply category filter
  let displayArticles = articlesData;
  if (selectedCategory !== "All") {
    displayArticles = displayArticles.filter((item) => item.category.name === selectedCategory);
  }

  // Apply limit if provided
  if (limit) displayArticles = displayArticles.slice(0, limit);

  return (
    <section id="articles" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest <span className="text-orange-600">Articles</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The latest educational, research, and news content about saffron cultivation, harvesting, and usage.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
        {!homePage &&
  categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
        selectedCategory === cat
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-white text-gray-700 border-gray-200 hover:border-orange-400"
      }`}
    >
      {cat}
    </button>
  ))
}

        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArticles.map((item: any) => (
            <Link key={item.slug} href={`/articles/${item.slug}`} className="group block h-full">
              <div className="relative flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">

                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    width={500}
                    height={224}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                    {item.category.name}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-white font-bold text-lg mb-1 line-clamp-1 drop-shadow-md">
                      {item.title}
                    </h2>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-5">
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {item.question || item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between text-xs text-gray-500 gap-3 pt-3 border-t border-gray-100">
                    {item.published_at?.split("T")[0] || item.date || "Unknown date"}
                    <span className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {item.shared_by || "Anonymous Author"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* "View All Articles" button for homepage */}
        {homePage && (
          <div className="col-span-full text-center mt-12">
            <Link
              href="/articles"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
