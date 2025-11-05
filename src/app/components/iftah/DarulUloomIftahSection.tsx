'use client';
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cleanText } from "@/lib/textUtils";
import { useTranslation } from "@/hooks/useTranslation";
import { IftahApi } from "@/lib/api";

interface Author {
  name?: string;
  full_name?: string;
  father_name?: string;
  bio?: string;
}

interface Tag {
  id: number;
  name: string;
}

interface IftahSubCategory {
  id: number;
  name: string;
  tag_id?: number;
  tag?: Tag;
}

type ViewMode = 'categories' | 'subcategories' | 'questions';

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
  created_at?: string;
  updated_at?: string;
  shared_by?: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  tag?: Tag;
  tag_id?: number | null;
  is_published?: boolean | number;
  viewCount?: number;
  iftah_sub_category_id?: number;
  iftah_sub_category?: IftahSubCategory;
  attachment?: string | null;
  note?: string | null;
}

interface DarulUloomIftahSectionProps {
  fatwas?: IftahItem[];
  showAll?: boolean;
  title?: string;
  subtitle?: string;
}

export default function DarulUloomIftahSection({ 
  fatwas = [], 
  showAll = false, 
  title = "دانورالعلوم ارغندی",
  subtitle = "فتویٰ شعبہ"
}: DarulUloomIftahSectionProps) {
  const router = useRouter();
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | number | null>(null);
  // Start with questions view if fatwas are provided, otherwise categories
  const [viewMode, setViewMode] = useState<ViewMode>(fatwas.length > 0 ? 'questions' : 'categories');
  const [subCategoryQuestions, setSubCategoryQuestions] = useState<IftahItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchedFatwas, setFetchedFatwas] = useState<IftahItem[]>(fatwas);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any | null>(null);
  const [tagInfo, setTagInfo] = useState<any | null>(null);
  const [loadingTagInfo, setLoadingTagInfo] = useState(false);

  // Update fetched fatwas when fatwas prop changes
  useEffect(() => {
    if (fatwas.length > 0) {
      setFetchedFatwas(fatwas);
    }
  }, [fatwas]);

  // Fetch data if no fatwas provided
  useEffect(() => {
    if (fetchedFatwas.length === 0 && !isFetching) {
      setIsFetching(true);
      console.log('🔄 Fetching fatwas from API...');
      IftahApi.getAll({ limit: 100 })
        .then((result) => {
          console.log('📥 API Response:', result);
          if (result.success && Array.isArray(result.data)) {
            console.log('✅ Fetched fatwas from API:', result.data.length);
            const fetchedData = result.data as IftahItem[];
            setFetchedFatwas(fetchedData);
            console.log('📊 Sample fatwa data:', fetchedData[0]);
          } else {
            console.warn('⚠️ API returned no data or error:', result);
          }
        })
        .catch((error) => {
          console.error('❌ Error fetching fatwas:', error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [fetchedFatwas.length, isFetching]);

  // Use fetched fatwas if no fatwas prop provided
  const effectiveFatwas = fatwas.length > 0 ? fatwas : fetchedFatwas;

  // Auto-switch to questions view when fatwas are loaded
  useEffect(() => {
    if (effectiveFatwas.length > 0 && viewMode === 'categories') {
      // If we have fatwas but no categories, switch to questions view
      const cats = IftahApi.extractCategories(effectiveFatwas);
      if (cats.length === 0) {
        console.log('📊 No categories found, switching to questions view');
        setViewMode('questions');
      }
    }
  }, [effectiveFatwas.length, viewMode]);

  // Extract categories and subcategories from effective fatwas
  const categories = useMemo(() => {
    console.log('🔍 extractCategories called with fatwas:', {
      count: effectiveFatwas?.length || 0,
      firstItem: effectiveFatwas[0],
      sampleStructure: effectiveFatwas[0] ? {
        id: effectiveFatwas[0].id,
        title: effectiveFatwas[0].title,
        has_iftah_sub_category: !!effectiveFatwas[0]?.iftah_sub_category,
        iftah_sub_category_structure: effectiveFatwas[0]?.iftah_sub_category,
        has_direct_tag: !!effectiveFatwas[0]?.tag
      } : null
    });
    const cats = IftahApi.extractCategories(effectiveFatwas);
    console.log('📊 Extracted categories result:', cats, 'from fatwas:', effectiveFatwas?.length || 0);
    return cats;
  }, [effectiveFatwas]);
  
  // Extract subcategories with proper category filtering
  const subcategories = useMemo(() => {
    console.log('🔄 useMemo subcategories triggered:', {
      selectedCategory,
      selectedCategoryType: typeof selectedCategory,
      effectiveFatwasCount: effectiveFatwas.length
    });
    
    const subs = selectedCategory !== null && selectedCategory !== undefined
      ? IftahApi.extractSubCategories(effectiveFatwas, selectedCategory)
      : IftahApi.extractSubCategories(effectiveFatwas);
    
    console.log('📊 Extracted subcategories result:', {
      subs,
      count: subs.length,
      forCategory: selectedCategory,
      subsDetails: subs.map(s => ({ id: s.id, name: s.name, tag_id: s.tag_id }))
    });
    
    return subs;
  }, [effectiveFatwas, selectedCategory]);

  // Force re-extract when selectedCategory changes and we're in subcategories view
  useEffect(() => {
    if (viewMode === 'subcategories' && selectedCategory !== null && selectedCategory !== undefined) {
      console.log('🔄 useEffect: Force re-extracting subcategories for category', selectedCategory);
      // Trigger a re-render by forcing the useMemo to recalculate
      // This is already handled by the useMemo dependency, but adding this for debugging
      const filtered = IftahApi.extractSubCategories(effectiveFatwas, selectedCategory);
      console.log('✅ Force extraction result:', filtered);
    }
  }, [selectedCategory, viewMode, effectiveFatwas]);

  // Handle category click - show subcategories
  const handleCategoryClick = (categoryId: number | string) => {
    // Normalize to number for consistency
    const categoryIdNum = Number(categoryId);
    const categoryName = categories.find(c => c.id === categoryIdNum)?.name || 'Unknown';
    
    console.log('🖱️ Category clicked - BEFORE state update:', {
      originalId: categoryId,
      normalizedId: categoryIdNum,
      type: typeof categoryId,
      categoryName,
      currentSelectedCategory: selectedCategory,
      currentViewMode: viewMode
    });
    
    // Set state first - React will batch these updates
    setSelectedCategory(categoryIdNum);
    setSelectedSubCategory(null);
    setViewMode('subcategories');
    setSubCategoryQuestions([]);
    
    console.log('🖱️ Category clicked - AFTER state update called:', {
      categoryIdNum,
      categoryName,
      effectiveFatwasCount: effectiveFatwas.length
    });
    
    // Force immediate extraction to verify data exists (useMemo will also run)
    console.log('📂 Immediately extracting subcategories for category', categoryIdNum, 'from', effectiveFatwas.length, 'fatwas...');
    const filteredSubs = IftahApi.extractSubCategories(effectiveFatwas, categoryIdNum);
    console.log('📂 Immediate extraction result:', {
      count: filteredSubs.length,
      subcategories: filteredSubs.map(s => ({ id: s.id, name: s.name, tag_id: s.tag_id }))
    });
    
    // Small delay to let state update, then verify
    setTimeout(() => {
      console.log('⏱️ After state update delay - Current state:', {
        selectedCategory,
        viewMode,
        subcategoriesCount: subcategories.length
      });
    }, 100);
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

  // Handle tag click - navigate to category route with tag name
  const handleTagClick = async (tagId: number | string, tagName?: string) => {
    console.log('🏷️ Tag clicked:', { tagId, tagName });
    
    try {
      // If tag name is provided, use it directly
      if (tagName) {
        const encodedTagName = encodeURIComponent(tagName);
        console.log('🚀 Navigating to category route:', `/iftah/category/${encodedTagName}`);
        router.push(`/iftah/category/${encodedTagName}`);
        return;
      }

      // Otherwise, fetch tag info to get the name
      const tagResult = await IftahApi.getTags({ limit: 100 });
      if (tagResult.success && Array.isArray(tagResult.data)) {
        const foundTag = tagResult.data.find((tag: any) => tag.id === tagId || tag.id === Number(tagId));
        if (foundTag && foundTag.name) {
          const encodedTagName = encodeURIComponent(foundTag.name);
          console.log('🚀 Navigating to category route with tag name:', `/iftah/category/${encodedTagName}`);
          router.push(`/iftah/category/${encodedTagName}`);
        } else {
          // Fallback: navigate with tag ID if name not found
          console.log('⚠️ Tag name not found, navigating with ID:', `/iftah/category/${tagId}`);
          router.push(`/iftah/category/${tagId}`);
        }
      } else {
        // Fallback: navigate with tag ID
        console.log('⚠️ Could not fetch tags, navigating with ID:', `/iftah/category/${tagId}`);
        router.push(`/iftah/category/${tagId}`);
      }
    } catch (error) {
      console.error('❌ Error navigating to tag category:', error);
      // Fallback: navigate with tag ID
      router.push(`/iftah/category/${tagId}`);
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
    ? (subCategoryQuestions.length > 0 
    ? subCategoryQuestions.filter(item => {
            const cleanTitle = cleanText(item.title || '');
            const cleanQuestion = cleanText(item.question || '');
        return cleanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
               cleanQuestion.toLowerCase().includes(searchTerm.toLowerCase());
      })
        : effectiveFatwas.filter(item => {
            const cleanTitle = cleanText(item.title || '');
            const cleanQuestion = cleanText(item.question || '');
            return cleanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   cleanQuestion.toLowerCase().includes(searchTerm.toLowerCase());
          }))
    : effectiveFatwas.filter(item => {
        const cleanTitle = cleanText(item.title || '');
        const cleanQuestion = cleanText(item.question || '');
        const matchesSearch = !searchTerm || cleanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             cleanQuestion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || 
          item.iftah_sub_category?.tag?.id === selectedCategory ||
          item.iftah_sub_category?.tag_id === selectedCategory ||
          item.tag?.id === selectedCategory ||
          item.tag_id === selectedCategory;
        return matchesSearch && matchesCategory;
      });

  // When showAll is true or in questions view, show all filtered results
  const displayFatwas = (showAll || viewMode === 'questions') ? filteredFatwas : filteredFatwas.slice(0, 8);
  
  console.log('📋 Display Fatwas:', {
    total: effectiveFatwas.length,
    filtered: filteredFatwas.length,
    displaying: displayFatwas.length,
    viewMode,
    showAll,
    searchTerm,
    selectedCategory,
    selectedSubCategory
  });

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
                <span className="text-emerald-100 font-medium"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 -mt-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Main Content Area */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
              {/* Enhanced Section Header */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 border-b border-emerald-200">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: 'Amiri, serif' }}>
                        نئے سوالات
                      </h3>
                      <p className="text-emerald-700 text-sm mt-1">
                        {viewMode === 'categories' && (
                          <>
                            {categories.length} categories available
                            {categories.length > 0 && (
                              <span className="ml-2 text-xs bg-emerald-200 px-2 py-1 rounded">
                                Debug: {JSON.stringify(categories.map(c => c.name))}
                              </span>
                            )}
                          </>
                        )}
                        {viewMode === 'subcategories' && (
                          <>
                            {subcategories.length} subcategories available
                            {subcategories.length > 0 && (
                              <span className="ml-2 text-xs bg-teal-200 px-2 py-1 rounded">
                                Debug: {JSON.stringify(subcategories.map(s => s.name))}
                              </span>
                            )}
                          </>
                        )}
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
                  {(() => {
                    console.log('🎨 Rendering categories view:', {
                      categoriesLength: categories.length,
                      categories: categories,
                      effectiveFatwasLength: effectiveFatwas.length,
                      viewMode,
                      categoriesArray: JSON.stringify(categories)
                    });
                    return null;
                  })()}
                  
                  {/* Quick Actions Bar */}
                  <div className="mb-4 flex flex-wrap gap-2 items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewMode('questions')}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                      >
                        📋 ټولې پوښتنې وګورئ ({effectiveFatwas.length})
                      </button>
                      {categories.length > 0 && (
                        <button
                          onClick={() => setViewMode('categories')}
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
                        >
                          📁 View Categories ({categories.length})
                        </button>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      Categories: {categories.length} | Subcategories: {subcategories.length} | Questions: {effectiveFatwas.length}
                    </div>
                  </div>

                  {categories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categories.map((category, index) => {
                        console.log(`🎨 Rendering category ${index}:`, category);
                        if (!category || !category.id) {
                          console.error('❌ Invalid category:', category);
                          return null;
                        }
                        return (
                      <button
                            key={category.id || `category-${index}`}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('🖱️ Category clicked:', category);
                              handleCategoryClick(category.id);
                            }}
                        className="group bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-xl p-6 border border-emerald-200 hover:border-emerald-300 transition-all duration-150 text-right shadow-sm hover:shadow-md"
                            style={{ display: 'block', width: '100%' }}
                      >
                        <div className="flex items-center justify-between">
                          <svg className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-emerald-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                                  {category.name ? cleanText(category.name) : `Category ${category.id}`}
                            </h4>
                            <p className="text-sm text-emerald-700">
                              Click to view subcategories
                            </p>
                          </div>
                        </div>
                      </button>
                        );
                      })}
                  </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-lg mb-2">No categories available</p>
                      <p className="text-gray-500 text-sm">
                        {effectiveFatwas.length > 0 
                          ? `Found ${effectiveFatwas.length} fatwa(s) but couldn't extract categories. The data may not have category information.`
                          : isFetching 
                            ? 'Loading fatwas...'
                            : 'No fatwas data available. Please check your API connection.'}
                      </p>
                      {effectiveFatwas.length > 0 && (
                        <button
                          onClick={() => setViewMode('questions')}
                          className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                         ټولې پوښتنې وګورئ ({effectiveFatwas.length})
                        </button>
                      )}
                      {isFetching && (
                        <div className="mt-4 flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Subcategories View */}
              {viewMode === 'subcategories' && (
                <div className="p-8">
                  {(() => {
                    console.log('🎨 Rendering subcategories view:', {
                      subcategoriesLength: subcategories.length,
                      subcategories: subcategories,
                      selectedCategory,
                      selectedCategoryType: typeof selectedCategory,
                      viewMode,
                      effectiveFatwasLength: effectiveFatwas.length,
                      hasSubcategoriesData: subcategories.length > 0
                    });
                    
                    // Log warning if we're in subcategories view but no category is selected
                    if (!selectedCategory) {
                      console.warn('⚠️ WARNING: In subcategories view but selectedCategory is null/undefined!');
                    }
                    
                    // Log warning if category is selected but no subcategories found
                    if (selectedCategory && subcategories.length === 0) {
                      console.warn('⚠️ WARNING: Category', selectedCategory, 'is selected but no subcategories found!');
                    }
                    
                    return null;
                  })()}
                  
                  {/* Quick Actions Bar for Subcategories */}
                  <div className="mb-4 flex flex-wrap gap-2 items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={handleBackToCategories}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        ← Back to Categories
                      </button>
                      {selectedCategory && (
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-lg text-sm font-medium">
                          Category ID: {selectedCategory}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      Showing: {subcategories.length} subcategories
                      {selectedCategory && ` for category ${selectedCategory}`}
                    </div>
                  </div>
                  
                  {/* Always show debug info when category is selected */}
                  {selectedCategory && (
                    <div className={`mb-4 p-4 border rounded-lg text-xs ${subcategories.length === 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
                      <strong className="block mb-2">📊 Debug Info for Category ID: {selectedCategory}</strong>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <strong>Total Fatwas:</strong> {effectiveFatwas.length}
                        </div>
                        <div>
                          <strong>Fatwas with Subcategories:</strong> {effectiveFatwas.filter(f => f?.iftah_sub_category).length}
                        </div>
                        <div>
                          <strong>Found Subcategories:</strong> <span className="font-bold text-green-600">{subcategories.length}</span>
                        </div>
                        <div>
                          <strong>Selected Category ID:</strong> {selectedCategory} (type: {typeof selectedCategory})
                        </div>
                      </div>
                      
                      {subcategories.length > 0 ? (
                        <div className="mt-2 p-2 bg-green-100 rounded">
                          <strong className="text-green-800">✅ Found Subcategories:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {subcategories.map(sub => (
                              <li key={sub.id} className="text-green-700">
                                <strong>ID {sub.id}:</strong> "{sub.name}" (tag_id: {sub.tag_id})
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="mt-2 p-2 bg-red-100 rounded">
                          <strong className="text-red-800">❌ No Subcategories Found!</strong>
                          <div className="mt-2 space-y-1 text-xs">
                            <div><strong>Checking fatwas for category {selectedCategory}...</strong></div>
                            {effectiveFatwas.filter(f => f?.iftah_sub_category).slice(0, 3).map(f => {
                              const subCat = f.iftah_sub_category;
                              const tagId = subCat?.tag?.id ?? subCat?.tag_id ?? null;
                              const matches = tagId === Number(selectedCategory);
                              return (
                                <div key={f.id} className={`p-2 rounded ${matches ? 'bg-green-100' : 'bg-red-50'}`}>
                                  <strong>Fatwa {f.id}:</strong> Subcategory "{subCat?.name}" (ID: {subCat?.id}) 
                                  - Tag ID: <strong>{String(tagId)}</strong> 
                                  {matches ? ' ✅ MATCHES' : ' ❌ No match'}
                                  <br />
                                  <span className="text-xs text-gray-600">
                                    tag.id: {subCat?.tag?.id ?? 'null'}, tag_id: {subCat?.tag_id ?? 'null'}
                                  </span>
                                </div>
                              );
                            })}
                            {effectiveFatwas.filter(f => f?.iftah_sub_category).length === 0 && (
                              <div className="text-red-600 font-bold">⚠️ No fatwas have iftah_sub_category!</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Success Message */}
                  {subcategories.length > 0 && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-green-800 font-semibold">
                          Found {subcategories.length} subcategor{subcategories.length === 1 ? 'y' : 'ies'} for this category!
                        </p>
                      </div>
                    </div>
                  )}

                  {subcategories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subcategories.map((subcategory, index) => {
                        console.log(`🎨 Rendering subcategory card ${index}:`, {
                          id: subcategory.id,
                          name: subcategory.name,
                          tag_id: subcategory.tag_id
                        });
                        return (
                      <button
                            key={subcategory.id || `subcategory-${index}`}
                            onClick={() => {
                              console.log('🖱️ Subcategory clicked:', subcategory);
                              handleSubCategoryClick(subcategory.id);
                            }}
                        className="group bg-gradient-to-br from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 rounded-xl p-6 border border-teal-200 hover:border-teal-300 transition-all duration-150 text-right shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <svg className="w-6 h-6 text-teal-600 group-hover:text-teal-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-teal-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                                  {subcategory.name ? cleanText(subcategory.name) : `Subcategory ${subcategory.id}`}
                            </h4>
                                <p className="text-sm text-teal-700 mb-1">
                                د پوښتنو د لیدو لپاره کلیک وکړئ
                            </p>
                                {subcategory.tag_id && (
                                  <p className="text-xs text-teal-600 font-medium">
                                    📁 Category ID: {subcategory.tag_id}
                                  </p>
                                )}
                          </div>
                        </div>
                      </button>
                        );
                      })}
                  </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600 mb-4">No subcategories available for this category</p>
                      <button
                        onClick={handleBackToCategories}
                        className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        Back to Categories
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Questions View */}
              {viewMode === 'questions' && (
                <>
                  {/* Tag Info Display */}
                  {selectedTag && tagInfo && (
                    <div className="px-8 pt-6 pb-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                              <span className="text-2xl text-white">🏷️</span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: 'Amiri, serif' }}>
                                {tagInfo.name || `Tag ${selectedTag}`}
                              </h3>
                              <p className="text-sm text-emerald-700">Tag ID: {selectedTag}</p>
                            </div>
                          </div>
                          {tagInfo.description && (
                            <p className="text-gray-700 mt-2" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(tagInfo.description)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedTag(null);
                            setTagInfo(null);
                            setSubCategoryQuestions([]);
                            setFetchedFatwas(fatwas);
                          }}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                          ✕ Close Tag Info
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions Bar for Questions View */}
                  <div className="px-8 pt-6 pb-4 flex flex-wrap gap-2 items-center justify-between bg-gray-50 border-b border-gray-200">
                    <div className="flex gap-2">
                      {categories.length > 0 && (
                        <button
                          onClick={() => setViewMode('categories')}
                          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
                        >
                          📁 View Categories ({categories.length})
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory(null);
                          setSelectedSubCategory(null);
                          setSelectedTag(null);
                          setTagInfo(null);
                          setSubCategoryQuestions([]);
                          setFetchedFatwas(fatwas);
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        🔄 Reset Filters
                      </button>
                    </div>
                    <div className="text-xs text-gray-600">
                      Showing: {displayFatwas.length} of {effectiveFatwas.length} questions
                      {selectedTag && ` | Tag: ${selectedTag}`}
                      {selectedCategory && ` | Category: ${selectedCategory}`}
                      {selectedSubCategory && ` | Subcategory: ${selectedSubCategory}`}
                      {searchTerm && ` | Search: "${searchTerm}"`}
                    </div>
                  </div>

                  {loading ? (
                    <div className="px-8 py-12 text-center">
                      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading questions...</p>
                    </div>
                  ) : displayFatwas.length > 0 ? (
                    <div className="divide-y divide-emerald-100">
                      {displayFatwas.map((item) => (
                  <div key={item.id} className="group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-150">
                    <div className="px-8 py-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center mb-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mr-3 bg-emerald-100 text-emerald-800">
                              ❓ Q&A
                            </span>
                            {/* Subcategory Badge */}
                            {item.iftah_sub_category && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 mr-2">
                                📁 {cleanText(item.iftah_sub_category.name)}
                              </span>
                            )}
                            {/* Category/Tag Badge - Clickable */}
                            {item.iftah_sub_category?.tag && (() => {
                              const tag = item.iftah_sub_category?.tag;
                              const tagId = tag?.id;
                              const tagName = tag?.name;
                              if (!tag || !tagId) return null;
                              return (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleTagClick(tagId, tagName);
                                  }}
                                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer mr-2"
                                  title="Click to view all items for this tag"
                                >
                                  🏷️ {cleanText(tagName)}
                                </button>
                              );
                            })()}
                            {/* Direct tag on item */}
                            {!item.iftah_sub_category?.tag && item.tag && (() => {
                              const tag = item.tag;
                              const tagId = tag?.id;
                              const tagName = tag?.name;
                              if (!tag || !tagId) return null;
                              return (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleTagClick(tagId, tagName);
                                  }}
                                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer mr-2"
                                  title="Click to view all items for this tag"
                                >
                                  🏷️ {cleanText(tagName)}
                                </button>
                              );
                            })()}
                          {/* Mufti Badge */}
                            {item.mufti?.full_name && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mr-2">
                                👤 {cleanText(item.mufti.full_name)}
                              </span>
                            )}
                          {/* Published Status */}
                          {item.is_published && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Published
                              </span>
                            )}
                          </div>
                          
                          <h1 className="text-lg font-semibold text-emerald-900 hover:text-teal-700 transition-colors leading-relaxed block mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                            {cleanText(item.title || 'Untitled')}
                          </h1>
                          
                          {item.question && (
                            <div className="mb-3">
                              <p className="text-gray-700 text-sm font-semibold mb-1">Question:</p>
                              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3" style={{ fontFamily: 'Amiri, serif' }}>
                              {cleanText(item.question)}
                            </p>
                            </div>
                          )}
                          
                          {/* Show answer preview if available */}
                          {item.answer && (
                            <div className="mb-3">
                              <p className="text-gray-700 text-sm font-semibold mb-1">Answer:</p>
                              <p className="text-gray-600 text-xs leading-relaxed line-clamp-2" style={{ fontFamily: 'Amiri, serif' }}>
                                {cleanText(item.answer)}
                              </p>
                            </div>
                          )}
                          
                          {/* Additional Details */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                            {/* Mufti Details */}
                            {item.mufti && (
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-emerald-200 flex items-center justify-center mr-1">
                                  <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span className="font-medium">{cleanText(item.mufti?.full_name || item.mufti?.name || "Anonymous")}</span>
                                {item.mufti.father_name && (
                                  <span className="text-gray-400">({cleanText(item.mufti.father_name)})</span>
                                )}
                              </div>
                            )}
                            {/* Date */}
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{cleanText(item.published_at?.split('T')[0] || item.date || item.created_at?.split('T')[0] || "Unknown date")}</span>
                            </div>
                            {/* View Count */}
                            {item.viewCount && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{item.viewCount} views</span>
                              </div>
                            )}
                            {/* ID Badge */}
                            <div className="flex items-center">
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                ID: {item.id}
                              </span>
                            </div>
                            {/* Attachment indicator */}
                            {item.attachment && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <span>Has attachment</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <Link className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-150 shadow-sm group-hover:shadow-md" href={`/iftah/${item.slug}`}>
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
                  ) : (
                    <div className="px-8 py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-lg mb-2">پوښتنه پیدا نشوه</p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm 
                          ? `No questions match your search "${searchTerm}"`
                          : 'No questions available for this subcategory.'}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          Clear Search
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced View All Button */}
        {!showAll && displayFatwas.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/iftah"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-150 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-150"></span>
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
