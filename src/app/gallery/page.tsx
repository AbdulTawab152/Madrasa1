"use client";

import { useEffect, useState } from "react";
import { GalleryApi, extractArray } from "@/lib/api";
import Gallery from "./../components/gallery/Gallery";
import IslamicHeader from "../components/IslamicHeader";

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  category: string;
  image: string;
  featured?: boolean;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getImages() {
      try {
        const response = await GalleryApi.getAll();
        if (!response.success) {
          console.warn("Gallery API failed, using fallback data");
          setImages([{
            id: 1,
            title: "Gallery temporarily unavailable",
            description: "Please try again later",
            category: "General",
            image: "/placeholder-gallery.jpg",
            featured: false,
          }]);
          return;
        }

        const rawData = extractArray<any>(response.data);
        if (!rawData || !Array.isArray(rawData)) {
          console.warn("Invalid gallery data received, using fallback");
          setImages([{
            id: 1,
            title: "Gallery temporarily unavailable",
            description: "Please try again later",
            category: "General",
            image: "/placeholder-gallery.jpg",
            featured: false,
          }]);
          return;
        }

        const mappedData = rawData.map((item: any) => ({
          id: Number(item.id) || 1,
          title: item.title || "Untitled",
          description: item.description || "",
          category: item.category || "General",
          image: item.image || "/placeholder-gallery.jpg",
          featured: item.featured || false,
        }));

        setImages(mappedData);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setImages([{
          id: 1,
          title: "Gallery temporarily unavailable",
          description: "Please try again later",
          category: "General",
          image: "/placeholder-gallery.jpg",
          featured: false,
        }]);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, []);

  if (loading) {
    return (
      <div>
        <IslamicHeader pageType="gallery" title="Photo Gallery" />
        <div className="pb-16 flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <IslamicHeader pageType="gallery" title="Photo Gallery" />
      <div className="pb-16">
        <Gallery initialImages={images} />
      </div>
    </div>
  );
}
