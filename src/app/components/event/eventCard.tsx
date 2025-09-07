"use client"
import Link from "next/link";

import Image from "next/image";
import { Calendar, MapPin, User, Clock, Users, ArrowRight } from "lucide-react";
import { getImageUrl } from "../../../lib/utils";
import { motion } from "framer-motion";


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
        <section className="relative w-full py-24 md:py-40 overflow-hidden">
          {/* Background Decorative Orbs */}
          <div className="absolute inset-0 pointer-events-none z-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/95 via-white/85 to-yellow-100/90 w-full h-full" />
            <div className="absolute top-10 left-10 w-44 h-44 bg-gradient-to-br from-orange-200/50 to-yellow-200/50 rounded-full blur-3xl animate-[float1_16s_ease-in-out_infinite]" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-yellow-200/40 to-orange-200/40 rounded-full blur-3xl animate-[float2_22s_ease-in-out_infinite]" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-orange-100/60 to-yellow-100/60 rounded-full blur-2xl animate-[float3_18s_ease-in-out_infinite]" />
          </div>

          {/* Text Content */}
          <div className="container mx-auto px-6 lg:px-16 flex flex-col items-center text-center relative z-10">
  {/* Badge */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="inline-flex items-center gap-3 mb-8 px-8 py-3 bg-white/85 backdrop-blur-lg border border-orange-200/70 text-orange-600 text-base font-semibold rounded-full shadow-2xl ring-2 ring-orange-100/80"
  >
    <span className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-md animate-pulse"></span>
    <span className="tracking-wide uppercase font-bold">Events</span>
    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-1000"></span>
  </motion.div>

  {/* Animated Headline (staggered words) */}
  <motion.h1
    className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 drop-shadow-2xl"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.15
        }
      }
    }}
  >
    {heroTitle.split(" ").map((word, index) => (
      <motion.span
        key={index}
        className={`inline-block ${
          index === 0 ? "text-orange-500 drop-shadow-lg" : "text-gray-800 drop-shadow-lg relative"
        } mr-2`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {word}
        {index !== 0 && (
          <span className="absolute -bottom-2 left-0 right-0 h-3 bg-orange-100/90 rounded-full -z-10 blur-[3px]"></span>
        )}
      </motion.span>
    ))}
  </motion.h1>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.8 }}
    className="text-lg md:text-2xl text-gray-700 max-w-2xl mb-6 font-light drop-shadow"
  >
    <span className="inline-block bg-white/85 px-5 py-3 rounded-2xl shadow-md border border-orange-100/80 backdrop-blur-md">
      {heroSubtitle}
    </span>
  </motion.p>

  {/* Additional Description */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.0 }}
    className="text-md md:text-lg text-gray-600 max-w-3xl mb-12 font-normal leading-relaxed"
  >
    Discover amazing events happening around you and stay updated with our latest gatherings. 
    <span className="text-orange-500 font-semibold"> Join now</span> to explore exciting opportunities.
  </motion.p>

  {/* CTA Button */}

</div>

          {/* Keyframes */}
          <style jsx>{`
            @keyframes float1 {
              0%, 100% { transform: translateY(0) scale(1);}
              50% { transform: translateY(-30px) scale(1.08);}
            }
            @keyframes float2 {
              0%, 100% { transform: translateY(0) scale(1);}
              50% { transform: translateY(40px) scale(0.97);}
            }
            @keyframes float3 {
              0%, 100% { transform: translateY(0) scale(1);}
              50% { transform: translateY(-20px) scale(1.12);}
            }
          `}</style>
        </section>
      )}



      {/* Events Section */}
      <section className="w-full px-4 md:px-8 max-w-6xl mx-auto">
<div className="relative text-center mb-20">
  {/* Subtle background accent */}
  <div className="absolute inset-0 -z-10 flex items-center justify-center">
    <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-orange-200 via-pink-200 to-yellow-200 opacity-30 blur-3xl"></div>
  </div>

  {/* Title */}
  <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
    {showAll ? (
      <>
     
      </>
    ) : (
      <>
         Our <span className="text-orange-500">Events</span>
      </>
    )}
  </h2>




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
