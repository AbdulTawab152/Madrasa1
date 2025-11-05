'use client';
import { useState, useEffect } from "react";
import { IftahApi } from "@/lib/api";
import { cleanText } from "@/lib/textUtils";
import Link from "next/link";
import { Search } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import IftahQuestionButton from "../../../components/iftah/IftahQuestionButton";
import IslamicHeader from "../../../components/IslamicHeader";

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


  // Get subcategory name for header
  const getSubCategoryName = () => {
    if (!isLoading && subCategoryIftahs.length > 0 && subCategoryIftahs[0].iftah_sub_category) {
      return cleanText(subCategoryIftahs[0].iftah_sub_category.name);
    }
    return `Subcategory ${subCategoryId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <IslamicHeader pageType="iftah" title={getSubCategoryName()} />
      <Breadcrumb />
      <IftahQuestionButton variant="floating" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12" dir="rtl">

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="د پوښتنو لټون..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-colors bg-white shadow-sm"
                dir="rtl"
              />
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4 md:space-y-5">
            {isLoading ? (
              <div className="px-8 py-16 text-center">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-700 font-medium" style={{ fontFamily: 'Amiri, serif' }}>د پوښتنو بار کول...</p>
              </div>
            ) : filteredIftahs.length === 0 ? (
              <div className="px-8 py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>پوښتنې ونه موندل شوې</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Amiri, serif' }}>{searchTerm ? 'د لټون اصطلاح بدل کړئ' : 'په دې فرعي کټګورۍ کې لا تراوسه پوښتنې نشته.'}</p>
              </div>
            ) : (
              filteredIftahs.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/iftah/${item.slug}`}
                  className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
                  dir="rtl"
                >
                  {/* Decorative right border accent */}
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200 group-hover:from-gray-500 group-hover:via-gray-400 group-hover:to-gray-300 transition-colors"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm-10 0c0-2.762 2.238-5 5-5s5 2.238 5 5-2.238 5-5 5-5-2.238-5-5z'/%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                  
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="p-6 sm:p-8 relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Question Preview */}
                        {item.question && (
                          <div className="bg-gray-50 rounded-lg p-5 border-r-4 border-gray-300">
                            <p className="text-lg text-gray-900 leading-relaxed font-medium" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(item.question)}
                            </p>
                          </div>
                        )}
                        {!item.question && item.title && (
                          <p className="text-lg text-gray-900 leading-relaxed font-medium" style={{ fontFamily: 'Amiri, serif' }}>
                            {cleanText(item.title)}
                          </p>
                        )}
                      </div>
                      
                      {/* Book Icon */}
                      <div className="flex-shrink-0 mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                          <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 016.5 17H20m-16 2.5V6.5A2.5 2.5 0 016.5 4h13A2.5 2.5 0 0122 6.5v13A2.5 2.5 0 0119.5 22h-13a2.5 2.5 0 01-2.5-2.5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
      </main>
    </div>
  );
}

