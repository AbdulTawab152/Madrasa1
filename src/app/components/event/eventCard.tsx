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
      <section className="w-full px-4 md:px-8 md:pt-10 max-w-6xl mx-auto">
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
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight ">
                <span className="relative z-10">
                  <span className="px-2 py-1 rounded-lg">
                    {t('events.discoverOur')}
                  </span>
                </span>
                <span className="relative mt-3 z-10">
                  <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-orange-600 bg-clip-text text-transparent  text-4xl md:text-6xl font-black tracking-tight">
                    {t('events.events')}
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -z-10 w-40 h-10 bg-orange-100 rounded-full blur-2xl opacity-60"></span>
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
            const location =
              event.address || event.branch_name || event.country || t('events.locationComingSoon');

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
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative mb-12 pl-4 md:pl-24"
              >
                <div className="pointer-events-none absolute -left-4 md:left-6 top-5 h-5 w-5 rounded-full border-4 border-white bg-primary-500" />
                {idx < displayEvents.length - 1 ? (
                  <span className="pointer-events-none absolute -left-4 md:left-6 top-12 bottom-[-4rem] w-1 bg-gradient-to-b from-primary-500 via-primary-300 to-primary-100" />
                ) : null}
                <div className="relative flex w-full flex-col overflow-hidden bg-white/95 backdrop-blur md:flex-row  shadow-none hover:shadow-none">

                    <div className="aspect-[4/3] w-full rounded-none border-0 md:w-1/2 md:aspect-[4/3] relative">
                      <Image
                        src={coverImage}
                        alt={event.title}
                        fill
                        sizes="(min-width: 1280px) 480px, (min-width: 768px) 50vw, 100vw"
                              className="h-full w-full object-cover"
                      />

                      <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm">
                        {t('events.communityEvent')}
                      </span>
                      {event.branch_name ? (
                        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                          {event.branch_name}
                        </span>
                      ) : null}
                    </div>

                    <div className="w-full gap-6 p-6 md:w-1/2">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
                          <Calendar className="h-4 w-4 text-primary-500" />
                          <span>{eventDate}</span>
                        </div>

                        <h3 className="text-2xl font-semibold leading-tight text-primary-900">
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
                          <span>{event.duration || t('events.flexible')}</span>
                        </span>

                        {event.contact ? (
                          <span className="inline-flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary-500" />
                            <span className="line-clamp-1">{event.contact}</span>
                          </span>
                        ) : null}

                        {event.live_link ? (
                          <span className="inline-flex items-center gap-2 text-primary-600">
                            <RTLArrowIcon className="h-4 w-4" />
                            <span>{liveLabel}</span>
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-primary-100/70 pt-4">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-700">
                          <Users className="h-4 w-4 text-primary-500" />
                          {t('events.organizedBy')}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          {event.live_link ? (
                            <a
                              href={event.live_link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600"
                            >
                              {t('events.joinLive')}
                              <RTLArrowIcon size="h-4 w-4" />
                            </a>
                          ) : null}

                          <Link
                            href={`/event/${event.slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-primary-600 to-primary-700 px-5 py-2 text-sm font-semibold text-white shadow-md hover:from-primary-700 hover:to-amber-500 hover:scale-105 transition-all duration-200 border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400"
                            style={{ minWidth: 0 }}
                          >
                            <span className="whitespace-nowrap">{t('events.eventDetails')}</span>
                            <RTLArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
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
