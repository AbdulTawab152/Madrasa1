'use client';

import { useMemo } from "react";

import EventsSection from "./../components/event/eventCard";
import IslamicHeader from "../components/IslamicHeader";

import UnifiedLoader from "@/components/loading/UnifiedLoader";
import PaginationControls from "@/components/PaginationControls";
import { usePaginatedResource } from "@/hooks/usePaginatedResource";
import { EventsApi } from "@/lib/api";
import type { Event } from "@/lib/types";
import ErrorDisplay from "@/components/ErrorDisplay";

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
      <IslamicHeader pageType="events" />
      <div className="pb-16">
        {isLoadingInitial ? (
          <UnifiedLoader variant="card-grid" count={6} showFilters={false} />
        ) : error ? (
          <ErrorDisplay 
            error={error} 
            variant="full" 
            onRetry={() => void reload()}
          />
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
