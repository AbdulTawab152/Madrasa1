import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

const API = "https://lawngreen-dragonfly-304220.hostingersite.com/api/graduations";

async function getGraduations() {
  const res = await fetch(API, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return await res.json();
}

export default async function TopGraduations() {
  const graduations = await getGraduations();
  const topGraduations = graduations.filter((g: any) => g.is_top);

  if (topGraduations.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">🎓 Featured Graduations</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topGraduations.map((g: any) => (
          <Link
            key={g.id}
            href={`/graduations/${g.slug}`}
            className="rounded-2xl border bg-white shadow hover:shadow-lg p-4"
          >
            {g.main_image && (
              <img
                src={getImageUrl(g.main_image) || ""}
                alt={g.title}
                className="h-40 w-full object-cover rounded-xl"
              />
            )}
            <h3 className="mt-3 text-lg font-semibold">{g.title}</h3>
            <p className="text-sm text-gray-500">{g.graduation_year}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
