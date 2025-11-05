'use client';
import { useState, useEffect } from "react";
import { IftahApi } from "@/lib/api";
import { cleanText } from "@/lib/textUtils";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTranslation } from "@/lib/translations";

// Islamic Icon Components
const CrescentStarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69C15.28 7.22 14.05 7 12.75 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.3 0 2.53-.22 3.65-.62C15.55 19.37 13.85 20 12 20z"/>
    <path d="M19 6l1.5 3L24 10l-2.5 2.5L22 16l-3-1.5L16 16l0.5-3.5L14 10l3.5-1L19 6z"/>
  </svg>
);

const QuranIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M9 7h6M9 11h6M9 15h4"/>
    <circle cx="13" cy="8" r="0.8" fill="currentColor"/>
  </svg>
);

const MosqueIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v2h20V7L12 2z"/>
    <path d="M4 11v10h4v-6h8v6h4V11H4z"/>
    <rect x="10" y="15" width="4" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="12" cy="7" r="1" fill="white"/>
  </svg>
);

const TasbihIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="3" r="1.2"/>
    <circle cx="12" cy="7.5" r="1.2"/>
    <circle cx="12" cy="12" r="1.2"/>
    <circle cx="12" cy="16.5" r="1.2"/>
    <circle cx="12" cy="21" r="1.2"/>
    <rect x="11.5" y="4.2" width="1" height="2.1" fill="currentColor"/>
    <rect x="11.5" y="8.7" width="1" height="2.1" fill="currentColor"/>
    <rect x="11.5" y="13.2" width="1" height="2.1" fill="currentColor"/>
    <rect x="11.5" y="17.7" width="1" height="2.1" fill="currentColor"/>
  </svg>
);

const PrayerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4"/>
    <path d="M6 8l3.46 3.46M14.54 14.54L18 18M18 8l-3.46 3.46M9.46 14.54L6 18"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Map subcategory names to appropriate Islamic icons
const getIslamicIcon = (subCategoryName: string) => {
  const name = subCategoryName.toLowerCase();
  if (name.includes('نماز') || name.includes('prayer')) {
    return <PrayerIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />;
  }
  if (name.includes('روزہ') || name.includes('fasting') || name.includes('رمضان')) {
    return <CrescentStarIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />;
  }
  if (name.includes('زکو') || name.includes('zakat')) {
    return <StarIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />;
  }
  if (name.includes('حج') || name.includes('hajj')) {
    return <MosqueIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />;
  }
  if (name.includes('تطهیر') || name.includes('طهارت') || name.includes('taharat') || name.includes('purity')) {
    return <TasbihIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />;
  }
  // Default to Quran icon
  return <QuranIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />;
};

interface Author {
  name: string;
  bio?: string;
}

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question?: string;
  answer?: string;
  mufti?: Author | any;
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

