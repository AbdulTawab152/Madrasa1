"use client";
import Link from "next/link";

import Image from "next/image";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import RTLArrowIcon from "@/components/RTLArrowIcon";
import { getImageUrl } from "../../../lib/utils";
import { motion } from "framer-motion";
import { Event } from "../../../lib/types";
import { FaSearchLocation, FaTimes } from "react-icons/fa";
import { FaBuildingCircleExclamation, FaClock, FaTimeline } from "react-icons/fa6";
import { useTranslation } from "@/hooks/useTranslation";
import { getLanguageDirection } from "@/lib/i18n";

interface EventsSectionProps {
  events: Event[];
  showAll?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
}

const fallbackEventImage = "/placeholder-event.jpg";

const stripHtml = (value?: string | null) => {
  if (!value) return "";
  
  let cleaned = value;
  
  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, " ");
  
  // Remove HTML entities including &nbsp;
  cleaned = cleaned.replace(/&nbsp;/g, " ");
  cleaned = cleaned.replace(/&amp;/g, "&");
  cleaned = cleaned.replace(/&lt;/g, "<");
  cleaned = cleaned.replace(/&gt;/g, ">");
  cleaned = cleaned.replace(/&quot;/g, '"');
  cleaned = cleaned.replace(/&#39;/g, "'");
  cleaned = cleaned.replace(/&apos;/g, "'");
  cleaned = cleaned.replace(/&mdash;/g, "—");
  cleaned = cleaned.replace(/&ndash;/g, "–");
  cleaned = cleaned.replace(/&hellip;/g, "...");
  cleaned = cleaned.replace(/&[#\w]+;/g, " "); // Remove any remaining entities
  
  // Clean up whitespace
  cleaned = cleaned.replace(/\s+/g, " ");
  cleaned = cleaned.trim();
  
  return cleaned;
};

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
  const { t: tRaw, i18n } = useTranslation('common', { useSuspense: false });
  const isRTL = getLanguageDirection(i18n?.language || 'ps') === 'rtl';
  
  // Create a string-safe wrapper function
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };
  
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
    

      {/* Events Section */}
      <section className="w-full  md:px-8 md:pt-10 max-w-7xl mx-auto">
        <div className="relative text-center mb-10">
          {/* Subtle background accent */}
       

          {/* Title */}
          {showAll ? (
            <></>
          ) : (
            <motion.div
              className="inline-block relative mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight ">
               
                <span className="relative mt-3 z-10">
                  <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-orange-600 bg-clip-text text-transparent  text-4xl md:text-6xl font-black tracking-tight">
                    {t('events.events')}
                  </span>
                </span>
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                {t('events.description')}
              </p>
            </motion.div>
          )}
        </div>

        <div className="relative">
          <div className="absolute -left-4 md:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-orange-200 to-orange-100 rounded-full" />

          {displayEvents.map((event, idx) => {
            const coverImage =
              getImageUrl(event.image, fallbackEventImage) ?? fallbackEventImage;
            const eventDate = formatEventDate(event.created_at);
            const location = stripHtml(
              event.address || event.branch_name || event.country || t('events.locationComingSoon')
            );

            const liveLabel = (() => {
              switch (event.live_link_type) {
                case "facebook":
                  return t('events.facebookLive');
                case "youtube":
                  return t('events.youtubeLive');
                case "zoom":
                  return t('events.zoomMeeting');
                default:
                  return t('events.joinLive');
              }
            })();

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15 }}
                className="group relative mb-12 pl-4 md:pl-24"
              >
                <div className="pointer-events-none absolute -left-4 md:left-6 top-5 h-5 w-5 rounded-full border-4 border-white bg-primary-500" />
                {idx < displayEvents.length - 1 ? (
                  <span className="pointer-events-none absolute -left-4 md:left-6 top-12 bottom-[-4rem] w-1 bg-gradient-to-b from-primary-500 via-primary-300 to-primary-100" />
                ) : null}
                <div className="relative flex w-full flex-col overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 md:flex-row group/card">

                    {/* Image Section */}
                    <div className="aspect-[4/3] w-full md:w-1/2 relative overflow-hidden bg-gray-100">
                      <Image
                        src={coverImage}
                        alt={event.title || 'Event image'}
                        fill
                        sizes="(min-width: 1280px) 480px, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-primary-700 shadow-lg border border-primary-100">
                          {t('events.communityEvent')}
                        </span>
                      </div>
                      {event.branch_name ? (
                        <div className="absolute bottom-4 right-4 z-10">
                          <span className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                            {stripHtml(event.branch_name)}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {/* Content Section */}
                    <div className="w-full flex flex-col gap-6 p-6 md:w-1/2 md:p-8">
                      {/* Header Section */}
                      <div className="space-y-4 flex-1">
                        {/* Date Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 text-xs font-semibold uppercase tracking-wider text-primary-700 w-fit shadow-sm">
                          <Calendar className="h-3.5 w-3.5 text-primary-600" />
                          <span>{eventDate}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 tracking-tight group-hover/card:text-primary-700 transition-colors">
                          {stripHtml(event.title)}
                        </h3>

                        {/* Description */}
                        <p className="text-sm md:text-base leading-relaxed text-gray-600 line-clamp-4">
                          {stripHtml(event.description)}
                        </p>
                      </div>

                      {/* Event Details Grid */}
                      <div className="grid gap-3 text-sm md:grid-cols-2 border-t border-gray-200 pt-5">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 transition-all duration-200">
                          <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm">
                            <MapPin className="h-4 w-4 text-primary-600" />
                          </div>
                          <span className="font-medium text-gray-800 line-clamp-1">{location}</span>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 transition-all duration-200">
                          <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm">
                            <Clock className="h-4 w-4 text-primary-600" />
                          </div>
                          <span className="font-medium text-gray-800">{stripHtml(event.duration) || t('events.flexible')}</span>
                        </div>

                        {event.contact ? (
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 transition-all duration-200 md:col-span-2">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm">
                              <Users className="h-4 w-4 text-primary-600" />
                            </div>
                            <span className="font-medium text-gray-800 line-clamp-1">{stripHtml(event.contact)}</span>
                          </div>
                        ) : null}

                        {/* {event.live_link ? (
                          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-all duration-200 md:col-span-2">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm">
                              <RTLArrowIcon className="h-4 w-4 text-primary-600" />
                            </div>
                            <span className="font-medium text-primary-700">{liveLabel}</span>
                          </div>
                        ) : null} */}
                      </div>

                      {/* Footer Section */}
                      <div className="mt-auto pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          {/* <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Users className="h-4 w-4 text-primary-500" />
                            <span>{t('events.organizedBy')}</span>
                          </div> */}

                          <div className="flex flex-col sm:flex-row flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            {event.live_link ? (
                              
                              <a
                                href={event.live_link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary-50 border border-primary-200 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-700 hover:bg-primary-100 hover:border-primary-300 hover:shadow-sm transition-all duration-200 flex-1 w-full sm:flex-initial sm:w-auto min-w-0"
                              >
                                 <RTLArrowIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span className="truncate">{t('events.joinLive')}</span>
                               
                              </a>
                            ) : null}

                            <Link
                              href={`/event/${event.slug}`}
                              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-primary-600 to-primary-700 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 hover:from-primary-700 hover:to-amber-500 transition-all duration-200 flex-1 w-full sm:flex-initial sm:w-auto min-w-0"
                            >
                                <RTLArrowIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                              <span className="truncate whitespace-nowrap">{t('events.eventDetails')}</span>
                            
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.div>
            );
          })}

        </div>
        {!showAll && sortedEvents.length > 3 && (
          <div className="mt-12 text-center">
            <Link
              href="/event"
              className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg border-2 border-amber-500"
            >
              <span>{t('events.viewAllEvents')}</span>
              <RTLArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
