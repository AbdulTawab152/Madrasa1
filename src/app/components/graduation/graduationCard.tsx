// app/components/graduation/GraduationCard.tsx
import Link from "next/link";
import Image from "next/image";

interface Graduation {
  id: number;
  slug: string;
  title: string;
  question?: string;
  description?: string;
  main_image?: string;
  date?: string;
  shared_by?: string;
  category_id?: string | number;
}

interface GraduationCardProps {
  graduation: Graduation;
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default function GraduationCard({ graduation }: GraduationCardProps) {
  return (
    <Link
      href={`/graduated-students/${graduation.slug || graduation.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="relative w-full h-48">
        <Image
          src={getImageUrl(graduation.main_image)}
          alt={graduation.title}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{graduation.title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">{graduation.question || graduation.description}</p>
        <div className="mt-3 text-sm text-gray-500">
          <p>Date: {graduation.date || 'N/A'}</p>
          <p>Shared by: {graduation.shared_by || 'N/A'}</p>
          <p>Category ID: {graduation.category_id || 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
}
