import Link from "next/link";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_featured: boolean;
  category_id: number;
  location?: string;
  organizer?: string;
  attendees?: string;
  duration?: string;
}

interface EventsSectionProps {
  events: Event[];
  showAll?: boolean;
}

export default function EventsSection({ events, showAll = false }: EventsSectionProps) {
  const sortedEvents =
    events
      ?.filter(event => event.is_published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const displayEvents = showAll ? sortedEvents : sortedEvents.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <section className="w-full">
      {/* --- Hero Section --- */}
      <div className="relative bg-gradient-to-r from-indigo-50 via-white to-indigo-50 py-16 px-6 text-center rounded-3xl mb-16 shadow-sm">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          {showAll ? "Discover All Our Events" : "Upcoming Events That Inspire"}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          {showAll
            ? "Explore all our events, past and upcoming, to stay connected with our vibrant community. From conferences to workshops, we’ve got something for everyone."
            : "Join us for exciting events designed to bring people together, spark new ideas, and create memorable experiences."}
        </p>
        {!showAll && (
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold text-base rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Events
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>

      {/* --- Event Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayEvents.map(event => (
          <Link key={event.id} href={`/event/${event.slug}`} className="group">
            <div className="bg-white/90 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col">
              
              {/* Event Image with overlay */}
              <div className="relative h-52 overflow-hidden">
                {event.image ? (
                  <Image
                    src={getImageUrl(event.image)}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center">
                    <span className="text-white font-medium">Event Image</span>
                  </div>
                )}

                {/* Date Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-md">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* Featured Badge */}
                {event.is_featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Event Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {event.description}
                </p>

                {/* Meta Info Chips */}
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">📍 {event.location || "TBA"}</span>
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600">👤 {event.organizer || "Organizer"}</span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600">🕒 {event.duration || "2h"}</span>
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-600">👥 {event.attendees || "50+"}</span>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.03] shadow-md text-sm">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
  