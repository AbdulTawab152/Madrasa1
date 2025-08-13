// app/authors/page.tsx
import Image from 'next/image';
import Link from "next/link";

interface Author {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  grandfather_name: string;
  full_address: string;
  dob: string;
  image?: string | null;
  bio: string;
  is_published: boolean;
  contact_no?: string | null;
  is_alive: boolean;
}

async function fetchAuthorsData(): Promise<Author[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/authors";
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("خطا در دریافت اطلاعات نویسندگان");

  return res.json(); // مستقیم JSON رو می‌گیریم
}

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
              src={author.image || "https://via.placeholder.com/300x200"}
              alt={`${author.first_name} ${author.last_name}`}
              className="w-full h-48 object-cover rounded"
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
