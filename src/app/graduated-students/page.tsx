"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaGraduationCap, FaCalendarAlt, FaUserGraduate, FaSearch, FaFilter, FaChevronRight } from 'react-icons/fa';

interface Graduation {
  id: number;
  slug: string;
  title: string;
  question?: string;
  description?: string;
  main_image?: string;
  date?: string;
  shared_by?: string;
  category_id?: string | number;
}

async function fetchGraduationsData(): Promise<Graduation[]> {
  const API_URL = 'https://lawngreen-dragonfly-304220.hostingersite.com/api/graduations';
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch graduations data');
  return res.json();
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function GraduationsPage() {
  const graduations = await fetchGraduationsData();
  const categories = [...new Set(graduations.map(g => g.category_id || 'General'))];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <FaGraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Graduates</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Celebrating the achievements of our exceptional students who have successfully completed their journey with us.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search graduates..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={String(category)}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Graduates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graduations.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src={getImageUrl(item.main_image) || '/placeholder-graduate.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-green-700 backdrop-blur-sm shadow-sm">
                    {item.category_id || "General"}
                  </span>
                </div>

                {/* Hover Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-white text-sm line-clamp-2 mb-4 font-medium">
                    {item.question || item.description}
                  </p>
                  <Link
                    href={`/graduated-students/${item.slug || item.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white text-green-700 rounded-lg font-medium text-sm hover:bg-green-50 transition-colors w-full"
                  >
                    View Full Profile
                    <FaChevronRight className="ml-2 h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 relative z-10 bg-white">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex-shrink-0 ml-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                      <FaGraduationCap className="h-5 w-5" />
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mt-2 mb-4 min-h-[2.5rem]">
                  {item.description || item.question}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">{item.date ? new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUserGraduate className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="text-sm">{item.shared_by || 'Alumni'}</span>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400/30 rounded-2xl pointer-events-none transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Load More Graduates
          </button>
        </div>
      </div>
    </main>
  );
}
