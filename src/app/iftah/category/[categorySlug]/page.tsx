'use client';
import { useState, useEffect } from "react";
import { IftahApi } from "@/lib/api";
import { cleanText } from "@/lib/textUtils";
import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";

interface Author {
  name: string;
  bio?: string;
}

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  references?: string[];
  isPublished?: boolean;
  viewCount?: number;
  is_published?: boolean;
  tag?: {
    id: number;
    name: string;
  };
}

export default function IftahCategoryPage({ 
  params 
}: { 
  params: Promise<{ categorySlug: string }> 
}) {
  const [categorySlug, setCategorySlug] = useState<string>('');
  const [categoryIftahs, setCategoryIftahs] = useState<Iftah[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const slug = resolvedParams.categorySlug;
      setCategorySlug(slug);
      
      // Decode the category name
      const name = decodeURIComponent(slug);
      
      setIsLoading(true);
      
      try {
        // Fetch all iftahs
        const res = await IftahApi.getAll();
        const allIftahs = Array.isArray(res.data) ? (res.data as Iftah[]) : [];
        
        // Filter by tag name
        const filtered = allIftahs.filter(
          (item: Iftah) => item.tag?.name === name
        );
        setCategoryIftahs(filtered);
      } catch (error) {
        console.error('Error fetching iftah category data:', error);
        setCategoryIftahs([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [params]);
  
  // Filter by search term
  const filteredIftahs = categoryIftahs.filter(item => {
    const title = cleanText(item.title || '').toLowerCase();
    const question = cleanText(item.question || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return title.includes(search) || question.includes(search);
  });
  
  // Category tabs
  const tabs = [
    { name: 'تازه ترین فتاوی', slug: 'latest', active: categorySlug === 'latest' },
    { name: 'خصوصی فتاوی', slug: 'special', active: categorySlug === 'special' },
    { name: 'جدید مسائل', slug: 'new', active: categorySlug === 'new' },
  ];

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
          {/* Back Button and Category Tabs */}
          <div className="flex items-center justify-between gap-4 mb-6">
            {/* Back Button */}
            <Link
              href="/iftah"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-all duration-300 group shadow-md"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Iftah</span>
            </Link>
            
            {/* Category Tabs */}
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.slug}
                  className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
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
                <p className="text-gray-600">{searchTerm ? 'Try a different search term' : 'There are no questions in this category yet.'}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredIftahs.map((item) => (
                  <Link
                    key={item.id}
                    href={`/iftah/${item.slug}`}
                    className="block group hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="px-6 py-4">
                      <p className="text-base text-gray-800 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                        <span className="font-bold text-green-600 mr-2">Q.</span>
                        {cleanText(item.title)}
                      </p>
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
