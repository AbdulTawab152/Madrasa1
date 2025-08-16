// app/event/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
  slug: string;
}

// Helper to get full image URL
const getImageUrl = (img?: string) => {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

// Fetch event by slug
async function fetchEventDetail(slug: string): Promise<Event | null> {
  try {
    const API_URL = `https://lawngreen-dragonfly-304220.hostingersite.com/api/event/${slug}`;
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) {
      console.error("Event not found:", slug, res.status);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch event:", err);
    return null;
  }
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event = await fetchEventDetail(slug);

  if (!event) {
    notFound(); // Show Next.js 404 page if event doesn't exist
  }

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

      {event.image && (
        <Image
          src={getImageUrl(event.image)}
          alt={event.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
      )}

      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-500 text-sm">
        Date: {new Date(event.date).toLocaleDateString("fa-IR")}
      </p>
    </main>
  );
}
