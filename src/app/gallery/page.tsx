import React from "react";

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

export default async function GalleryPage() {
  const gallery = await fetchGalleryData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition">
            <img
              src={item.image}
              alt={item.title || `Gallery Image ${item.id}`}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            {item.title && <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>}
            {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
