import { getImageUrl } from "@/lib/utils";
import { motion } from "framer-motion";

const API = "https://lawngreen-dragonfly-304220.hostingersite.com/api/graduations";

async function getGraduation(slug: string) {
  const res = await fetch(`${API}/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return await res.json();
}

interface Graduation {
  id: number;
  title: string;
  slug: string;
  main_image?: string | null;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  status: string;
  is_published: boolean;
  graduation_year?: string | number;
  created_at: string;
  updated_at: string;
  graduated_students: any[];
}

export default async function GraduationDetailPage({ params }: { params: { slug: string } }) {
  const graduation = await getGraduation(params.slug);
  if (!graduation) return <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8"><div className="p-10 text-center text-gray-700 font-medium bg-white rounded-lg shadow-md">Graduation not found</div></div>;

  return (
    <main className="mx-auto mt-24 max-w-7xl px-4 font-sans">
      {/* Graduation Header */}
      <div className="relative mb-20">
  {/* Hero Image with Overlay */}
  {graduation.main_image && (
    <div className="relative h-[32rem] w-full overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/20">
      <img
        src={getImageUrl(graduation.main_image) || ""}
        alt={graduation.title}
        className="h-full w-full object-cover transition-transform duration-[4000ms] hover:scale-110"
      />
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 rounded-3xl"></div>
    </div>
  )}

  {/* Content Overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12">
    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-2xl animate-fade-in-up">
      {graduation.title}
      <span className="block h-1.5 w-28 bg-gradient-to-r from-orange-400 to-yellow-500 mt-4 rounded-full shadow-lg animate-pulse mx-auto"></span>
    </h1>

    <p className="mt-5 text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto drop-shadow-md opacity-90 animate-fade-in-up delay-200">
      {graduation.description}
    </p>

    {/* Date & Time Badges */}
    <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up delay-400">
      <span className="flex items-center gap-2 text-sm bg-white/15 text-white px-6 py-3 rounded-full backdrop-blur-md shadow-xl hover:bg-white/25 transition">
        <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">📅</span>
        {new Date(graduation.date).toLocaleDateString()}
      </span>
      <span className="flex items-center gap-2 text-sm bg-white/15 text-white px-6 py-3 rounded-full backdrop-blur-md shadow-xl hover:bg-white/25 transition">
        <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">⏰</span>
        {new Date(graduation.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
        {new Date(graduation.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
      {graduation.graduation_year && (
        <span className="flex items-center gap-2 text-sm bg-white/15 text-white px-6 py-3 rounded-full backdrop-blur-md shadow-xl hover:bg-white/25 transition">
          <span className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">🎓</span>
          {graduation.graduation_year}
        </span>
      )}
    </div>
  </div>
</div>




      {/* Graduated Students Section */}
      <section className="py-10">
        <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center relative">
          <span className="relative inline-block">
            🎓 Our Esteemed Graduated Students
            <span className="absolute inset-x-0 bottom-[-10px] h-1.5 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full w-1/3 mx-auto"></span>
          </span>
        </h2>
        {graduation.graduated_students?.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {graduation.graduated_students.map((s: any) => (
              <div
                key={s.id}
                className="group rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow- transition-all duration-300 p-7 flex flex-col items-center text-center transform hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-300"
              >
                {s.image && (
                  <img
                    src={getImageUrl(s.image) || ""}
                    alt={s.first_name}
                    className="h-32 w-32 object-cover rounded-full border-4 border-orange-200 shadow-md mb-6 transition-transform duration-300 group-hover:scale-110 "
                  />
                )}
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {s.first_name} {s.last_name}
                </h3>
                <p className="text-base text-gray-500 mt-1">{s.father_name} - {s.grandfather_name}</p>
                <p className="text-sm text-gray-400 mt-1">{s.full_address}</p>
                <p className="text-sm text-gray-500 mt-3 italic">{s.description}</p>
                <p className="mt-4 px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-sm font-medium shadow-sm">
                  {s.graduation_type?.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-8 text-lg text-center">No students listed for this graduation.</p>
        )}
      </section>
    </main>
  );
}
