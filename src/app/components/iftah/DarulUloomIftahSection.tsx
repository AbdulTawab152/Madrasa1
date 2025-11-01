'use client';
import Link from "next/link";
import { useState } from "react";
import { cleanText } from "@/lib/textUtils";
import { useTranslation } from "@/hooks/useTranslation";
import { IftahApi } from "@/lib/api";

interface Author {
  id?: number;
  name: string;
  full_name?: string;
  bio?: string;
  father_name?: string;
  email?: string;
  image?: string;
  phone?: string;
  address?: string;
  dob?: string;
  biography?: string;
}

interface Tag {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

interface IftahSubCategory {
  id: number;
  name: string;
  tag_id: number;
  created_at?: string;
  updated_at?: string;
  tag?: Tag;
}

interface IftahItem {
  id: number;
  title: string;
  slug?: string;
  question?: string;
  answer?: string;
  image?: string;
  category_id?: string;
  published_at?: string;
  date?: string;
  shared_by?: string;
  mufti?: Author;
  mufti_id?: number;
  category?: string;
  tags?: string[];
  is_published?: boolean;
  viewCount?: number;
  iftah_sub_category_id?: number;
  iftah_sub_category?: IftahSubCategory;
}

interface DarulUloomIftahSectionProps {
  fatwas?: IftahItem[];
  showAll?: boolean;
  title?: string;
  subtitle?: string;
}

type ViewMode = 'categories' | 'subcategories' | 'questions';

export default function DarulUloomIftahSection({ 
  fatwas = [], 
  showAll = false, 
  title = "دانورالعلوم ارغندی",
  subtitle = "فتویٰ شعبہ"
}: DarulUloomIftahSectionProps) {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [subCategoryQuestions, setSubCategoryQuestions] = useState<IftahItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Extract categories and subcategories from fatwas
  const categories = IftahApi.extractCategories(fatwas);
  const subcategories = selectedCategory 
    ? IftahApi.extractSubCategories(fatwas, selectedCategory)
    : IftahApi.extractSubCategories(fatwas);

  // Handle category click - show subcategories
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    setViewMode('subcategories');
    setSubCategoryQuestions([]);
  };

  // Handle subcategory click - fetch and show questions
  const handleSubCategoryClick = async (subCategoryId: number) => {
    setSelectedSubCategory(subCategoryId);
    setViewMode('questions');
    setLoading(true);
    
    try {
      const result = await IftahApi.getBySubCategory(subCategoryId, { limit: 100 });
      if (result.success && Array.isArray(result.data)) {
        setSubCategoryQuestions(result.data);
      } else {
        setSubCategoryQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching subcategory questions:', error);
      setSubCategoryQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setViewMode('categories');
    setSubCategoryQuestions([]);
  };

  // Handle back to subcategories
  const handleBackToSubCategories = () => {
    setSelectedSubCategory(null);
    setViewMode('subcategories');
    setSubCategoryQuestions([]);
  };

  // Filter content for questions view
  const filteredFatwas = viewMode === 'questions' 
    ? subCategoryQuestions.filter(item => {
        const cleanTitle = cleanText(item.title);
        const cleanQuestion = cleanText(item.question);
        return cleanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
               cleanQuestion.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : fatwas.filter(item => {
        const cleanTitle = cleanText(item.title);
        const cleanQuestion = cleanText(item.question);
        const matchesSearch = cleanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             cleanQuestion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || 
          item.iftah_sub_category?.tag?.id === selectedCategory ||
          item.iftah_sub_category?.tag_id === selectedCategory;
        return matchesSearch && matchesCategory;
      });

  const displayFatwas = showAll ? filteredFatwas : filteredFatwas.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* Header Section - Darul Uloom Deoband Style */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Islamic Pattern Background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            <div className="relative">
              {/* Islamic Decorative Elements */}
              <div className="flex justify-center items-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="text-right">
                  <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                    {title}
                  </h1>
                  <p className="text-emerald-100 text-lg" style={{ fontFamily: 'Amiri, serif' }}>
                    {subtitle}
                  </p>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="flex justify-center items-center gap-2 mb-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-100 font-medium">Online Fatwa Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
              {/* Enhanced Section Header */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 border-b border-emerald-200">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 items-center flex-1">
                    {/* Back Button */}
                    {(viewMode === 'subcategories' || viewMode === 'questions') && (
                      <button
                        onClick={viewMode === 'questions' ? handleBackToSubCategories : handleBackToCategories}
                        className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
                        title="Back"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: 'Amiri, serif' }}>
                        {viewMode === 'categories' && 'د کتګوریو لیست'}
                        {viewMode === 'subcategories' && 'د فرعي کتګوریو لیست'}
                        {viewMode === 'questions' && 'سوالات'}
                      </h3>
                      <p className="text-emerald-700 text-sm mt-1">
                        {viewMode === 'categories' && `${categories.length} categories available`}
                        {viewMode === 'subcategories' && `${subcategories.length} subcategories available`}
                        {viewMode === 'questions' && `${displayFatwas.length} questions available`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-700 font-medium">Live</span>
                  </div>
                </div>
              </div>

              {/* Categories View */}
              {viewMode === 'categories' && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="group bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-xl p-6 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 text-right shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <svg className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-emerald-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(category.name)}
                            </h4>
                            <p className="text-sm text-emerald-700">
                              Click to view subcategories
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {categories.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600">No categories available</p>
                    </div>
                  )}
                </div>
              )}

              {/* Subcategories View */}
              {viewMode === 'subcategories' && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => handleSubCategoryClick(subcategory.id)}
                        className="group bg-gradient-to-br from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 rounded-xl p-6 border border-teal-200 hover:border-teal-300 transition-all duration-300 text-right shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <svg className="w-6 h-6 text-teal-600 group-hover:text-teal-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-teal-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(subcategory.name)}
                            </h4>
                            <p className="text-sm text-teal-700">
                              Click to view questions
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {subcategories.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600">No subcategories available</p>
                    </div>
                  )}
                </div>
              )}

              {/* Questions View */}
              {viewMode === 'questions' && (
                <>
                  {loading ? (
                    <div className="px-8 py-12 text-center">
                      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading questions...</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-emerald-100">
                      {displayFatwas.map((item) => (
                  <div key={item.id} className="group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                    <div className="px-8 py-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center mb-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mr-3 bg-emerald-100 text-emerald-800">
                              ❓ Q&A
                            </span>
                            {item.iftah_sub_category && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                {cleanText(item.iftah_sub_category.name)}
                              </span>
                            )}
                            {item.mufti?.full_name && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {cleanText(item.mufti.full_name)}
                              </span>
                            )}
                          </div>
                          
                          <h1 className="text-lg font-semibold text-emerald-900 hover:text-teal-700 transition-colors leading-relaxed block mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                            {cleanText(item.title)}
                          </h1>
                          
                          {item.question && (
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(item.question)}
                            </p>
                          )}
                          
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            {item.mufti && (
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-emerald-200 flex items-center justify-center mr-1">
                                  <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span>{cleanText(item.mufti?.full_name || item.mufti?.name || "Anonymous")}</span>
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
                          <Link className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 shadow-sm group-hover:shadow-md" href={`/iftah/${item.slug}`}>
                            <svg className="w-6 h-6 text-emerald-600 group-hover:text-teal-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
              {/* Search Section Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                <div className="flex gap-2 items-center">
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
                        className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                      />
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Category Filter */}
                  {categories.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {cleanText(category.name)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced View All Button */}
        {!showAll && displayFatwas.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/iftah"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              View All Q&A
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
