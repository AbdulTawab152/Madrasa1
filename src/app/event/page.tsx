// app/event/page.tsx
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

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

const getImageUrl = (img?: string) => {
  if (!img) return "/placeholder.png";
  return img.startsWith("http")
    ? img
    : `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function EventsPage() {
  const events = await fetchEventsData();

  return (
    <main className="relative p-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-30 -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-pink-100 rounded-full opacity-20 -z-10 animate-pulse"></div>

      {/* Section Title */}
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-16 relative">
        📅 Our Upcoming Events
        <span className="block w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full"></span>
      </h1>

      {/* Event Cards */}
      <div className="flex flex-col space-y-16">
        {events.map((event, idx) => (
          <div
            key={event.slug}
            className={`flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Left: Image */}
            <div className="md:w-1/2 relative h-80 md:h-[28rem] flex-shrink-0">
              <Image
                src={getImageUrl(event.image)}
                alt={event.title}
                fill
                className="object-cover rounded-l-3xl md:rounded-l-3xl md:rounded-r-none hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-l-3xl md:rounded-l-3xl md:rounded-r-none"></div>
            </div>

            {/* Right: Text */}
            <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6 relative">
              {/* Decorative floating icon */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 text-blue-100 text-6xl opacity-20 animate-bounce">✨</div>

              <h2 className="text-4xl font-bold text-gray-900">{event.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed line-clamp-5">
                {event.description}
              </p>

              <div className="flex items-center gap-4 text-gray-600">
                <FaCalendarAlt className="text-blue-500" />
                <span className="font-medium">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Button */}
              <a
                href={`/event/${event.slug}`}
                className="self-start px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