export default function IftahCategoryPage({ 
  params 
}: { 
  params: Promise<{ categorySlug: string }> 
}) {
  const [categorySlug, setCategorySlug] = useState<string>('');
  const [categoryIftahs, setCategoryIftahs] = useState<Iftah[]>([]);
  const [subCategories, setSubCategories] = useState<Array<{ id: number; name: string; tag_id?: number; tag?: { id: number; name: string } }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tagInfo, setTagInfo] = useState<any>(null);
  const [tagId, setTagId] = useState<number | string | null>(null);
  
  // Helper function to get translation as string
  const t = (key: string): string => {
    try {
      const result = getTranslation(key);
      // If the result is a string and different from the key, return it
      if (typeof result === 'string') {
        // If it's still the key, it means translation wasn't found
        if (result === key) {
          return key;
        }
        return result;
      }
      // For non-string results, convert to string
      return String(result || key);
    } catch (error) {
      return key;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const slug = resolvedParams.categorySlug;
      setCategorySlug(slug);
      
      // Decode the category name
      const categoryName = decodeURIComponent(slug);
      
      setIsLoading(true);
      
      try {
        console.log('🔍 Fetching data for category:', categoryName);
        
        // Step 1: Check if category slug is a numeric tag ID
        const numericId = parseInt(categoryName);
        let foundTagId: number | string | null = null;
        
        if (!isNaN(numericId) && numericId > 0) {
          // Category slug is a numeric ID - use it directly
          foundTagId = numericId;
          setTagId(numericId);
          console.log('✅ Category slug is numeric tag ID:', numericId);
        } else {
          // Step 2: Fetch all tags to find the tag by name
          const tagsResult = await IftahApi.getTags({ limit: 100 });
          console.log('📋 Tags fetched:', tagsResult);
          
          if (tagsResult.success && Array.isArray(tagsResult.data)) {
            // Find tag by name
            const foundTag = tagsResult.data.find((tag: any) => 
              tag.name === categoryName || 
              decodeURIComponent(categoryName) === tag.name ||
              tag.name?.trim() === categoryName?.trim()
            );
            
            if (foundTag) {
              foundTagId = foundTag.id;
              setTagId(foundTag.id);
              console.log('✅ Found tag by name:', foundTag);
            } else {
              console.warn('⚠️ Tag not found by name:', categoryName);
            }
          }
        }
        
        // Step 2: If tag ID found, fetch tag data using the tag API endpoint
        if (foundTagId) {
          console.log('📂 Fetching tag data for ID:', foundTagId);
          const tagResult = await IftahApi.getTagById(foundTagId);
          
          if (tagResult.success && tagResult.data) {
            const responseData = tagResult.data as any;
            console.log('✅ Tag API response structure:', {
              hasTagId: !!responseData.tag_id,
              hasData: !!responseData.data,
              dataIsArray: Array.isArray(responseData.data),
              dataLength: Array.isArray(responseData.data) ? responseData.data.length : 0,
              pagination: responseData.pagination
            });
            
            // Extract tag info and iftah items from response
            // API response: { tag_id: "1", data: [...], pagination: {...} }
            if (responseData.tag_id) {
              setTagInfo({ tag_id: responseData.tag_id });
              setTagId(responseData.tag_id);
            }
            
            // Extract data array - this is the main iftah items array
            // API response structure: { tag_id: "1", data: [...], pagination: {...} }
            if (Array.isArray(responseData.data)) {
              console.log('✅ Found', responseData.data.length, 'iftah items for tag', foundTagId);
              setCategoryIftahs(responseData.data as Iftah[]);
              
              // Extract unique subcategories from iftah items
              const uniqueSubCategories = new Map<number, { id: number; name: string; tag_id?: number; tag?: { id: number; name: string } }>();
              responseData.data.forEach((item: any) => {
                if (item.iftah_sub_category && item.iftah_sub_category.id) {
                  const subCat = item.iftah_sub_category;
                  if (!uniqueSubCategories.has(subCat.id)) {
                    uniqueSubCategories.set(subCat.id, {
                      id: subCat.id,
                      name: subCat.name,
                      tag_id: subCat.tag_id,
                      tag: subCat.tag
                    });
                  }
                }
              });
              setSubCategories(Array.from(uniqueSubCategories.values()));
              console.log('📁 Extracted', uniqueSubCategories.size, 'unique subcategories');
            } else {
              console.warn('⚠️ No data array in response. Response structure:', {
                keys: Object.keys(responseData),
                hasTagId: !!responseData.tag_id,
                responseData: responseData
              });
              setCategoryIftahs([]);
            }
          } else {
            console.warn('⚠️ Tag API request failed:', tagResult);
            setCategoryIftahs([]);
          }
        } else {
          // Fallback: Try to fetch all iftahs and filter by tag name
          console.log('🔄 Fallback: Fetching all iftahs and filtering by tag name');
          const res = await IftahApi.getAll({ limit: 100 });
          const allIftahs = Array.isArray(res.data) ? (res.data as Iftah[]) : [];
          
          // Filter by tag name - check both nested and direct tag
          const filtered = allIftahs.filter((item: Iftah) => 
            item.tag?.name === categoryName ||
            (item as any).iftah_sub_category?.tag?.name === categoryName
          );
          console.log('📊 Filtered iftahs:', filtered.length);
          setCategoryIftahs(filtered);
          
          // Extract unique subcategories from filtered items
          const uniqueSubCategories = new Map<number, { id: number; name: string; tag_id?: number; tag?: { id: number; name: string } }>();
          filtered.forEach((item: any) => {
            if (item.iftah_sub_category && item.iftah_sub_category.id) {
              const subCat = item.iftah_sub_category;
              if (!uniqueSubCategories.has(subCat.id)) {
                uniqueSubCategories.set(subCat.id, {
                  id: subCat.id,
                  name: subCat.name,
                  tag_id: subCat.tag_id,
                  tag: subCat.tag
                });
              }
            }
          });
          setSubCategories(Array.from(uniqueSubCategories.values()));
        }
      } catch (error) {
        console.error('❌ Error fetching iftah category data:', error);
        setCategoryIftahs([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params]);
  
  // Category tabs
  const tabs = [
    { name: 'تازه ترین فتاوی', slug: 'latest', active: categorySlug === 'latest' },
    { name: 'خصوصی فتاوی', slug: 'special', active: categorySlug === 'special' },
    { name: 'جدید مسائل', slug: 'new', active: categorySlug === 'new' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      ` }} />
      <div className="min-h-screen bg-white relative ">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 " style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>

      </div>

      <div className="relative z-10 top-28 ">
        {/* Small Islamic Hero Section */}
        <div className="bg-gradient-to-r hidden md:block from-emerald-700  via-teal-600 to-emerald-800 text-white relative overflow-hidden py-3 md:py-4">
          {/* Decorative Islamic Elements */}
          {/* Islamic School Name Background Text */}
          <div className="absolute  inset-0 flex items-center justify-center pointer-events-none overflow-hidden top-4 md:top-8 px-2">
          <div className="text-white/8 break-words text-center" style={{ 
            fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', 
            fontFamily: 'Amiri, serif', 
            lineHeight: 1.2, 
            fontWeight: 700,
            maxWidth: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            اَلْجَامِعْةُ اَنوَار الْعُلُوْم اَلْاِسْلاَمِیّة اَلْعُرْفُ اَلْمَدْرَسَةٌ خلیفه صاحب ارغندی (رح)
          </div>
        </div>
          
          <div className="relative max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-8">
            {/* Center Title Content */}
            <div className="text-center">
             
             
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-3 md:px-4 py-4 md:py-8 pb-16 md:pb-24">
          {/* Tag Information Banner */}
          {tagId && tagInfo && (
            <div className="mb-4 md:mb-6 p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl md:text-3xl text-white">🏷️</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-2xl font-bold text-emerald-900 mb-1 break-words" style={{ fontFamily: 'Amiri, serif' }}>
                      {decodeURIComponent(categorySlug)}
                    </h2>
                    <p className="text-xs md:text-sm text-emerald-700">{t('iftah.categoryPage.tagId')}: {tagId} | {categoryIftahs.length} {t('iftah.categoryPage.questions')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Back Button and Category Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4 md:mb-6">
            {/* Category Tabs */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 order-2 sm:order-1">
              {tabs.map((tab) => (
                <button
                  key={tab.slug}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-t-lg font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                    tab.active
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={{ fontFamily: 'Amiri, serif' }}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            
            {/* Back Button - Right Side */}
            <Link
              href="/iftah"
              className="inline-flex items-center gap-2 px-5 py-2.5 md:py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-lg font-semibold rounded-xl transition-all duration-300 group text-base md:text-lg order-1 sm:order-2 self-end sm:self-auto sm:mt-0 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              style={{ minWidth: "150px", maxWidth: "100%" }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium tracking-wide" style={{ fontFamily: 'Amiri, serif' }}>
                {t('iftah.categoryPage.backToIftah')}
              </span>
            </Link>
          </div>

          {/* Subcategories Section */}
          {subCategories.length > 0 && (
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
               
                <span className="text-xs md:text-sm text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-full font-medium">
                  {subCategories.length} {subCategories.length === 1 ? t('iftah.categoryPage.subcategory') : t('iftah.categoryPage.subcategories')}
                </span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {subCategories.map((subCat) => (
                  <Link
                    key={subCat.id}
                    href={`/iftah/sub-category/${subCat.id}`}
                    className="group relative bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 rounded-xl shadow-md border-2 border-emerald-200/60 overflow-hidden hover:shadow-lg hover:border-emerald-300/80 transition-all duration-500 transform hover:-translate-y-0.5"
                  >
                    {/* Subtle Pattern Background - Islamic geometric pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3Cpath d='M40 0c0-11.046 8.954-20 20-20s20 8.954 20 20c0 11.046-8.954 20-20 20S40 11.046 40 0zm0 20c0 5.523 2.477 10 5 10 2.523 0 5-4.477 5-10 0-5.523-2.477-10-5-10S40 14.477 40 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>

                    {/* Top Section */}
                    <div className="relative p-3 md:p-4 pb-2">
                      {/* Islamic Icon - Main Icon Display */}
                      <div className="flex items-center justify-center my-2 md:my-3">
                        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-teal-50/80 to-emerald-50/80 rounded-lg flex items-center justify-center shadow-inner border-2 border-emerald-200/40 group-hover:border-emerald-300/60 group-hover:bg-gradient-to-br group-hover:from-emerald-50/90 group-hover:to-teal-50/90 transition-all duration-300">
                          <div className="text-teal-700 group-hover:text-emerald-700 transition-colors duration-300">
                            {getIslamicIcon(subCat.name)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Title and Tag Section - Centered */}
                      <div className="flex flex-col items-center justify-center text-center mb-2">
                        {/* Subcategory Title */}
                        <h3 className="text-sm md:text-base lg:text-lg font-bold text-teal-800 mb-2 md:mb-2.5 group-hover:text-emerald-700 transition-colors duration-300 leading-tight break-words" style={{ fontFamily: 'Amiri, serif' }}>
                          {cleanText(subCat.name)}
                        </h3>
                        
                        {/* Tag Badge */}
                        {subCat.tag && (
                          <div className="inline-flex items-center gap-1 px-2 md:px-2.5 py-1 bg-gradient-to-r from-emerald-100/90 to-teal-100/90 rounded-full border border-emerald-200/70 shadow-sm">
                            <span className="text-[10px] md:text-xs font-semibold text-teal-800" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(subCat.tag.name)}
                            </span>
                            <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Separator Line */}
                    <div className="mx-3 md:mx-4 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent group-hover:via-emerald-300/80 transition-colors duration-300"></div>
                    
                    {/* Bottom Section */}
                    <div className="p-3 md:p-4 pt-2 md:pt-3">
                      <div className="flex items-center justify-center">
                        <span className="text-xs md:text-sm font-semibold text-teal-700 group-hover:text-emerald-700 transition-colors duration-300 flex items-center gap-1.5">
                          <span>نور وګورئ</span>
                          <span className="text-base md:text-lg">→</span>
                        </span>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-300/0 via-teal-300/0 to-emerald-300/0 group-hover:from-emerald-300/5 group-hover:via-teal-300/5 group-hover:to-emerald-300/5 transition-all duration-500 pointer-events-none"></div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
      
      {/* Bottom Spacing to prevent footer overlap */}
      <div className="h-24"></div>
    </div>
    </>
  );
}






