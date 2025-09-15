// app/events/page.tsx
import EventsSection from "./../components/event/eventCard";
import { EventsApi } from "../../lib/api";
import { Event } from "../../lib/types";

export default async function EventsPage() {
  // fetch تمام ایونت‌ها
  const res = await EventsApi.getAll();
  const events = Array.isArray(res.data) ? (res.data as Event[]) : [];

  return (
    <main className="w-full">
      <EventsSection events={events} showAll={true} />
    </main>
  );
}
