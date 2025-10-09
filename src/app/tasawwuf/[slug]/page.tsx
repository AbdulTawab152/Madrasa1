import { notFound } from "next/navigation";
import Image from "next/image";
import { TasawwufApi } from "@/lib/api";
import { buildStorageUrl } from "@/lib/utils";
import { cleanText } from "@/lib/textUtils";

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

const buildImageUrl = (path?: string | null) => buildStorageUrl(path) ?? undefined;

async function getPost(slug: string): Promise<Tasawwuf | null> {
  try {
    const result = await TasawwufApi.getBySlug(slug);
    if (!result.success) {
      return null;
    }

    return (result.data as Tasawwuf | null) ?? null;
  } catch {
    return null;
  }
}

export default async function TasawwufSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <main className="py-16 mt-20">
      <div className="max-w-3xl  mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{cleanText(post.title)}</h1>

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
              src={buildImageUrl(post.image) || "/placeholder-tasawwuf.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <article className="prose max-w-none text-gray-700 leading-relaxed">
          {cleanText(post.description)}
        </article>

        {/* Footer */}
        <div className="mt-10 border-t pt-6 flex justify-between text-sm text-gray-600">
          <span>Shared by: {cleanText(post.shared_by || "Unknown")}</span>
          <span>📿 Tasawwuf</span>
        </div>
      </div>
    </main>
  );
}
