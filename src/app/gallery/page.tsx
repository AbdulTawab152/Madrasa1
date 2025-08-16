import Image from 'next/image';

interface GalleryItem {
  id: number;
  title?: string;
  image: string;
  description?: string;
}

async function fetchGalleryData(): Promise<GalleryItem[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/gallery";
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch gallery data");
  }

  return res.json();
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function GalleryPage() {
  const gallery = await fetchGalleryData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition">
       

        

  <Image
              src={getImageUrl(item.image)}
              alt={item.title || "Gallery Image"}
              width={300}
              height={400}
              className="w-full h-48 object-cover rounded group-hover:opacity-80 transition"
            />
            {item.title && <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>}
            {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
