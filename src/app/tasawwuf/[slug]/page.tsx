import { notFound } from "next/navigation";
import Image from "next/image";

interface Tasawwuf {
  id: number;
  title: string;
  slug: string;
  description: string;
  image?: string;
  shared_by?: string;
  created_at?: string;
  category?: { id: number; name: string };
}

async function getPost(slug: string): Promise<Tasawwuf | null> {
  try {
    const res = await fetch(
      `https://lawngreen-dragonfly-304220.hostingersite.com/api/tasawwuf/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json;
  } catch {
    return null;
  }
}

export default async function TasawwufSinglePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <main className="py-16 mt-20">
      <div className="max-w-3xl  mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <span>{post.category?.name || "Uncategorized"}</span>
          {post.created_at && (
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          )}
        </div>

        {/* Image */}
        {post.image && (
          <div className="relative w-full h-80 mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https://lawngreen-dragonfly-304220.hostingersite.com/storage/${post.image}`}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <article className="prose max-w-none text-gray-700 leading-relaxed">
          {post.description .replace(/<[^>]*>/g, "")}
        </article>

        {/* Footer */}
        <div className="mt-10 border-t pt-6 flex justify-between text-sm text-gray-600">
          <span>Shared by: {post.shared_by || "Unknown"}</span>
          <span>📿 Tasawwuf</span>
        </div>
      </div>
    </main>
  );
}
