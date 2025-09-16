"use client";
import Link from "next/link";

import Image from "next/image";
import { Calendar, MapPin, User, Clock, Users, ArrowRight } from "lucide-react";
import { getImageUrl } from "../../../lib/utils";
import { motion } from "framer-motion";
import { Event } from "../../../lib/types";

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
      ?.filter((event) => event.created_at)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ) || [];

  // Show only 3 events on homepage
  const displayEvents = showAll ? sortedEvents : sortedEvents.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section only shows on event page */}
      {showAll && (
        <section className="relative mt-20 w-full overflow-hidden">
          {/* Multi-layered Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Enhanced multi-layered gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50" />
            {/* Subtle SVG pattern overlay for extra texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.08'%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3C/g%3E%3Cg fill='%23f472b6' fill-opacity='0.06'%3E%3Crect x='10' y='10' width='20' height='20' rx='5'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
                backgroundRepeat: "repeat",
              }}
            />
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-r from-orange-200/40 via-pink-100/30 to-pink-200/40 rounded-full blur-3xl shadow-2xl"
              animate={{
                x: [0, 140, 0],
                y: [0, -80, 0],
                scale: [1, 1.35, 1],
                rotate: [0, 15, 0],
              }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-16 right-16 w-[28rem] h-[28rem] bg-gradient-to-r from-pink-200/30 via-orange-100/30 to-orange-200/30 rounded-full blur-3xl shadow-xl"
              animate={{
                x: [0, -120, 0],
                y: [0, 100, 0],
                scale: [1, 0.95, 1],
                rotate: [0, -10, 0],
              }}
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Extra animated orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-orange-100/60 to-pink-100/60 rounded-full blur-2xl"
              style={{ translate: "-50% -50%" }}
              animate={{
                x: [0, 40, -40, 0],
                y: [0, -30, 30, 0],
                scale: [1, 1.1, 0.95, 1],
                opacity: [0.7, 1, 0.8, 0.7],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Accent dots */}
            <motion.div
              className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-400/70 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400/80 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.1 }}
            />
            <motion.div
              className="absolute top-2/3 left-1/4 w-2 h-2 bg-orange-300/80 rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 2.1 }}
            />
            {/* Animated star */}
            <motion.div
              className="absolute top-1/2 right-1/4 text-yellow-400"
              style={{ fontSize: "1.25rem" }}
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8" />
              </svg>
            </motion.div>
          </div>

          <div className="relative z-10 py-24 md:py-24 px-6 flex flex-col items-center text-center">
            <motion.div
              className="inline-flex items-center gap-3 mb-8 px- py-3 bg-white/80 backdrop-blur-md border border-orange-200/50 text-orange-600 text-sm font-medium rounded-full shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              </motion.div>
              <span>Our Event</span>
              <motion.div
                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Events
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-200/50 to-pink-200/50 rounded-full -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <br className="hidden md:block" />
              That{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Connect
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-300/60 to-orange-300/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join us for inspiring gatherings that bring people together.
              Discover meaningful experiences, celebrate community, and create
              lasting memories at our events.
            </motion.p>
          </div>
        </section>
      )}

      {/* Events Section */}
      <section className="w-full px-4 md:px-8 max-w-6xl mx-auto">
        <div className="relative text-center mb-10">
          {/* Subtle background accent */}
          {/* <div className="absolute inset-0 -z-10 flex items-center justify-center">
    <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-orange-200 via-pink-200 to-yellow-200 opacity-30 blur-3xl"></div>
  </div> */}

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {showAll ? (
              <></>
            ) : (
              <>
                Our <span className="text-orange-500">Events</span>
              </>
            )}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute -left-4 md:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-200 to-orange-100 rounded-full" />

          {displayEvents.map((event, idx) => (
            <Link key={event.id} href={`/event/${event.slug}`}>
              <div className="group flex flex-col md:flex-row items-start mb-12 relative pl-4 md:pl-24">
                <div className="absolute -left-4 md:left-6 top-5 w-5 h-5 rounded-full bg-white border-4 border-orange-500 transition-transform duration-300 group-hover:scale-125 group-hover:" />
                {idx < displayEvents.length - 1 && (
                  <span className="absolute -left-4 md:left-6 top-12 bottom-[-4rem] w-1 bg-gradient-to-b from-orange-400 via-orange-200 to-orange-100 rounded-full" />
                )}

                <div className="flex-1 bg-white rounded-xl   overflow-hidden transition-all duration-300 flex flex-col md:flex-row">
                  {event.image && (
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <Image
                        src={
                          getImageUrl(event.image) || "/placeholder-event.jpg"
                        }
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

                  <div className={`p-6 ${event.image ? "md:w-2/3" : "w-full"}`}>
                    <div className="flex items-center gap-3 mb-3 flex-wrap text-sm text-gray-500">
                      <Calendar size={18} className="text-orange-400" />
                      {new Date(event.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-3">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                      {event.description.replace(/<[^>]*>/g, "")}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-orange-400" />
                        <span>{event.address || "Location TBD"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} className="text-orange-400" />
                        <span>{event.branch_name || "Main Branch"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!showAll && sortedEvents.length > 3 && (
          <div className="mt-12 text-center">
            <Link
              href="/event"
              className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm hover:shadow-md"
            >
              <span>View All Events</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
