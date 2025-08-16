// app/event/page.tsx
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  image: string;
}

async function fetchEventsData(): Promise<Event[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/events";
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Failed to fetch events data");
  return res.json();
}

// Helper for image URLs
const getImageUrl = (img?: string) => {
  if (!img) return "/placeholder.png"; // fallback if no image
  return img.startsWith("http")
    ? img
    : `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function EventsPage() {
  const events = await fetchEventsData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event.slug} href={`/event/${event.slug}`} className="group">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
              <Image
                src={getImageUrl(event.image)}
                alt={event.title}
                width={300}
                height={400}
                className="w-full h-48 object-cover group-hover:opacity-80 transition"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600 mt-1 text-sm line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
