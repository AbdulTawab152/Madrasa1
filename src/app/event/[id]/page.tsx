// app/event/[id]/page.tsx
import React from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

async function fetchEventDetail(id: string): Promise<Event> {
  const API_URL = `https://lawngreen-dragonfly-304220.hostingersite.com/api/event/${id}`;
  const res = await fetch(API_URL);

  if (!res.ok) {
    console.error("Failed to fetch event detail for ID:", id, res.status);
    throw new Error("Failed to fetch event detail");
  }

  return res.json();
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await fetchEventDetail(id);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      {event.image && (
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
      )}
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-500 text-sm">Date: {new Date(event.date).toLocaleDateString("fa-IR")}</p>
    </main>
  );
}
