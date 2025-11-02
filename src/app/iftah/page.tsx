// app/iftah/page.tsx
import { IftahApi } from "../../lib/api";
import Link from "next/link";
import DarulUloomIftahSection from "../components/iftah/DarulUloomIftahSection";

interface IftahCategory {
  id: number;
  name: string;
  name_en?: string;
  icon?: string;
  description?: string;
  count?: number;
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

interface Iftah {
  id: number;
  title?: string;
  tag?: Tag;
  tag_id?: number | null;
  iftah_sub_category?: IftahSubCategory | null;
}

export default async function IftahPage() {
  let allIftahs: Iftah[] = [];
  let displayCategories: IftahCategory[] = [];

  try {
    // Get all iftahs to extract unique tags
    const res = await IftahApi.getAll({ limit: 100 });
    allIftahs = Array.isArray(res.data) ? res.data : [];
    
    console.log('📊 Fetched iftahs:', allIftahs.length, 'Sample:', allIftahs[0]);
    
    // Extract unique tags from iftahs - check both iftah_sub_category.tag and direct tag
    const tagMap = new Map<number, { id: number; name: string; count: number }>();
    allIftahs.forEach((iftah: Iftah) => {
      // Check iftah_sub_category.tag first (this is the nested structure from API)
      if (iftah.iftah_sub_category?.tag) {
        const tagId = iftah.iftah_sub_category.tag.id;
        if (tagMap.has(tagId)) {
          const existing = tagMap.get(tagId)!;
          existing.count += 1;
        } else {
          tagMap.set(tagId, {
            id: tagId,
            name: iftah.iftah_sub_category.tag.name,
            count: 1
          });
        }
      } 
      // Fallback to direct tag if available
      else if (iftah.tag) {
        const tagId = iftah.tag.id;
        if (tagMap.has(tagId)) {
          const existing = tagMap.get(tagId)!;
          existing.count += 1;
        } else {
          tagMap.set(tagId, {
            id: tagId,
            name: iftah.tag.name,
            count: 1
          });
        }
      }
    });

    // Convert map to array
    displayCategories = Array.from(tagMap.values()).map(tag => ({
      id: tag.id,
      name: tag.name,
      name_en: tag.name,
      icon: '📚',
      description: '',
      count: tag.count
    }));
  } catch (error) {
    console.error('Error fetching iftah data:', error);
    // Use default categories when API fails
    displayCategories = [
      { id: 1, name: 'تازه ترین فتاوی', name_en: 'Latest Fatwas', icon: '📌', description: '', count: 0 },
      { id: 2, name: 'نماز', name_en: 'Prayer', icon: '🤲', description: '', count: 0 },
      { id: 3, name: 'روزہ', name_en: 'Fasting', icon: '🌙', description: '', count: 0 },
      { id: 4, name: 'زکوٰۃ', name_en: 'Zakat', icon: '💰', description: '', count: 0 },
      { id: 5, name: 'حج', name_en: 'Hajj', icon: '🕋', description: '', count: 0 },
      { id: 6, name: 'معاملات', name_en: 'Transactions', icon: '📋', description: '', count: 0 },
    ];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-25 ">
      {/* Enhanced Islamic Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-600 to-emerald-800 text-white">
        {/* Arabic Calligraphy Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3Cpath d='M40 0c0-11.046 8.954-20 20-20s20 8.954 20 20c0 11.046-8.954 20-20 20S40 11.046 40 0zm0 20c0 5.523 2.477 10 5 10 2.523 0 5-4.477 5-10 0-5.523-2.477-10-5-10S40 14.477 40 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'backgroundMove 30s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Floating Decorative Islamic Elements */}
        <div className="absolute top-5 left-5 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-5 right-10 w-52 h-52 bg-teal-300/10 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-emerald-200/8 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-teal-200/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
     
        
        {/* Quranic Ayah Decoration */}
        <div className="absolute right-8 top-40 text-white/10" style={{ fontSize: '5rem', fontFamily: 'Amiri, serif' }}>
            ﷽
          </div>
          <div className="absolute left-8 bottom-0 text-white/10 rotate " style={{ fontSize: '5rem', fontFamily: 'Amiri, serif' }}>
            ﷽
          </div>
        
        {/* Main Content */}
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center z-10 top-14">
          {/* Back Button */}
          <div className="absolute top-4 left-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition-all duration-300 group border border-white/20"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-white">Back to Home</span>
            </Link>
          </div>
          
          {/* Central Logo/Icon */}
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white/15 rounded-full mb-8 hover:scale-110 transition-all duration-500 shadow-2xl ring-4 ring-white/10 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-25 animate-pulse"></div>
            <div className="relative z-10 text-5xl">📿</div>
          </div>
          
      
          {/* English Title */}
          <p className="text-3xl md:text-4xl text-emerald-100 mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s', fontWeight: '700' }}>
           دانلاین فتوا خدامات
          </p>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-emerald-50 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
           د حنفي فقهې د اصولو په رڼا کې 
شرعي لارښوونې، هر وخت او هر ځای.
          </p>
        
    
          
          {/* Bottom Decorative Line */}
          <div className="mt-12 mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
      </div>

      {/* Categories Grid Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">اختر الموضوع</span>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Amiri, serif' }}>فتاویٰ ډولونه
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayCategories.map((category: IftahCategory, index: number) => {
            // Use tag name as slug
            const categorySlug = category.name;

         return (
              <Link
                key={category.id || index}
                href={`/iftah/category/${encodeURIComponent(categorySlug)}`}
                className="group bg-white rounded-3xl shadow-md border border-green-200 overflow-hidden hover:shadow-2xl hover:border-green-400 transition-all duration-300 transform hover:-translate-y-1 relative"
              >
                {/* Gradient Top Bar */}
                <div className="h-1.5 bg-gradient-to-r from-green-600 via-green-400 to-emerald-400"></div>
                
                <div className="p-5 text-center">
                  {/* Icon Container with Square Background */}
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-green-100 transition-colors duration-300 shadow-sm group-hover:shadow-md">
                    <div className="text-3xl">{category.icon || '📚'}</div>
                  </div>
                  
                  {/* Category Name - Centered Arabic Text */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-700 transition-colors duration-300" style={{ fontFamily: 'Amiri, serif', minHeight: '2.5rem' }}>
                    {category.name}
                  </h3>
                  
                  {/* Separator Line */}
                  <div className="h-px bg-green-200 mb-4 group-hover:bg-green-300 transition-colors"></div>
                  
                  {/* Bottom Section - RTL Layout */}
                  <div className="flex items-center justify-between">
                    {/* Navigation Arrow on Left (RTL) */}
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-all duration-300">
                      <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {/* Question Count on Right */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-600">
                        {(category.count || 0) > 0 ? `${category.count} Questions` : 'Browse'}
                      </span>
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">؟</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Iftah Section - Display actual fatwas */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <DarulUloomIftahSection 
          fatwas={allIftahs as any}
          showAll={true}
          title="دانورالعلوم ارغندی"
          subtitle="فتویٰ شعبہ"
        />
      </div>
    </div>
  );
}
