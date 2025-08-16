"use client"; // Needed if using client-side features like Link or Image

import Link from "next/link";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  link: string;
  date?: string;
}

export default function Card({ title, description, image, link, date }: CardProps) {
  // Handle relative image URLs from API
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${image}`
    : "https://via.placeholder.com/300x400"; // fallback

  return (
    <Link
      href={link}
      className="block group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={400}
          className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-80 transition"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        {date && <p className="text-gray-500 text-sm mb-2">{date}</p>}
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}
