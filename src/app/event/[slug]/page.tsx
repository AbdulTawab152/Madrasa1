// app/event/[slug]/page.tsx
import Image from 'next/image';
import { fetchWithCache } from '../../../lib/api';
import { endpoints } from '../../../lib/config';
import { Event } from '../../../lib/types';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchEvent(slug: string): Promise<Event> {
  try {
    const data = await fetchWithCache<Event>(`${endpoints.events}/${slug}`);
    return data;
  } catch (error) {
    throw new Error("Event not found");
  }
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await fetchEvent(slug);

  return (
    <main className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {event.featuredImage ? (
              <Image
                src={getImageUrl(event.featuredImage)}
                alt={event.title}
                className="w-full h-96 md:h-full object-cover"
                width={600}
                height={400}
              />
            ) : (
              <div className="w-full h-96 md:h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">{event.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Location:</strong> {event.location || "N/A"}
                </div>
                <div>
                  <strong>Online Event:</strong> {event.isOnline ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Free Event:</strong> {event.isFree ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Price:</strong> {event.price ? `$${event.price}` : "Free"}
                </div>
                <div>
                  <strong>Max Attendees:</strong> {event.maxAttendees || "Unlimited"}
                </div>
                <div>
                  <strong>Current Attendees:</strong> {event.currentAttendees || 0}
                </div>
              </div>
              
              {event.content && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Event Details</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{event.content}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
