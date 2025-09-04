// app/events/[slug]/page.tsx
import { EventsApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  duration: string;
  live_link: string;
  live_link_type: string;
  status: string; // "past", "upcoming", etc.
  is_published: number; // 0 or 1
  created_at: string;
  updated_at: string;
}

interface Params {
  params: { slug: string };
}

export default async function EventDetailsPage({ params }: Params) {
  const { slug } = params;

  // Fetch events
  const res = await EventsApi.getAll();
  const events: Event[] = Array.isArray(res.data) ? res.data : [];
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const relatedEvents = events.filter((e) => e.slug !== slug).slice(0, 3);

  const getImageUrl = (img?: string) =>
    img ? (img.startsWith("http") ? img : `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`) : "/placeholder.jpg";

  // Format date for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <main className="min-h-screen my-[60] bg-gradient-to-b from-amber-50/20 to-white pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-amber-600 hover:text-amber-700 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-amber-400">/</span>
              <Link href="/events" className="text-amber-600 hover:text-amber-700 transition-colors">
                Events
              </Link>
            </li>
            
          
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Header */}
            <article className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden mb-8">
              {/* Featured Image */}
              {event.image && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                  <Image
                    src={getImageUrl(event.image)}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {event.title}
                </h1>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(event.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{event.duration}</p>
                    </div>
                  </div>

                  {event.live_link && (
                    <div className="flex items-start space-x-3 md:col-span-2">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Live Stream</p>
                        <a 
                          href={event.live_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-medium text-amber-600 hover:text-amber-700 inline-flex items-center mt-1"
                        >
                          {event.live_link_type || "Watch Live"}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.description && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">About This Event</h2>
                    <div className="prose max-w-none text-gray-700">
                      <p className="whitespace-pre-line">{event.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Events</h3>
                <div className="space-y-4">
                  {relatedEvents.map((relatedEvent) => (
                    <Link 
                      key={relatedEvent.id} 
                      href={`/event/${relatedEvent.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0 relative h-16 w-16 rounded-lg overflow-hidden">
                          <Image
                            src={getImageUrl(relatedEvent.image)}
                            alt={relatedEvent.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-amber-600 transition-colors">
                            {relatedEvent.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(relatedEvent.date)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Event Actions */}
         
          </div>
        </div>
      </div>
    </main>
  );
}