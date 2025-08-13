import Image from 'next/image';
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

interface AuthorPageProps {
  params: {
    id: string;
  };
}

async function fetchAuthor(id: string): Promise<Author> {
  const API_URL = `https://lawngreen-dragonfly-304220.hostingersite.com/api/authors/${id}`;
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Author not found");
  }

  const data = await res.json();
  return data;
}

export default async function AuthorDetailPage({ params }: AuthorPageProps) {
  const author = await fetchAuthor(params.id);

  return (
    <main className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-4xl font-bold mb-6">
        {author.first_name} {author.last_name}
      </h1>

      {author.image ? (
        <Image
          src={author.image}
          alt={`${author.first_name} ${author.last_name}`}
          className="w-64 h-64 object-cover rounded-lg mb-6"
        />
      ) : (
        <div className="w-64 h-64 bg-gray-300 flex items-center justify-center rounded-lg mb-6">
          No Image
        </div>
      )}

      <p className="text-gray-700 leading-relaxed mb-4">{author.bio}</p>

      <div className="text-gray-600 text-sm space-y-2">
        <p>
          <strong>Father's Name:</strong> {author.father_name}
        </p>
        <p>
          <strong>Grandfather's Name:</strong> {author.grandfather_name}
        </p>
        <p>
          <strong>Date of Birth:</strong> {author.dob}
        </p>
        <p>
          <strong>Address:</strong> {author.full_address}
        </p>
        <p>
          <strong>Contact No:</strong> {author.contact_no || "N/A"}
        </p>
        <p>
          <strong>Is Alive:</strong> {author.is_alive ? "Yes" : "No"}
        </p>
        <p>
          <strong>Published:</strong> {author.is_published ? "Yes" : "No"}
        </p>
      </div>
    </main>
  );
}
