// app/iftah/page.tsx
import { IftahApi } from "../../lib/api";
import Link from "next/link";

// Islamic Icon Components - Improved SVG icons
const CrescentStarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Crescent Moon */}
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69C15.28 7.22 14.05 7 12.75 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.3 0 2.53-.22 3.65-.62C15.55 19.37 13.85 20 12 20z"/>
    {/* Star */}
    <path d="M19 6l1.5 3L24 10l-2.5 2.5L22 16l-3-1.5L16 16l0.5-3.5L14 10l3.5-1L19 6z"/>
  </svg>
);

const QuranIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Book cover */}
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    {/* Text lines */}
    <path d="M9 7h6M9 11h6M9 15h4"/>
    {/* Decorative dot */}
    <circle cx="13" cy="8" r="0.8" fill="currentColor"/>
  </svg>
);

const MosqueIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Dome/Arch */}
    <path d="M12 2L2 7v2h20V7L12 2z"/>
    {/* Building base */}
    <path d="M4 11v10h4v-6h8v6h4V11H4z"/>
    {/* Door */}
    <rect x="10" y="15" width="4" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
    {/* Crescent on dome */}
    <circle cx="12" cy="7" r="1" fill="white"/>
  </svg>
);

const TasbihIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Prayer beads */}
    <circle cx="12" cy="3" r="1.2"/>
    <circle cx="12" cy="7.5" r="1.2"/>
    <circle cx="12" cy="12" r="1.2"/>
    <circle cx="12" cy="16.5" r="1.2"/>
    <circle cx="12" cy="21" r="1.2"/>
    {/* Connectors */}
    <rect x="11.5" y="4.2" width="1" height="2.1" fill="currentColor"/>
    <rect x="11.5" y="8.7" width="1" height="2.1" fill="currentColor"/>
    <rect x="11.5" y="13.2" width="1" height="2.1" fill="currentColor"/>
    <rect x="11.5" y="17.7" width="1" height="2.1" fill="currentColor"/>
  </svg>
);

const PrayerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Prayer hands/compass */}
    <path d="M12 2v4M12 18v4"/>
    <path d="M6 8l3.46 3.46M14.54 14.54L18 18M18 8l-3.46 3.46M9.46 14.54L6 18"/>
    {/* Center circle */}
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Map category names to appropriate Islamic icons
const getIslamicIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes('نماز') || name.includes('prayer')) {
    return <PrayerIcon className="w-8 h-8" />;
  }
  if (name.includes('روزہ') || name.includes('fasting') || name.includes('رمضان')) {
    return <CrescentStarIcon className="w-8 h-8" />;
  }
  if (name.includes('زکو') || name.includes('zakat')) {
    return <StarIcon className="w-8 h-8" />;
  }
  if (name.includes('حج') || name.includes('hajj')) {
    return <MosqueIcon className="w-8 h-8" />;
  }
  if (name.includes('تطهیر') || name.includes('طهارت') || name.includes('taharat') || name.includes('purity')) {
    return <TasbihIcon className="w-8 h-8" />;
  }
  // Default to Quran icon
  return <QuranIcon className="w-8 h-8" />;
};

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
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayCategories.map((category: IftahCategory, index: number) => {
            // Use tag name as slug
            const categorySlug = category.name;

         return (
              <Link
                key={category.id || index}
                href={`/iftah/category/${encodeURIComponent(categorySlug)}`}
                className="group relative bg-gradient-to-br from-emerald-50/40 via-white to-mint-50/30 rounded-2xl shadow-md border-2 border-emerald-200/60 overflow-hidden hover:shadow-xl hover:border-emerald-300/80 transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* Subtle Pattern Background - Islamic geometric pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3Cpath d='M40 0c0-11.046 8.954-20 20-20s20 8.954 20 20c0 11.046-8.954 20-20 20S40 11.046 40 0zm0 20c0 5.523 2.477 10 5 10 2.523 0 5-4.477 5-10 0-5.523-2.477-10-5-10S40 14.477 40 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                {/* Top Section */}
                <div className="relative p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Title and Tag Section */}
                    <div className="flex-1 min-w-0">
                      {/* Category Title */}
                    
                      
                      {/* Tag Badge - Mint Green */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-100/90 to-teal-100/90 rounded-full border border-emerald-200/70 shadow-sm">
                        <span className="text-xs md:text-sm font-semibold text-teal-800 truncate" style={{ fontFamily: 'Amiri, serif' }}>
                          {category.name}
                        </span>
                        {/* Price tag icon */}
                        <svg className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Islamic Icon - Main Icon Display */}
                  <div className="flex items-center justify-center my-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-50/80 to-emerald-50/80 rounded-xl flex items-center justify-center shadow-inner border-2 border-emerald-200/40 group-hover:border-emerald-300/60 group-hover:bg-gradient-to-br group-hover:from-emerald-50/90 group-hover:to-teal-50/90 transition-all duration-300">
                      <div className="text-teal-700 group-hover:text-emerald-700 transition-colors duration-300">
                        {getIslamicIcon(category.name)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Separator Line */}
                <div className="mx-5 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent group-hover:via-emerald-300/80 transition-colors duration-300"></div>
                
                {/* Bottom Section */}
                <div className="p-5 pt-4">
                  <div className="flex items-center justify-center">
                    <span className="text-sm md:text-base font-semibold text-teal-700 group-hover:text-emerald-700 transition-colors duration-300 flex items-center gap-2">
                      <span className="text-lg">→</span>
                      <span>Click to view questions</span>
                    </span>
                  </div>
                  
                  {/* Question Count Badge */}
                  {(category.count || 0) > 0 && (
                    <div className="mt-3 flex items-center justify-center">
                      <div className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full shadow-sm">
                        <span className="text-xs font-bold text-white">
                          {category.count} Questions
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-300/0 via-teal-300/0 to-emerald-300/0 group-hover:from-emerald-300/5 group-hover:via-teal-300/5 group-hover:to-emerald-300/5 transition-all duration-500 pointer-events-none"></div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
