import Image from "next/image";
import Link from "next/link";

async function fetchArticlesData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/articles";
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Error fetching data");

  const data = await res.json();
  return data;
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

interface ArticlesPreviewProps {
  limit?: number;
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-5 border border-orange-200 shadow-sm">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            <span className="text-sm font-medium text-orange-700">Exclusive Articles</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Knowledge and Experience in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 block"> the World of Saffron</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Discover the secrets of premium saffron, cultivation and harvesting methods, and the best ways to use this red gold in cooking and health.
          </p>
          
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#articles"
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>View Articles</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </Link>
            
            <Link
              href="/categories"
              className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
            >
              <span>Article Categories</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}

// Stats Section Component


export default async function ArticlesPreview({ limit }: ArticlesPreviewProps) {
  const articlesData = await fetchArticlesData();
  const displayArticles = limit ? articlesData.slice(0, limit) : articlesData;

  return (
    <>
      {/* <HeroSection /> */}
   
      
      <section id="articles" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest <span className="text-orange-600">Articles</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The latest educational, research, and news content about saffron cultivation, harvesting, and usage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((item: any) => (
              <Link key={item.id} href={`/articles/${item.id}`} className="group block h-full">
                <div className="relative flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100">
                  
                  {/* Image Section */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
                      width={500}
                      height={224}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                      {item.category_id || "General"}
                    </span>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-white font-bold text-lg mb-1 line-clamp-1 drop-shadow-md">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col p-5">
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {item.question || item.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500 gap-3 pt-3 border-t border-gray-100">
                      {/* <span className="flex items-center gap-1.5 "> */}
                        {/* <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg> */}
                     
                      {/* </span> */}
                         {item.published_at?.split('T')[0] || item.date || "Unknown date"}
                      <span className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.shared_by || "Anonymous Author"}
                      </span>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  {/* <div className="absolute inset-0 pointer-events-none group-hover:bg-orange-50/10 transition duration-300 rounded-2xl" /> */}
                  
                  {/* Read more indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg--500 text-white p-2 rounded-full shadow-lg">
                      {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {limit && (
            <div className="col-span-full text-center mt-12">
              <Link
                href="/articles"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                View All Articles
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
