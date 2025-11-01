'use client';
import { useState, useEffect } from "react";
import { IftahApi } from "@/lib/api";
import { cleanText } from "@/lib/textUtils";
import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question?: string;
  answer?: string;
  mufti?: any;
  category?: string;
  tags?: string[];
  references?: string[];
  isPublished?: boolean;
  viewCount?: number;
  is_published?: boolean | number;
  tag?: {
    id: number;
    name: string;
  };
  tag_id?: number | null;
  iftah_sub_category?: {
    id: number;
    name: string;
    tag_id?: number;
    tag?: {
      id: number;
      name: string;
    };
  };
  date?: string;
  created_at?: string;
  updated_at?: string;
  note?: string;
  attachment?: string | null;
}

export default function IftahSubCategoryPage({ 
  params 
}: { 
  params: Promise<{ subCategoryId: string }> 
}) {
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const [subCategoryIftahs, setSubCategoryIftahs] = useState<Iftah[]>([]);
  const [subCategoryInfo, setSubCategoryInfo] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const id = resolvedParams.subCategoryId;
      setSubCategoryId(id);
      
      setIsLoading(true);
      
      try {
        console.log('🔍 Fetching subcategory data for ID:', id);
        
        // Fetch subcategory data using the subcategory API endpoint
        const subCategoryResult = await IftahApi.getSubCategoryById(id);
        
        if (subCategoryResult.success && subCategoryResult.data) {
          const responseData = subCategoryResult.data as any;
          console.log('✅ Subcategory API response:', responseData);
          
          // Extract subcategory info
          if (responseData.sub_category_id) {
            setSubCategoryInfo({
              sub_category_id: responseData.sub_category_id,
              total: responseData.total
            });
            setTotal(responseData.total || 0);
          }
          
          // Extract data array
          if (Array.isArray(responseData.data)) {
            console.log('✅ Found', responseData.data.length, 'iftah items for subcategory', id);
            setSubCategoryIftahs(responseData.data as Iftah[]);
          } else {
            console.warn('⚠️ No data array in response');
            setSubCategoryIftahs([]);
          }
        } else {
          console.warn('⚠️ Subcategory API request failed:', subCategoryResult);
          setSubCategoryIftahs([]);
        }
      } catch (error) {
        console.error('❌ Error fetching subcategory data:', error);
        setSubCategoryIftahs([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params]);
  
  // Filter by search term
  const filteredIftahs = subCategoryIftahs.filter(item => {
    const title = cleanText(item.title || '').toLowerCase();
    const question = cleanText(item.question || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search) || question.includes(search);
  });

  return (
    <div className="min-h-screen bg-white relative ">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 " style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>

      </div>

      <div className="relative z-10 top-28 ">
        {/* Small Islamic Hero Section */}
        <div className="bg-gradient-to-r from-emerald-700  via-teal-600 to-emerald-800 text-white relative overflow-hidden py-4">
          {/* Decorative Islamic Elements */}
          {/* Islamic School Name Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden top-8">
          <div className="text-white/8 whitespace-nowrap" style={{ 
            fontSize: 'clamp(2rem, 12vw, 3rem)', 
            fontFamily: 'Amiri, serif', 
            lineHeight: 1, 
            fontWeight: 700,
            textAlign: 'center'
          }}>
            اَلْجَامِعْةُ اَنوَار الْعُلُوْم اَلْاِسْلاَمِیّة اَلْعُرْفُ اَلْمَدْرَسَةٌ خلیفه صاحب ارغندی (رح)
          </div>
        </div>
          
          <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-10">
            {/* Center Title Content */}
            <div className="text-center">
             
             
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Subcategory Information Banner */}
          {!isLoading && (subCategoryInfo || (subCategoryIftahs.length > 0 && subCategoryIftahs[0].iftah_sub_category)) && (
            <div className="mb-6 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center">
                    <span className="text-3xl text-white">📁</span>
                  </div>
                  <div>
                    {subCategoryIftahs.length > 0 && subCategoryIftahs[0].iftah_sub_category ? (
                      <>
                        <h2 className="text-2xl font-bold text-teal-900 mb-1" style={{ fontFamily: 'Amiri, serif' }}>
                          {cleanText(subCategoryIftahs[0].iftah_sub_category.name)}
                        </h2>
                        <p className="text-sm text-teal-700">
                          Subcategory ID: {subCategoryInfo?.sub_category_id || subCategoryIftahs[0].iftah_sub_category.id} | Total: {total || subCategoryIftahs.length} Questions
                        </p>
                        {subCategoryIftahs[0].iftah_sub_category.tag && (
                          <p className="text-xs text-teal-600 mt-1">
                            Tag: {cleanText(subCategoryIftahs[0].iftah_sub_category.tag.name)}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-teal-900 mb-1" style={{ fontFamily: 'Amiri, serif' }}>
                          Subcategory {subCategoryInfo?.sub_category_id || subCategoryId}
                        </h2>
                        <p className="text-sm text-teal-700">
                          Total: {total} Questions
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/iftah"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-all duration-300 group shadow-md"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Iftah</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                dir="rtl"
              />
            </div>
          </div>

          {/* Questions List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="px-8 py-12 text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading questions...</p>
              </div>
            ) : filteredIftahs.length === 0 ? (
              <div className="px-8 py-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Questions Found</h3>
                <p className="text-gray-600">{searchTerm ? 'Try a different search term' : 'There are no questions in this subcategory yet.'}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredIftahs.map((item) => (
                  <Link
                    key={item.id}
                    href={`/iftah/${item.slug}`}
                    className="block group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                  >
                    <div className="px-6 py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-green-600 text-lg">Q.</span>
                            <p className="text-lg font-semibold text-gray-900 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(item.title || 'Untitled')}
                            </p>
                          </div>
                          
                          {/* Question Preview */}
                          {item.question && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(item.question)}
                            </p>
                          )}
                          
                          {/* Tags and Metadata */}
                          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                            {/* Tag Badge */}
                            {(item.tag || item.iftah_sub_category?.tag) && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                🏷️ {cleanText(item.tag?.name || item.iftah_sub_category?.tag?.name || 'Tag')}
                              </span>
                            )}
                            {/* Subcategory Badge */}
                            {item.iftah_sub_category && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                📁 {cleanText(item.iftah_sub_category.name)}
                              </span>
                            )}
                            {/* Mufti Badge */}
                            {item.mufti && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                👤 {cleanText(item.mufti.full_name || item.mufti.name || 'Mufti')}
                              </span>
                            )}
                            {/* Date */}
                            {(item.date || item.created_at) && (
                              <span className="text-xs text-gray-500">
                                📅 {item.date || (item.created_at?.split('T')[0])}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

