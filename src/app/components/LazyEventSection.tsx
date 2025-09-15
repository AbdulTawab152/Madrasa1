"use client";
import { useEffect, useState } from "react";
import Event from "./event/eventCard";
import { Event as EventType } from "../../lib/types";
import { EventsApi } from "../../lib/api";

export default function LazyEventSection() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await EventsApi.getAll();
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-600 font-medium">Loading events...</span>
      </div>
    );
  }

  return <Event events={events} showAll={false} />;
}
