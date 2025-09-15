"use client";
import { useEffect, useState } from "react";
import Gallery from "./gallery/Gallery";

export default function LazyGallerySection() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch(
          "https://lawngreen-dragonfly-304220.hostingersite.com/api/gallery",
          {
            next: { revalidate: 300 }, // Cache for 5 minutes
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();
        setImages(Array.isArray(data) ? data : data?.data || []);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        // Use fallback images
        setImages([
          {
            id: 1,
            image: "/placeholder-gallery.jpg",
            title: "Gallery temporarily unavailable",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
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
