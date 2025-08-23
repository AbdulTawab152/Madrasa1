// app/events/page.tsx
import EventsSection from "./../components/event/eventCard"; // مسیر درست کامپوننت را بزنید
import { EventsApi } from "../../lib/api"; // مسیر درست API

interface Event {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_featured: boolean;
  category_id: number;
  location?: string;
  organizer?: string;
  attendees?: string;
  duration?: string;
}

export default async function EventsPage() {
  // fetch تمام ایونت‌ها
  const res = await EventsApi.getAll();
  const events = Array.isArray(res.data) ? (res.data as Event[]) : [];

  return (
    <main className="max-w-6xl mt-32 mx-auto p-8">
  
      <EventsSection events={events} showAll={true} />
    </main>
  );
}
