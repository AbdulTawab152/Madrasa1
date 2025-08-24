// app/tasawwuf/page.tsx

import Image from 'next/image';

async function fetchTasawwufData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/tasawwuf";
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!res.ok) throw new Error("Failed to fetch Tasawwuf data");

  return res.json();
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return img ? `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}` : '/placeholder-tasawwuf.jpg';
};

export default async function TasawwufPage() {
  let tasawwufData = [];
  try {
    tasawwufData = await fetchTasawwufData();
  } catch (error) {
    console.error("Error fetching Tasawwuf data:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b mt-32 from-orange-50/20 to-amber-50/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl"></div>
      
      {/* Header Section */}
      <div className="relative py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg mb-6 rotate-3">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange-900">
            <span className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
              Tasawwuf Insights
            </span>
          </h1>
          
          <p className="text-xl text-orange-700/80 max-w-2xl mx-auto leading-relaxed">
            Spiritual wisdom and divine teachings from the path of Islamic spirituality
          </p>
          
          <div className="mt-10 w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-4 pb-20">
        {tasawwufData.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-2xl mb-6 -rotate-2">
              <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-orange-900 mb-4">No Spiritual Insights Available</h2>
            <p className="text-orange-700/70">We are preparing divine wisdom and spiritual teachings. Please check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasawwufData.map((item: any, index: number) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={item.id} className={`relative ${isEven ? '' : 'ml-8'}`}>
                  {/* Connecting line */}
                  {index < tasawwufData.length - 1 && (
                    <div className={`absolute top-16 h-16 w-1 bg-gradient-to-b from-orange-300 to-amber-200 left-6 z-0 ${isEven ? '' : 'left-8'}`}></div>
                  )}
                  
                  {/* Content Container */}
                  <div className={`relative flex flex-col md:flex-row gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-100 shadow-lg hover:shadow-xl transition-shadow ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} ${isEven ? '' : 'mr-8'}`}>
                    {/* Number indicator */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-orange-900 mb-4 pr-8">{item.title}</h2>
                      
                      <div className="w-16 h-1 bg-orange-400 rounded-full mb-5"></div>
                      
                      <p className="text-orange-800/90 leading-relaxed mb-6">
                        {item.question || item.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-4 text-sm text-orange-700/80">
                        {item.date && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {new Date(item.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        )}
                        
                        {item.shared_by && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {item.shared_by}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Image */}
                    {item.image && (
                      <div className="relative w-full md:w-80 h-56 rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 border-2 border-orange-200 shadow-lg">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Continue Your Spiritual Journey</h2>
            
            <p className="text-orange-700/80 mb-6 max-w-xl mx-auto">
              "Verily, in the remembrance of Allah do hearts find rest." (Quran 13:28)
            </p>
            
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg">
              Explore More Teachings
            </button>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="text-center mt-16 pt-8 border-t border-orange-200/50">
          <p className="text-orange-700/60 italic">
            "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect." (Quran 65:2-3)
          </p>
        </div>
      </main>
    </div>
  );
}