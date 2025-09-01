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
          <div className="mt-2 text-gray-100 font-medium">Upcoming</div>
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
         Upcoming <span className="text-orange-500">Events</span>
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
        <div className="relative mt-28">
          {/* Background with stronger orange gradient */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full h-[600px] bg-gradient-to-r from-amber-400/30 via-orange-500/25 to-orange-600/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-full bg-gradient-to-b from-white/90 to-amber-50/80 dark:from-gray-900/90 dark:to-amber-950/70 backdrop-blur-xl border border-amber-200/50 dark:border-amber-900/40 rounded-3xl py-12 text-center overflow-hidden ">
            {/* Enhanced decorative elements with orange theme */}
            <div className="absolute top-6 left-10 text-amber-400 animate-ping">✨</div>
            <div className="absolute top-12 right-12 text-orange-500 animate-bounce">🎉</div>
            <div className="absolute bottom-10 left-16 text-amber-500 animate-pulse">⭐</div>
            <div className="absolute bottom-16 right-20 text-orange-400 animate-pulse delay-300">🔥</div>

            {/* Stronger gradient ring accent */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 opacity-30 blur-xl"></div>

            {/* Enhanced heading with bolder orange gradient */}
            <h2 className="relative text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-600 to-orange-700 bg-clip-text text-transparent mb-8 tracking-tight px-4">
              Discover Every Event
            </h2>

            {/* Improved subtext with better orange accent */}
            <p className="relative text-xl md:text-xl text-gray-800 dark:text-amber-100 mb-14 max-w-2xl mx-auto leading-relaxed px-6">
              You've explored a glimpse of what we offer.  
              Step into the full journey with all{" "}
              <span className="font-semibold text-amber-600 dark:text-amber-400">featured highlights</span>,{" "}
              <span className="font-semibold text-orange-600 dark:text-orange-400">exclusive sessions</span>, and{" "}
              <span className="font-semibold text-amber-700 dark:text-amber-300">upcoming opportunities</span>.  
            </p>

            {/* Enhanced CTA Button with stronger orange presence */}
            <div className="relative">
              <Link
                href="/event"
                className="group relative inline-flex items-center px-6 py-3 rounded-full 
                text-md font-bold text-white shadow-2xl bg-gradient-to-r from-amber-500 to-orange-600 
                hover:shadow-2xl hover:scale-105 transform transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-700"
              >
                <span className="relative flex items-center">
                  See All Events
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="ml-3 transition-transform duration-300 group-hover:translate-x-2 h-6 w-6"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>

                {/* Enhanced glow effect */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-40 blur-lg group-hover:opacity-50 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
)}



      </section>
    </div>
  );
}
