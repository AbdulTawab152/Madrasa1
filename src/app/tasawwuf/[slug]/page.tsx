"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tasawwuf } from "@/lib/models/tasawwuf";
import { motion } from "framer-motion";

export default function TasawwufDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post, setPost] = useState<Tasawwuf | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `https://lawngreen-dragonfly-304220.hostingersite.com/api/tasawwuf/${slug}`
        );
        const json = await res.json();
        setPost(json);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-32 space-y-8">
        <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-32 text-center">
        <div className="text-5xl mb-4">😔</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-gray-600">The article you're looking for doesn't exist or may have been moved.</p>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 mt-24 lg:mt-32 space-y-8"
    >
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <a href="/" className=" text-orange-500 hover:text-gray-600">Home</a> / 
        <a href="/tasawwuf" className="text-orange-500 hover:text-gray-600"> Tasawwuf</a> / 
        
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
        {post.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          By {post.shared_by }
        </div>
        
        {post.category && (
          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
            {post.category.name}
          </span>
        )}
        
        {post.is_top && (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured
          </span>
        )}
      </div>

      {/* Image */}
      {post.image && (
        <div className="w-full h-72 md:h-96 relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src={`https://lawngreen-dragonfly-304220.hostingersite.com/storage/${post.image}`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      {/* Description */}
      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {post.description}
        </p>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Article Details</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between">
              <span className="font-medium">Slug:</span>
              <span className="font-mono">{post.slug}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Published:</span>
              <span>{post.is_published ? "✅ Yes" : "❌ No"}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Created:</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Updated:</span>
              <span>{new Date(post.updated_at).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
        
        {/* {post.category && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span className="font-medium">Category ID:</span>
                <span>{post.category.id}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Category Name:</span>
                <span>{post.category.name}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Category Created:</span>
                <span>{new Date(post.category.created_at).toLocaleDateString()}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Category Updated:</span>
                <span>{new Date(post.category.updated_at).toLocaleDateString()}</span>
              </li>
            </ul>
          </div>
        )} */}
      </div>

      {/* Action Buttons */}
  
    </motion.section>
  );
}