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
        
        console.log('📦 Full API result:', subCategoryResult);
        
        if (subCategoryResult.success && subCategoryResult.data) {
          const responseData = subCategoryResult.data as any;
          console.log('✅ Subcategory API response structure:', {
            keys: Object.keys(responseData),
            hasSubCategoryId: !!responseData.sub_category_id,
            hasTotal: !!responseData.total,
            hasData: !!responseData.data,
            dataType: typeof responseData.data,
            isDataArray: Array.isArray(responseData.data),
            dataLength: Array.isArray(responseData.data) ? responseData.data.length : 'N/A',
            fullData: responseData
          });
          
          // Extract subcategory info
          if (responseData.sub_category_id) {
            setSubCategoryInfo({
              sub_category_id: responseData.sub_category_id,
              total: responseData.total
            });
            setTotal(responseData.total || 0);
          }
          
          // Try multiple ways to extract the data array
          let questionsArray: Iftah[] = [];
          
          // Method 1: Direct data array
          if (Array.isArray(responseData.data)) {
            questionsArray = responseData.data;
            console.log('✅ Method 1: Found direct data array with', questionsArray.length, 'items');
          }
          // Method 2: Nested data.data
          else if (responseData.data && Array.isArray(responseData.data.data)) {
            questionsArray = responseData.data.data;
            console.log('✅ Method 2: Found nested data.data array with', questionsArray.length, 'items');
          }
          // Method 3: Check if responseData itself is an array (unwrapped)
          else if (Array.isArray(responseData)) {
            questionsArray = responseData;
            console.log('✅ Method 3: Response data is itself an array with', questionsArray.length, 'items');
          }
          // Method 4: Try other common keys
          else if (responseData.items && Array.isArray(responseData.items)) {
            questionsArray = responseData.items;
            console.log('✅ Method 4: Found items array with', questionsArray.length, 'items');
          }
          else if (responseData.results && Array.isArray(responseData.results)) {
            questionsArray = responseData.results;
            console.log('✅ Method 5: Found results array with', questionsArray.length, 'items');
          }
          else if (responseData.questions && Array.isArray(responseData.questions)) {
            questionsArray = responseData.questions;
            console.log('✅ Method 6: Found questions array with', questionsArray.length, 'items');
          }
          else if (responseData.iftahs && Array.isArray(responseData.iftahs)) {
            questionsArray = responseData.iftahs;
            console.log('✅ Method 7: Found iftahs array with', questionsArray.length, 'items');
          }
          
          if (questionsArray.length > 0) {
            console.log('✅ Successfully extracted', questionsArray.length, 'iftah items for subcategory', id);
            console.log('📝 First item sample:', questionsArray[0]);
            setSubCategoryIftahs(questionsArray);
          } else {
            console.warn('⚠️ No questions found in response. Available keys:', Object.keys(responseData));
            setSubCategoryIftahs([]);
          }
        } else {
          console.warn('⚠️ Subcategory API request failed:', {
            success: subCategoryResult.success,
            hasData: !!subCategoryResult.data,
            error: subCategoryResult.error
          });
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

  // Custom scrollbar styles
  const scrollbarStyles = `
    .questions-scrollbar::-webkit-scrollbar {
      width: 14px;
    }
    .questions-scrollbar::-webkit-scrollbar-track {
      background: #f0fdfa;
      border-radius: 10px;
      margin: 8px 0;
      border: 1px solid #e0f2f1;
    }
    .questions-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #14b8a6, #10b981);
      border-radius: 10px;
      border: 2px solid #f0fdfa;
      min-height: 40px;
    }
    .questions-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #0d9488, #059669);
    }
    .questions-scrollbar::-webkit-scrollbar-thumb:active {
      background: linear-gradient(to bottom, #0f766e, #047857);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
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
            <div className="mb-8 p-8 bg-white rounded-2xl shad border-2 border-emerald-100 relative overflow-hidden">
              {/* Islamic Pattern Background */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2314b8a6' fill-opacity='0.8'%3E%3Cpath d='M20 20c0-6.627-5.373-12-12-12S-4 13.373-4 20s5.373 12 12 12 12-5.373 12-12zm-12 0c0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6 6-2.686 6-6z'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              
              <div className="relative flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Islamic Icon - Crescent and Star */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                      <path d="M12 8c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" fill="white" opacity="0.9"/>
                      <path d="M15.5 8.5L14 10l1.5 1.5L14 13l1.5 1.5L17 12l-1.5-3.5z" fill="white"/>
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    {subCategoryIftahs.length > 0 && subCategoryIftahs[0].iftah_sub_category ? (
                      <>
                        <h2 className="text-3xl font-bold text-emerald-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                          {cleanText(subCategoryIftahs[0].iftah_sub_category.name)}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-emerald-700">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                            </svg>
                            <span>{total || subCategoryIftahs.length} پوښتنې</span>
                          </span>
                          {subCategoryIftahs[0].iftah_sub_category.tag && (
                            <span className="flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                              </svg>
                              <span>{cleanText(subCategoryIftahs[0].iftah_sub_category.tag.name)}</span>
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-3xl font-bold text-emerald-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                          Subcategory {subCategoryInfo?.sub_category_id || subCategoryId}
                        </h2>
                        <p className="text-sm text-emerald-700 flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                          </svg>
                          <span>{total} پوښتنې</span>
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
              className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">بېرته کور ته</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="د پوښتنو لټون..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-4 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors bg-white shadow-sm"
                dir="rtl"
              />
            </div>
          </div>

          {/* Questions List with Scrollbar */}
          <div className="bg-white rounded-2xl border-2 border-emerald-100 overflow-hidden">
            {isLoading ? (
              <div className="px-8 py-16 text-center">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                </div>
                <p className="text-emerald-700 font-medium" style={{ fontFamily: 'Amiri, serif' }}>د پوښتنو بار کول...</p>
              </div>
            ) : filteredIftahs.length === 0 ? (
              <div className="px-8 py-16 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>پوښتنې ونه موندل شوې</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Amiri, serif' }}>{searchTerm ? 'د لټون اصطلاح بدل کړئ' : 'په دې فرعي کټګورۍ کې لا تراوسه پوښتنې نشته.'}</p>
              </div>
            ) : (
              <div 
                className="max-h-[70vh] overflow-y-auto overflow-x-hidden divide-y divide-gray-100 questions-scrollbar"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#14b8a6 #f0fdfa'
                }}
              >
                {filteredIftahs.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/iftah/${item.slug}`}
                    className="block group hover:bg-emerald-50 transition-colors"
                  >
                    <div className="px-6 py-6">
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex-1">
                          {/* Title with Islamic Icon */}
                          <div className="flex items-start gap-4 mb-4">
                            {/* Islamic Geometric Icon */}
                            <div className="flex-shrink-0 relative">
                              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                              </div>
                              {/* Small decorative star */}
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 leading-relaxed mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                                {cleanText(item.title || 'Untitled')}
                              </h3>
                              
                              {/* Question Preview */}
                              {item.question && (
                                <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-xl p-4 border border-emerald-100 mt-3">
                                  <div className="flex items-start gap-2 mb-2">
                                    <svg className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                                    </svg>
                                    <p className="text-sm font-medium text-emerald-700">پوښتنه:</p>
                                  </div>
                                  <p className="text-base text-gray-800 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                                    {cleanText(item.question)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Arrow Icon */}
                        <div className="flex-shrink-0 pt-2">
                          <div className="w-10 h-10 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
                            <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
        {/* Bottom Spacing to prevent footer overlap */}
        <div className="h-24"></div>
      </div>
    </div>
    </>
  );
}

