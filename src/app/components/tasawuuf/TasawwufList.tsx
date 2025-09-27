"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TasawwufApi, extractArray } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";

interface Tasawwuf {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  shared_by?: string;
  created_at?: string;
  category?: { id: number; name: string };
  is_top?: number;
}

interface Props {
  homePage?: boolean;
  limit?: number;
}

export default function TasawwufList({ homePage = false, limit }: Props) {
  const [posts, setPosts] = useState<Tasawwuf[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await TasawwufApi.getAll();
        if (!response.success) {
          throw new Error(response.error || "Unable to load tasawwuf content");
        }

        const data = extractArray<Tasawwuf>(response.data);
        const filtered = homePage ? data.filter((post) => post.is_top === 1) : data;
        setPosts(limit ? filtered.slice(0, limit) : filtered);

        // categories
        const cats = Array.from(
          new Set(data.map((post) => post.category?.name).filter(Boolean))
        ) as string[];
        setCategories(["All", ...cats]);
      } catch (err) {
        console.error("Error fetching tasawwuf posts:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [homePage, limit]);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category?.name === activeCategory);

  if (isLoading) {
    return (
      <div className="space-y-16">
        {/* Category Pills Skeleton */}
        <div className="flex flex-wrap justify-center gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>
        
        {/* Featured Skeleton */}
        <div className="relative rounded-2xl overflow-hidden h-[420px] bg-gray-200 animate-pulse"></div>
        
        {/* List Skeleton */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 border-b border-gray-200 pb-10">
              <div className="w-full md:w-1/3 h-56 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!filteredPosts.length) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">No articles found</h3>
        <p className="text-gray-500">Try selecting a different category</p>
      </div>
    );
  }

  const [featured, ...rest] = filteredPosts;

  return (
    <section className="space-y-16">

        {/* Hero Featured */}
        {featured && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          {featured.image && (
            <Image
              src={
                getImageUrl(featured.image, "/placeholder-tasawwuf.jpg") ||
                "/placeholder-tasawwuf.jpg"
              }
              alt={featured.title}
              width={1200}
              height={500}
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 md:p-10">
            <div className="text-white max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium mb-4 border border-white/20">
                {featured.category?.name || "Spirituality"}
              </div>
              <Link href={`/tasawwuf/${featured.slug}`}>
                <h2 className="text-2xl text-white md:text-4xl font-bold mb-3 hover:text-amber-300 transition-colors leading-tight">
                  {featured.title}
                </h2>
              </Link>
              <p className="text-gray-200 mb-4 leading-relaxed line-clamp-2">
                {featured.description?.replace(/<[^>]*>/g, "")}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{featured.shared_by || "Unknown"}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {featured.created_at &&
                      new Date(featured.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 outline-none focus:outline-none focus:ring-0 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20"
                : "bg-white border border-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600 shadow-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    

      {/* Vertical List */}
      <div className="grid gap-8 max-w-5xl mx-auto">
  {rest.map((post) => (
    <div
      key={post.id}
      className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      {post.image && (
        <div className="relative w-full md:w-2/5 lg:w-1/3 h-52 rounded-lg overflow-hidden shadow-sm">
          <Image
            src={
              getImageUrl(post.image, "/placeholder-tasawwuf.jpg") ||
              "/placeholder-tasawwuf.jpg"
            }
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-amber-700">
              {post.category?.name || "Spirituality"}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
         
            <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-amber-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
     
          <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
            {post.description?.replace(/<[^>]*>/g, "")}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-2">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{post.shared_by || "Unknown"}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {post.created_at &&
                  new Date(post.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
              </span>
            </div>
          </div>
          
          {/* Read More Button */}
          <Link 
            href={`/tasawwuf/${post.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 border border-amber-200 hover:border-amber-300 shadow-sm whitespace-nowrap outline-none focus:outline-none focus:ring-0"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Homepage "Explore All" button */}
      {homePage && posts.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/tasawwuf"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90"
          >
            Explore All Content
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
