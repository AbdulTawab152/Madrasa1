"use client";
import { useEffect, useState } from "react";
import { GalleryApi, extractArray } from "@/lib/api";
import Gallery from "./gallery/Gallery";

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  category: string;
  image: string;
  featured?: boolean;
}

export default function LazyGallerySection() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchImages() {
      try {
        const response = await GalleryApi.getAll();
        if (!isMounted) return;

        const rawData = extractArray<any>(response.data);
        const payload = rawData.map((item: any) => ({
          id: Number(item.id),
          title: item.title || "Untitled",
          description: item.description || "",
          category: item.category || "General",
          image: item.image || "/placeholder-gallery.jpg",
          featured: item.featured || false,
        }));

        setImages(payload);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        if (isMounted) {
          setImages([
            {
              id: 1,
              title: "Gallery temporarily unavailable",
              description: "Please try again later",
              category: "General",
              image: "/placeholder-gallery.jpg",
              featured: false,
            },
          ]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-600 font-medium">
          Loading gallery...
        </span>
      </div>
    );
  }

  return <Gallery initialImages={images} />;
}
