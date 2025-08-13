// app/event/page.tsx
import Link from "next/link";
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  duration?: string;
  live_link?: string;
  live_link_type?: "facebook" | "youtube" | "twitch" | string;
  status?: "past" | "coming";
  is_published: boolean;
  image: string;
  location?: string;
}

async function fetchEventsData(): Promise<Event[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/events";
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch events data");
  }

  return res.json();
}


export default async function EventsPage() {
  const events = await fetchEventsData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link key={event.id} href={`/event/${event.slug}`}>
           
              <Image
                src={event.image || "https://via.placeholder.com/300x400"}
                alt={event.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-4 text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 mt-1 text-sm line-clamp-3">{event.description}</p>
          
          </Link>
        ))}
      </div>
    </main>
  );
}
