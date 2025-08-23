import Image from "next/image";
import Link from "next/link";

async function fetchArticlesData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/articles";
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("خطا در دریافت اطلاعات");

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

export default async function ArticlesPreview({ limit }: ArticlesPreviewProps) {
  const articlesData = await fetchArticlesData();
  const displayArticles = limit ? articlesData.slice(0, limit) : articlesData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayArticles.map((item: any) => (
        <Link key={item.id} href={`/articles/${item.id}`} className="group block h-full">
          <div className="relative flex flex-col h-full bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200 hover:shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
            
            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
              <Image
                src={getImageUrl(item.image)}
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
                width={500}
                height={224}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              <span className="absolute top-4 left-4 bg-blue-500/80 text-white text-sm px-4 py-1 rounded-full font-semibold shadow">
                {item.category_id || "General"}
              </span>
              <span className="absolute top-4 right-4 bg-white/80 text-blue-600 text-sm px-3 py-1 rounded-full shadow font-bold border border-blue-100">
                #{item.id}
              </span>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {item.question || item.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between text-xs text-gray-500 gap-3 pt-3 border-t border-gray-200">
                <span className="flex items-center gap-1 bg-gray-100/50 px-2 py-1 rounded-full">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.published_at?.split('T')[0] || item.date || "N/A"}
                </span>
                <span className="flex items-center gap-1 bg-green-100/50 px-2 py-1 rounded-full">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.shared_by || "Unknown"}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none group-hover:bg-white/10 transition duration-300 rounded-2xl" />
          </div>
        </Link>
      ))}

      {limit && (
        <div className="col-span-full text-center mt-6">
          <Link
            href="/articles"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            See All Articles
          </Link>
        </div>
      )}
    </div>
  );
}
