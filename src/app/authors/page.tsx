// app/authors/page.tsx
import Image from 'next/image';
import Link from "next/link";
import { fetchWithCache } from '../../lib/api';
import { endpoints } from '../../lib/config';
import { Author } from '../../lib/types';

async function fetchAuthorsData(): Promise<Author[]> {
  try {
    const data = await fetchWithCache<Author[]>(endpoints.authors);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

const getImageUrl = (img?: string | null) => {
  if (!img) return '/placeholder-author.jpg';
  if (img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function AuthorsPage() {
  const authors = await fetchAuthorsData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.id}`}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <Image
              src={getImageUrl(author.image)}
              alt={`${author.first_name} ${author.last_name}`}
              width={300}
              height={400}
              className="w-full h-48 object-cover rounded group-hover:opacity-80 transition"
            />
            <h2 className="mt-4 text-xl font-semibold">
              {author.first_name} {author.last_name}
            </h2>
            <p className="text-gray-600 mt-1 text-sm line-clamp-3">{author.bio}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
