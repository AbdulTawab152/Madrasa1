import { getImageUrl } from "@/lib/utils";

const API = "https://lawngreen-dragonfly-304220.hostingersite.com/api/graduations";

async function getGraduation(slug: string) {
  const res = await fetch(`${API}/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return await res.json();
}

export default async function GraduationDetailPage({ params }: { params: { slug: string } }) {
  const graduation = await getGraduation(params.slug);
  if (!graduation) return <div className="p-10 text-center text-gray-700 font-medium">Graduation not found</div>;

  return (
    <main className="mx-auto mt-32 max-w-7xl px-6 py-12">
      {/* Graduation Header */}
<div className="relative mb-16">
  {/* Hero Image with Gradient Overlay */}
  {graduation.main_image && (
    <div className="relative h-96 md:h-[28rem] w-full overflow-hidden rounded-3xl shadow-2xl">
      <img
        src={getImageUrl(graduation.main_image) || ""}
        alt={graduation.title}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl"></div>
    </div>
  )}

  {/* Content Overlay */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6 sm:px-12">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white relative inline-block">
      {graduation.title}
      <span className="block h-1 w-20 bg-gradient-to-r from-green-400 to-blue-500 mt-2 rounded-full animate-pulse"></span>
    </h1>
    <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg">
      {graduation.description}
    </p>

    {/* Date & Time Badges */}
    <div className="mt-6 flex flex-wrap justify-center gap-4">
      <span className="flex items-center gap-2 text-sm bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm shadow hover:bg-white/30 transition">
        📅 {new Date(graduation.date).toLocaleDateString()}
      </span>
      <span className="flex items-center gap-2 text-sm bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm shadow hover:bg-white/30 transition">
        ⏰ {new Date(graduation.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(graduation.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  </div>
</div>



      {/* Graduated Students Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎓 Graduated Students</h2>
        {graduation.graduated_students?.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {graduation.graduated_students.map((s: any) => (
              <div
                key={s.id}
                className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col items-center text-center"
              >
                {s.image && (
                  <img
                    src={getImageUrl(s.image) || ""}
                    alt={s.first_name}
                    className="h-36 w-36 object-cover rounded-full border-4 border-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {s.first_name} {s.last_name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{s.father_name} - {s.grandfather_name}</p>
                <p className="text-sm text-gray-400 mt-1">{s.full_address}</p>
                <p className="text-xs text-gray-500 mt-2">{s.description}</p>
                <p className="mt-3 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                  {s.graduation_type?.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No students listed for this graduation.</p>
        )}
      </section>
    </main>
  );
}
