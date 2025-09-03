import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, User, Clock, Users, ArrowRight } from "lucide-react";
import { getImageUrl } from "../../../lib/utils";

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
  status: string;
  is_published: number;
}

interface EventsSectionProps {
  events: Event[];
  showAll?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
}

export default function EventsSection({ 
  events, 
  showAll = false, 
  heroTitle = "Our Events",
  heroSubtitle = "Join our community gatherings and experiences",

}: EventsSectionProps) {
  const sortedEvents =
    events
      ?.filter((event) => event.is_published === 1)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  // Show only 3 events on homepage
  const displayEvents = showAll ? sortedEvents : sortedEvents.slice(0, 3);



  return (
    <div className="min-h-screen">
      {/* Hero Section only shows on event page */}
    {showAll && (
  <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden mb-16">
    {/* Background Image */}
    <div className="absolute inset-0">
      <Image
        src="/1.jpg"
        alt="Events Banner"
        fill
        className="object-cover scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/70 to-black/60"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-6 lg:px-12 h-full flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 animate-fade-in">
        {heroTitle}
      </h1>
      <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-10 animate-fade-in-up">
        {heroSubtitle}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 w-full max-w-3xl">
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg hover:scale-105 transition">
          <div className="text-4xl font-bold text-orange-400">{sortedEvents.length}+</div>
          <div className="mt-2 text-gray-100 font-medium">Total Events</div>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg hover:scale-105 transition">
          <div className="text-4xl font-bold text-pink-400">
            {sortedEvents.filter(e => e.status === 'coming').length}+
          </div>
          <div className="mt-2 text-gray-100 font-medium">Our</div>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg hover:scale-105 transition">
          <div className="text-4xl font-bold text-green-400">
            {sortedEvents.filter(e => e.status === 'past').length}+
          </div>
          <div className="mt-2 text-gray-100 font-medium">Past Events</div>
        </div>
      </div>

      {/* CTA Button */}
      {/* <div className="mt-10">
        <button className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition">
          Explore All Events
        </button>
      </div> */}
    </div>

    {/* Bottom Fade */}
    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
  </section>
)}


      {/* Events Section */}
      <section className="w-full px-4 py-16 md:px-8 max-w-6xl mx-auto">
<div className="relative text-center mb-20">
  {/* Subtle background accent */}
  <div className="absolute inset-0 -z-10 flex items-center justify-center">
    <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-orange-200 via-pink-200 to-yellow-200 opacity-30 blur-3xl"></div>
  </div>

  {/* Title */}
  <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
    {showAll ? (
      <>
         All <span className="text-orange-500">Events</span>
      </>
    ) : (
      <>
         Our <span className="text-orange-500">Events</span>
      </>
    )}
  </h2>

  {/* Subtitle */}
  <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
    Discover inspiring <span className="text-orange-500 font-semibold">events</span>, connect with like-minded people, and grow with our vibrant community.
  </p>

  {/* Decorative divider */}
  <div className="mt-6 flex justify-center">
    <span className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 shadow-md"></span>
  </div>
</div>


        <div className="relative">
          <div className="absolute left-5 md:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-200 to-orange-100 rounded-full" />

          {displayEvents.map((event, idx) => (
            <Link key={event.id} href={`/event/${event.slug}`}>
              <div className="group flex flex-col md:flex-row items-start mb-12 relative pl-16 md:pl-24">
                <div className="absolute left-5 md:left-6 top-5 w-5 h-5 rounded-full bg-white border-4 border-orange-500 transition-transform duration-300 group-hover:scale-125 group-hover:" />
                {idx < displayEvents.length - 1 && (
                  <span className="absolute left-5 md:left-6 top-12 bottom-[-4rem] w-1 bg-gradient-to-b from-orange-400 via-orange-200 to-orange-100 rounded-full" />
                )}

                <div className="flex-1 bg-white rounded-xl   overflow-hidden transition-all duration-300 flex flex-col md:flex-row">
                  {event.image && (
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <Image
                        src ={getImageUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* {event.is_featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md">
                          ⭐ Featured
                        </div>
                      )} */}
                    </div>
                  )}

                  <div className={`p-6 ${event.image ? 'md:w-2/3' : 'w-full'}`}>
                    <div className="flex items-center gap-3 mb-3 flex-wrap text-sm text-gray-500">
                      <Calendar size={18} className="text-orange-400" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-3">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                      {event.description.replace(/<[^>]*>/g, '')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  
                      {event.duration && (
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-orange-400" />
                          <span>{event.duration}</span>
                        </div>
                      )}
                   
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
          {!showAll && sortedEvents.length > 3 && (
        <div className="mt-12 text-center">
          <Link href="/event" className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm hover:shadow-md">
            <span>View All Events</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
)}



      </section>
    </div>
  );
}
