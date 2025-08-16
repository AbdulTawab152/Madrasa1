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
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articlesData.map((item: any) => (
          <Link key={item.id} href={`/articles/${item.id}`} className="block">
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
           <Image
          src={ getImageUrl(item.image)}
          alt={item.title}
          className="w-full h-48 object-cover"
          width={300}
          height={200}
        />

              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{item.question || item.description}</p>
                <div className="mt-3 text-sm text-gray-500">
                  <p>Date: {item.published_at || item.date || "N/A"}</p>
                  <p>Shared by: {item.shared_by || "N/A"}</p>
                  <p>Category ID: {item.category_id || "N/A"}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
