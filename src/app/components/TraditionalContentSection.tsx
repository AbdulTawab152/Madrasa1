'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import IslamicHeader from "./IslamicHeader";
import { cleanText } from "../../lib/textUtils";

interface Author {
  name: string;
  bio?: string;
}

interface ContentItem {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  question?: string;
  answer?: string;
  image?: string;
  category_id?: string;
  published_at?: string;
  date?: string;
  shared_by?: string;
  author?: Author;
  mufti?: Author;
  category?: string;
  tags?: string[];
  is_published?: boolean;
  viewCount?: number;
}

interface TraditionalContentSectionProps {
  articles?: ContentItem[];
  fatwas?: ContentItem[];
  showAll?: boolean;
  title?: string;
  subtitle?: string;
}


export default function TraditionalContentSection({ 
  articles = [], 
  fatwas = [], 
  showAll = false, 
  title = "جامعة العلوم الإسلامية",
  subtitle = "دار الافتاء"
}: TraditionalContentSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  // Combine content
  const allContent = [
    ...articles.map(item => ({ ...item, type: 'article' })),
    ...fatwas.map(item => ({ ...item, type: 'fatwa' }))
  ];

  // Filter content
  const filteredContent = allContent.filter(item => {
    const cleanTitle = cleanText(item.title);
    const cleanQuestion = cleanText(item.question);
    const cleanDescription = cleanText(item.description);
    
    const matchesSearch = cleanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cleanQuestion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cleanDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayContent = showAll ? filteredContent : filteredContent.slice(0, 10);

  const categories = [...new Set(allContent.map(item => item.category).filter(Boolean))];
  const books = ["Quran", "Hadith", "Fiqh", "Aqeedah", "Tasawwuf"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col-reverse lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow- border border-amber-100 overflow-hidden">
              {/* Enhanced Section Header */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-6 border-b border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-amber-900">
                        {fatwas.length > 0 ? "نئے سوالات" : "Latest Articles"}
                      </h3>
                      <p className="text-amber-700 text-sm mt-1">
                        {displayContent.length} {fatwas.length > 0 ? "questions" : "articles"} available
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-amber-700 font-medium">Live</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Content List */}
              <div className="divide-y divide-amber-100">
                {displayContent.map((item, index) => (
                  <div key={`${item.type}-${item.id}`} className="group hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                    <div className="px-8 py-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center mb-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mr-3 ${
                              item.type === 'article' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.type === 'article' ? '📚 Article' : '❓ Q&A'}
                            </span>
                            {item.category && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                {cleanText(item.category)}
                              </span>
                            )}
                          </div>
                          
                          <h1 
                           
                            className="text-lg font-semibold text-amber-900 hover:text-orange-700 transition-colors leading-relaxed block mb-2"
                          >
                            {cleanText(item.title)}
                          </h1>
                          
                          {item.question && (
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                              {cleanText(item.question)}
                            </p>
                          )}
                          
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            {(item.author || item.mufti) && (
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center mr-1">
                                  <svg className="w-2.5 h-2.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span>{cleanText(typeof item.author === 'object' ? item.author?.name : item.author || item.mufti?.name || item.shared_by || "Anonymous")}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{cleanText(item.published_at?.split('T')[0] || item.date || "Unknown date")}</span>
                            </div>
                            {item.viewCount && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{item.viewCount} views</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                      
                          <Link className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300 shadow-sm group-hover:shadow-md"  href={item.type === 'article' ? `/articles/${item.slug}` : `/iftah/${item.slug}`}>
                          
                            <svg className="w-6 h-6 text-amber-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Ask Question Section */}
              {/* <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-6 border-t border-amber-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-amber-900">
                      {fatwas.length > 0 ? "سوال پوچھیں" : "Submit Article"}
                    </h4>
                    <p className="text-amber-700 text-sm">
                      {fatwas.length > 0 ? "Ask a new question" : "Share your knowledge"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {fatwas.length > 0 
                    ? "If you don't find the desired question, you can click below to ask. Due to many questions, it might take 15-20 days for an answer."
                    : "Share your knowledge and insights by submitting an educational article."
                  }
                </p>
                <Link
                  href={fatwas.length > 0 ? "/ask-question" : "/submit-article"}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {fatwas.length > 0 ? "Ask Question" : "Submit Article"}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </Link>
              </div> */}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm   border border-amber-100 overflow-hidden">
              {/* Search Section Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Search & Filter</h4>
                </div>
              </div>
              
              <div className="p-6">

                <div className="space-y-5">
                  {/* Search Term */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Desired Word
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter search term..."
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                      />
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  
                </div>
              </div>

          
            </div>
          </div>
        </div>

        {/* Enhanced View All Button */}
        {!showAll && displayContent.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href={fatwas.length > 0 ? "/iftah" : "/articles"}
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg rounded-2xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              View All {fatwas.length > 0 ? "Q&A" : "Articles"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
