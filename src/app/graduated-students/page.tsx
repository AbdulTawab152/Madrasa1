// app/graduations/page.tsx
import Image from "next/image";
import Link from "next/link";
import { GraduationsApi } from "../../lib/api";
import { endpoints } from "../../lib/config";
import { FaStar } from "react-icons/fa";

// Graduation type
interface Graduation {
  id: number;
  title: string;
  slug: string;
  main_image?: string | null;
  graduation_year?: string | number;
  is_top?: boolean;
}

// Fetch graduations
async function fetchGraduationsData(): Promise<Graduation[]> {
  try {
    const response = await GraduationsApi.getAll(); // call the static method
    const data = response?.data; // assuming your apiClient returns { data: ... }
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching graduations:", error);
    return [];
  }
}

// Get image URL safely
const getImageUrl = (img?: string | null) => {
  if (!img) return "/placeholder-graduation.jpg";
  if (img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function GraduationsPage() {
  const graduations = await fetchGraduationsData();

  if (!graduations.length) {
    return (
      <main className="p-10 mt-32 min-h-screen text-center">
        <h1 className="text-3xl font-bold">No graduations found 😢</h1>
      </main>
    );
  }

  return (
    <main className="p-10 mt-32 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
            Graduations
          </span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Celebrating milestones and achievements 🎓
        </p>
      </div>

      {/* Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
  {graduations.map((grad) => (
    <div
      
      className="group relative bg-gradient-to-tr from-white/70 via-indigo-50 to-pink-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 border border-transparent border-indigo-300"
    >
      {/* Floating background shapes */}
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-200 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      {/* Image */}
      <div className="relative h-56 w-56 mx-auto -mt- rounded-full overflow-hidden shadow-lg ring-4 ring-white/50 group-hover:ring-pink-400 transition-all duration-500 flex items-center justify-center">
        <Image
          src={getImageUrl(grad.main_image)}
          alt={grad.title}
          width={224}
          height={224}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {grad.is_top && (
          <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse flex items-center gap-1">
            <FaStar /> Top
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 text-center mt-4 ">
        <div className="flex justify-evenly items-center">
        <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
          {grad.title}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Year: {grad.graduation_year || "N/A"}
        </p>
        </div>

        {/* Button */}
        <Link className=""
        key={grad.id}
      href={`/graduated-students/${grad.slug}`}>
          <span className="inline-block px-6 py-2 mt-10 text-sm font-medium rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300">
            View Details →
          </span>
        </Link>
      </div>
    </div>
  ))}
</div>


    </main>
  );
}
