import Image from 'next/image';
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

export default async function ArticlesPage() {
  const articlesData = await fetchArticlesData();

  return (
    <main className="relative p-8 min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-green-300/20 to-blue-200/10 rounded-full blur-2xl animate-pulse" />
      </div>
      <h1 className="relative z-10 text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-green-600 to-purple-700 drop-shadow-xl tracking-tight">Articles</h1>
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {articlesData.map((item: any) => (
          <Link key={item.id} href={`/articles/${item.id}`} className="group block h-full">
            <div className="relative h-full flex flex-col bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.025] hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  width={500}
                  height={208}
                  priority
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-green-400 text-white text-xs px-4 py-1 rounded-full shadow-lg opacity-95 font-semibold tracking-wide backdrop-blur-md">
                  {item.category_id || "General"}
                </span>
                <span className="absolute top-4 right-4 bg-white/80 text-blue-600 text-xs px-3 py-1 rounded-full shadow-md font-bold border border-blue-100">
                  #{item.id}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2 drop-shadow-sm">{item.title}</h2>
                <p className="text-gray-700 text-base mb-5 line-clamp-3 font-medium">{item.question || item.description}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-gray-600 gap-2 pt-3 border-t border-gray-200">
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {item.published_at?.split('T')[0] || item.date || "N/A"}</span>
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> {item.shared_by || "Unknown"}</span>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none group-hover:bg-white/10 transition duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
