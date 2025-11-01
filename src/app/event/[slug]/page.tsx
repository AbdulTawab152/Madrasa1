// app/events/[slug]/page.tsx
import { EventsApi, extractArray } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getImageUrl } from "@/lib/utils";
import { cleanText } from "@/lib/textUtils";
import { cookies } from "next/headers";
import { getTranslation } from "@/lib/translations";

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  duration: string;
  live_link?: string | null;
  live_link_type?: string | null;
  status?: string | null; // "past", "upcoming", etc.
  is_published: number; // 0 or 1
  created_at: string;
  updated_at: string;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage({ params }: Params) {
  const { slug } = await params;

  // Determine language from cookie (fallback to ps)
  const cookieStore = await cookies();
  const currentLanguage = cookieStore.get("language")?.value || "ps";
  const t = (key: string): string => {
    const translation = getTranslation(key, currentLanguage);
    return typeof translation === 'string' ? translation : key;
  };

  const eventResponse = await EventsApi.getBySlug(slug);
  if (!eventResponse.success) {
    notFound();
  }

  const eventPayload = eventResponse.data;
  const event = Array.isArray(eventPayload)
    ? (eventPayload[0] as Event | undefined)
    : (eventPayload as Event | undefined);

  if (!event) notFound();

  let relatedEvents: Event[] = [];
  try {
    const relatedResponse = await EventsApi.getAll({ limit: 6 });
    if (relatedResponse.success) {
      const data = extractArray<Event>(relatedResponse.data);
      relatedEvents = data.filter((e) => e.slug !== slug).slice(0, 3);
    }
  } catch (relatedError) {
    console.warn("Failed to load related events:", relatedError);
  }

  // Format date for better display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Get status badge color
  const getStatusColor = (status?: string | null) => {
    const normalized = (status || "unknown").toLowerCase();
    switch (normalized) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "past":
        return "bg-gray-100 text-gray-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <main className="min-h-screen my-[60] bg-gradient-to-b from-amber-50/20 to-white pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-amber-600 hover:text-amber-700 transition-colors outline-none focus:outline-none focus:ring-0"
              >
                {t('eventsPage.home')}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-amber-400">/</span>
              <Link
                href="/event"
                className="text-amber-600 hover:text-amber-700 transition-colors outline-none focus:outline-none focus:ring-0"
              >
                {t('eventsPage.events')}
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
                    src={
                      getImageUrl(event.image, "/placeholder-event.jpg") ||
                      "/placeholder-event.jpg"
                    }
                    alt={event.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {(event.status
                        ? event.status.charAt(0).toUpperCase() + event.status.slice(1)
                        : "Unknown")}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8">
                <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {event.title}
                </h1>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-y border-gray-100">
                  <div className="flex gap-4 items-start space-x-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-md font-medium text-gray-500">{t('eventsPage.date')}</p>
                      <p className=" text-[14px] md:font-medium ">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start space-x-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-md font-medium   text-gray-500">{t('eventsPage.duration')}</p>
                      <p className="text-[14px]  md:font-medium">
                        {event.duration || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {event.live_link && (
                    <div className="flex gap-4 items-start space-x-3 md:col-span-2">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-amber-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="space-x-6">
                        <p className="text-sm text-gray-500">{t('eventsPage.liveStream')}</p>
                        <a
                          href={event.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-amber-600 hover:text-amber-700 inline-flex items-center mt-1"
                        >
                          {event.live_link_type || t('eventsPage.watchLive')}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.description && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">{t('eventsPage.aboutThisEvent')}</h2>
                    <div className="prose max-w-none text-gray-700">
                      <p className="whitespace-pre-line">{cleanText(event.description)}</p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Related Events - sticky/fixed on scroll */}
            {relatedEvents.length > 0 && (
              <div
                className="
                  bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-0 flex flex-col gap-5
                  sticky top-8 transition-all duration-300
                "
                style={{
                  zIndex: 10,
                }}
              >
                <h3 className="text-xl font-bold text-amber-700 mb-2 flex items-center gap-2">
                  <svg
                    className="h-6 w-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                    />
                  </svg>
                  {t('eventsPage.relatedEvents')}
                </h3>
                <div className="flex flex-col gap-6">
                  {relatedEvents.map((event) => (
                    <Link
                      key={event.slug}
                      href={`/event/${event.slug}`}
                      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl transition-colors hover:bg-amber-100"
                    >
                      <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-xl shadow-sm">
                        <div className="flex-shrink-0 relative h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border border-amber-200 bg-gray-100">
                          <Image
                            src={getImageUrl(event.image, "/placeholder-event.jpg") || "/placeholder-event.jpg"}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 15vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-gray-900 truncate group-hover:text-amber-700 transition-colors">
                            {event.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(event.date)}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {/* Intentionally left empty */}
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
