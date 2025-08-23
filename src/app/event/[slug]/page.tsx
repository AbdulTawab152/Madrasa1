// app/events/[slug]/page.tsx
import { EventsApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";

interface Event {
  title: string;
  slug: string;
  description: string;
  content?: string;
  featuredImage?: string;
  startDate: string;
  endDate: string;
  location?: string;
  isOnline?: boolean;
  meetingUrl?: string;
  organizer?: string;
  category?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  isFree?: boolean;
  price?: number;
  registrationRequired?: boolean;
  tags?: string[];
  date?: string;
  is_published?: boolean;
  image?: string;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage({ params }: Params) {
  const { slug } = await params;
  const res = await EventsApi.getAll();
  const events = Array.isArray(res.data) ? (res.data as Event[]) : [];
  const event: Event | undefined = events.find((e) => e.slug === slug);

  if (!event) {
    return <p className="text-center mt-20 text-xl">Event not found!</p>;
  }

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <main className="max-w-6xl mt-32 mx-auto px-6 py-12 font-sans">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Banner */}
        {event.image && (
          <div className="relative w-full h-[400px]">
            <Image
              src={getImageUrl(event.image)}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {event.title}
              </h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed">
            {event.description}
          </p>

          {/* Extra content (optional rich content) */}
          {event.content && (
            <div className="prose prose-lg text-gray-600 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: event.content }} />
            </div>
          )}

          {/* Event Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard label="📅 Start Date" value={event.startDate} />
            <InfoCard label="📅 End Date" value={event.endDate} />
            <InfoCard label="📍 Location" value={event.location || "TBA"} />
            <InfoCard
              label="🌐 Event Type"
              value={event.isOnline ? "Online" : "In-Person"}
            />
            {event.meetingUrl && (
              <InfoCard
                label="🔗 Meeting Link"
                value={
                  <a
                    href={event.meetingUrl}
                    target="_blank"
                    className="text-amber-600 underline"
                  >
                    Join Meeting
                  </a>
                }
              />
            )}
            <InfoCard label="👤 Organizer" value={event.organizer || "Unknown"} />
            <InfoCard label="🏷️ Category" value={event.category || "General"} />
            <InfoCard
              label="👥 Attendees"
              value={`${event.currentAttendees || 0} / ${
                event.maxAttendees || "Unlimited"
              }`}
            />
            <InfoCard
              label="💰 Price"
              value={event.isFree ? "Free" : `$${event.price || 0}`}
            />
            <InfoCard
              label="📝 Registration"
              value={event.registrationRequired ? "Required" : "Optional"}
            />
            <InfoCard
              label="📌 Published"
              value={event.is_published ? "Yes" : "No"}
            />
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back button */}
          <div className="pt-6">
            <Link
              href="/events"
              className="inline-block px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition shadow-md"
            >
              ← Back to Events
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// Small reusable card for event info
function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
      <span className="font-semibold text-gray-800">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}
