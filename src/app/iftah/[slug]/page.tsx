// app/iftah/[slug]/page.tsx
import { IftahApi } from "../../../lib/api";
import Link from "next/link";

interface Author {
  name: string;
  bio?: string;
}

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  references?: string[];
  isPublished?: boolean;
  viewCount?: number;
  is_published?: boolean;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function IftahDetailsPage({ params }: Params) {
  const { slug } = await params;

  // گرفتن جزئیات افتاح مورد نظر از API
  const res = await IftahApi.getAll();
  const iftahItems = Array.isArray(res.data) ? (res.data as Iftah[]) : [];
  const iftah: Iftah | undefined = iftahItems.find(f => f.slug === slug);

  if (!iftah) {
    return <p className="text-center mt-20 text-xl">Iftah not found!</p>;
  }

  return (
    <main className="max-w-4xl mt-32 mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{iftah.title}</h1>

      <div className="mb-6 text-gray-700">
        <h2 className="text-2xl font-semibold mb-2">Question:</h2>
        <p className="mb-4">{iftah.question}</p>

        <h2 className="text-2xl font-semibold mb-2">Answer:</h2>
        <p>{iftah.answer}</p>
      </div>

      <div className="flex flex-col gap-2 text-gray-700 mb-6 text-sm">
        <span>🕌 Mufti: {iftah.mufti?.name || "Unknown"}</span>
        <span>📂 Category: {iftah.category || "General"}</span>
        <span>🏷️ Tags: {iftah.tags?.join(", ") || "None"}</span>
        <span>📖 References: {iftah.references?.join(", ") || "None"}</span>
        <span>👁️ Views: {iftah.viewCount || 0}</span>
        <span>Status: {iftah.is_published ? "Published" : "Draft"}</span>
      </div>

      <Link
        href="/iftah"
        className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
      >
        Back to Iftah
      </Link>
    </main>
  );
}
