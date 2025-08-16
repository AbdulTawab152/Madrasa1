// app/components/event/EventCard.tsx
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  duration?: string;
  live_link?: string;
  live_link_type?: "facebook" | "youtube" | "twitch" | string;
  status?: "past" | "coming";
  is_published: boolean;
  image: string;
  location?: string;
}

interface EventCardProps {
  event: Event;
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/event/${event.slug}`}
      className="block bg-white rounded shadow hover:shadow-lg transition overflow-hidden group"
    >
      <div className="relative w-full h-48">
        <Image
          src={getImageUrl(event.image)}
          alt={event.title}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{event.description}</p>
        {event.date && (
          <p className="text-gray-400 mt-1 text-sm">
            Date: {new Date(event.date).toLocaleDateString()}
          </p>
        )}
      </div>
    </Link>
  );
}
