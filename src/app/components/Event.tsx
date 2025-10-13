import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
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

const events: Event[] = [
  {
    id: "1",
    title: "International Islamic Conference 2025",
    slug: "international-islamic-conference-2025",
    description:
      "Join scholars and community leaders from around the world for inspiring talks and networking opportunities.",
    date: "August 25, 2025",
    duration: "3 days",
    live_link: "https://facebook.com/events/12345",
    live_link_type: "facebook",
    status: "coming",
    is_published: true,
    image: "/assets/scholar-teaching.jpg",
    location: "Dubai, UAE",
  },
  {
    id: "2",
    title: "Ramadan Preparation Workshop",
    slug: "ramadan-preparation-workshop",
    description:
      "Learn practical tips and spiritual insights to maximize your Ramadan experience this year.",
    date: "September 10, 2025",
    duration: "1 day",
    live_link: "https://youtube.com/watch?v=abcdef",
    live_link_type: "youtube",
    status: "coming",
    is_published: true,
    image: "/assets/scholar-teaching.jpg",
    location: "Online",
  },
  {
    id: "3",
    title: "Quran Recitation Competition",
    slug: "quran-recitation-competition",
    description:
      "Witness beautiful Quran recitations by talented youth from multiple countries.",
    date: "October 5, 2025",
    duration: "2 days",
    live_link: "",
    live_link_type: "",
    status: "coming",
    is_published: false,
    image: "/assets/scholar-teaching.jpg",
    location: "Riyadh, Saudi Arabia",
  },
  {
    id: "4",
    title: "Islamic Art Exhibition",
    slug: "islamic-art-exhibition",
    description:
      "Explore stunning Islamic art pieces and learn about their cultural significance.",
    date: "November 15, 2025",
    duration: "5 days",
    live_link: "",
    live_link_type: "",
    status: "coming",
    is_published: true,
    image: "/assets/scholar-teaching.jpg",
    location: "Cairo, Egypt",
  },
    {
    id: "5",
    title: "Islamic Art Exhibition",
    slug: "islamic-art-exhibition",
    description:
      "Explore stunning Islamic art pieces and learn about their cultural significance.",
    date: "November 15, 2025",
    duration: "5 days",
    live_link: "",
    live_link_type: "",
    status: "coming",
    is_published: true,
    image: "/assets/scholar-teaching.jpg",
    location: "Cairo, Egypt",
  },
    {
    id: "6",
    title: "Islamic Art Exhibition",
    slug: "islamic-art-exhibition",
    description:
      "Explore stunning Islamic art pieces and learn about their cultural significance.",
    date: "November 15, 2025",
    duration: "5 days",
    live_link: "",
    live_link_type: "",
    status: "coming",
    is_published: true,
    image: "/assets/scholar-teaching.jpg",
    location: "Cairo, Egypt",
  },
];

interface EventSectionProps {
  limit?: number;
}

export default function EventSection({ limit = events.length }: EventSectionProps) {
  const displayedEvents = events.slice(0, limit);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Upcoming Experiences
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Dive into enriching events designed to inspire, connect, and elevate your journey.
          </p>
        </div>

        <div className="space-y-20 max-w-6xl mx-auto">
          {displayedEvents.map((event, index) => (
            <div
              key={event.id}
              className={`flex flex-col border md:flex-row items-center gap-10 p-8 bg-white rounded-3xl hover:shadow-sm transition-shadow duration-500 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Container */}
              <div className="relative w-full md:w-1/2 h-80 rounded-2xl overflow-hidden shadow-md transform transition-transform duration-500 hover:scale-105">
                  <Image
                    src={event.image || "/placeholder-event.jpg"}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-2xl"
                    priority={index === 0}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-blue-600">
                  {event.title}
                </h3>

                <div className="flex items-center text-gray-500 mb-3 space-x-6">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="text-blue-600" size={20} />
                    <time className="font-medium">{event.date}</time>
                  </div>

                  {event.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-blue-600" size={20} />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 text-lg mb-6 line-clamp-4">{event.description}</p>

                <Link href={event.slug ? `/events/${event.slug}` : "#"} passHref>
                  <Button
                    size="lg"
                    aria-label={`Learn more about ${event.title}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-md transition-transform duration-300 transform hover:-translate-y-0.5"
                  >
                    View live
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {events.length > limit && (
          <div className="text-center mt-12">
            <Link href="/events" passHref>
              <Button
                size="lg"
                aria-label="See more events"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-full shadow-md transition-colors duration-300"
              >
                See More Events
              </Button>
            </Link>
          </div>
        )}
        </div>
      </section>
  );
}
