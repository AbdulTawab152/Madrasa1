"use client";
import Link from "next/link";

import Image from "next/image";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { getImageUrl } from "../../../lib/utils";
import { motion } from "framer-motion";
import { Event } from "../../../lib/types";
import { FaSearchLocation, FaTimes } from "react-icons/fa";
import { FaBuildingCircleExclamation, FaClock, FaTimeline } from "react-icons/fa6";
import { Card, CardBadge, CardContent, CardFooter, CardMedia } from "../Card";

interface EventsSectionProps {
  events: Event[];
  showAll?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
}

const fallbackEventImage = "/placeholder-event.jpg";

const stripHtml = (value?: string | null) =>
  (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatEventDate = (value?: string | null) => {
  if (!value) return "Recently updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

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
      <section className="w-full px-4 md:px-8 md:pt-10 max-w-6xl mx-auto">
        <div className="relative text-center mb-10">
          {/* Subtle background accent */}
       

          {/* Title */}
          {showAll ? (
            <></>
          ) : (
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover Our{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Events
              </span>{" "}
            </motion.h2>
          )}
        </div>

        <div className="relative">
          <div className="absolute -left-4 md:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-200 to-orange-100 rounded-full" />

          {displayEvents.map((event, idx) => {
            const coverImage =
              getImageUrl(event.image, fallbackEventImage) ?? fallbackEventImage;
            const eventDate = formatEventDate(event.created_at);
            const location =
              event.address || event.branch_name || event.country || "Location coming soon";

            const liveLabel = (() => {
              switch (event.live_link_type) {
                case "facebook":
                  return "Facebook Live";
                case "youtube":
                  return "YouTube Live";
                case "zoom":
                  return "Zoom Meeting";
                default:
                  return "Join live";
              }
            })();

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative mb-12 pl-4 md:pl-24"
              >
                <div className="pointer-events-none absolute -left-4 md:left-6 top-5 h-5 w-5 rounded-full border-4 border-white bg-primary-500 shadow-lg transition-transform duration-300 group-hover:scale-110" />
                {idx < displayEvents.length - 1 ? (
                  <span className="pointer-events-none absolute -left-4 md:left-6 top-12 bottom-[-4rem] w-1 bg-gradient-to-b from-primary-500 via-primary-300 to-primary-100" />
                ) : null}

                <Card className="relative flex w-full flex-col overflow-hidden bg-white/95 backdrop-blur md:flex-row">
                  <CardMedia className="aspect-[4/3] w-full rounded-none border-0 md:w-1/2 md:aspect-[4/3]">
                    <Image
                      src={coverImage}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1280px) 480px, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <CardBadge className="absolute top-4 left-4 bg-white/90 text-primary-700">
                      Community Event
                    </CardBadge>
                    {event.branch_name ? (
                      <CardBadge className="absolute bottom-4 right-4 bg-primary-600 text-white">
                        {event.branch_name}
                      </CardBadge>
                    ) : null}
                  </CardMedia>

                  <CardContent className="w-full gap-6 p-6 md:w-1/2">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
                        <Calendar className="h-4 w-4 text-primary-500" />
                        <span>{eventDate}</span>
                      </div>

                      <h3 className="text-2xl font-semibold leading-tight text-primary-900 transition-colors duration-300 group-hover:text-primary-600">
                        {event.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-primary-600 line-clamp-4">
                        {stripHtml(event.description)}
                      </p>
                    </div>

                    <div className="grid gap-3 text-sm text-primary-700 md:grid-cols-2">
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary-500" />
                        <span className="line-clamp-1">{location}</span>
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary-500" />
                        <span>{event.duration || "Flexible"}</span>
                      </span>

                      {event.contact ? (
                        <span className="inline-flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary-500" />
                          <span className="line-clamp-1">{event.contact}</span>
                        </span>
                      ) : null}

                      {event.live_link ? (
                        <span className="inline-flex items-center gap-2 text-primary-600">
                          <ArrowRight className="h-4 w-4" />
                          <span>{liveLabel}</span>
                        </span>
                      ) : null}
                    </div>

                    <CardFooter>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-700">
                        <Users className="h-4 w-4 text-primary-500" />
                        Organized by Haq Madrasa
                      </span>

                      <div className="flex flex-wrap items-center gap-2">
                        {event.live_link ? (
                          <a
                            href={event.live_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors duration-200 hover:bg-primary-100"
                          >
                            Join live
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        ) : null}

                        <Link
                          href={`/event/${event.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-700"
                        >
                          Event details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardFooter>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

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
