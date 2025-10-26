'use client';

import { useMemo } from "react";

import EventsSection from "./../components/event/eventCard";
import IslamicHeader from "../components/IslamicHeader";

import PageSkeleton from "@/components/loading/PageSkeleton";
import PaginationControls from "@/components/PaginationControls";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import { EventsApi } from "@/lib/api";
import type { Event } from "@/lib/types";

export default function EventsPage() {
  const {
    items,
    isLoadingInitial,
    isFetchingMore,
    error,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    reload,
    page,
    totalPages,
  } = usePaginatedResource<Event>((params) => EventsApi.getAll(params), {
    pageSize: 12,
  });

  const events = useMemo(() => {
    const deduped = new Map<number, Event>();
    items.forEach((event) => {
      if (event && typeof event.id === "number") {
        deduped.set(event.id, event);
      }
    });
    return Array.from(deduped.values());
  }, [items]);

  return (
    <main className="w-full min-h-screen">
      <IslamicHeader pageType="events" title="Islamic Events" />
      <div className="pb-16">
        {isLoadingInitial ? (
          <PageSkeleton type="events" showFilters={false} cardCount={6} />
        ) : error ? (
          <div className="max-w-3xl mx-auto text-center bg-red-50 border border-red-100 rounded-3xl p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">
              Unable to load events
            </h2>
            <p className="text-red-600 mb-6">
              {error}. Please try refreshing the page.
            </p>
            <button
              onClick={() => void reload()}
              className="inline-flex items-center rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Retry loading events
            </button>
          </div>
        ) : (
          <EventsSection events={events} showAll={true} />
        )}

        {!isLoadingInitial && !error && events.length > 0 && (
          <PaginationControls
            className="mt-12"
            page={page}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPreviousPage}
            onPageChange={(target) => void goToPage(target)}
            isBusy={isFetchingMore}
          />
        )}
      </div>
    </main>
  );
}
