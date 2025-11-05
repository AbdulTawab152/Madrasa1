"use client";
import { useEffect, useState } from "react";
import Event from "./event/eventCard";
import { Event as EventType } from "../../lib/types";
import { EventsApi } from "../../lib/api";
import { ComingSoonEmptyState } from "@/components/EmptyState";
import UnifiedLoader from "@/components/loading/UnifiedLoader";

export default function LazyEventSection() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await EventsApi.getAll();
        if (res.success) {
          setEvents(Array.isArray(res.data) ? res.data : []);
        } else {
          console.warn("API unavailable, using fallback data:", res.message);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return <UnifiedLoader variant="grid" count={3} className="pt-0" />;
  }

  if (events.length === 0) {
    return (
      <ComingSoonEmptyState
        title="No Events Available"
        description="We're working on bringing you exciting events. Check back soon!"
        className="max-w-2xl mx-auto"
      />
    );
  }

  return <Event events={events} showAll={false} />;
}
