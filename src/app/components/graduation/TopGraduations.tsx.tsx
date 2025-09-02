// components/GraduationsSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationsApi } from "../../../lib/api";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface Graduation {
  id: number;
  title: string;
  slug: string;
  main_image?: string | null;
  graduation_year?: string | number;
  is_top?: boolean;
}

// Utility to get image URL
const getImageUrl = (img?: string | null) => {
  if (!img) return "/placeholder-graduation.jpg";
  if (img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

interface GraduationsSectionProps {
  showAll?: boolean; // true => show all, false => home page (3 only)
}

export default function GraduationsSection({ showAll = false }: GraduationsSectionProps) {
  const [graduations, setGraduations] = useState<Graduation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GraduationsApi.getAll();
        let data: Graduation[] = Array.isArray(res?.data) ? res.data : [];
        if (!showAll) data = data.slice(0, 3); // only 3 for home page
        setGraduations(data);
      } catch (err) {
        console.error(err);
        setGraduations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [showAll]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-600 font-medium">Loading...</span>
      </div>
    );
  }

  if (!graduations.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700">
          No graduations found 😢
        </h2>
      </div>
    );
  }

  return (
    <section className="py-16  bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
    <div className="relative overflow-hidden py-24 lg:py-32 text-center">
  {/* Background gradients */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-amber-50 to-pink-50 -z-20"></div>
  <div className="absolute inset-0 bg-radial-gradient-circle opacity-30 -z-10"></div>

  {/* Floating blobs */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-300 rounded-full opacity-30 blur-3xl animate-blob"></div>
  <div className="absolute -bottom-32 right-0 w-96 h-96 bg-pink-300 rounded-full opacity-25 blur-3xl animate-blob animation-delay-2000"></div>
  <div className="absolute top-16 right-20 w-64 h-64 bg-indigo-300 rounded-full opacity-20 blur-2xl animate-blob animation-delay-4000"></div>
  <div className="absolute top-0 left-1/2 w-24 h-24 bg-white rounded-full opacity-10 blur-xl animate-blob animation-delay-1000"></div>

  {/* Hero Heading */}
  <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
    {showAll ? "All Graduations" : "Recent "}
    <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
      Graduations
    </span>
  </h1>

  {/* Subheading */}
  <p className="relative mt-6 text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
    Honoring the dedication and achievements of our students 🎓
  </p>

  {/* Glow accent line */}
  <div className="relative mt-8 w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-500 opacity-80 shadow-lg"></div>

  {/* See All Button */}


  {/* Small particle dots */}
  <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-40 animate-pulse"></div>
  <div className="absolute bottom-20 right-24 w-3 h-3 bg-white rounded-full opacity-30 animate-pulse animation-delay-1500"></div>
  <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-20 animate-pulse animation-delay-2500"></div>
</div>


      {/* Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
  {graduations.map((grad) => (
    <div
      key={grad.id}
      className="relative group bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm border border-orange-200  hover:shadow-sm transition-transform transform hover:-translate-y-4 hover:scale-105 duration-500 hover:border border-transparent hover:border-amber-300"
    >
      {/* Floating shapes */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-200 opacity-20 rounded-full blur-3xl animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse mix-blend-multiply"></div>

      {/* Profile Image */}
      <div className="relative w-44 h-44 mx-auto  rounded-full overflow-hidden shadow-2xl ring-4 ring-white/40 group-hover:ring-amber-400 transition-all duration-500 flex items-center justify-center">
        <Image
          src={getImageUrl(grad.main_image)}
          alt={grad.title}
          width={176}
          height={176}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
        />
        {grad.is_top && (
          <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 animate-pulse">
            <FaStar /> Top
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 text-center mt-4">
        <h3 className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gray-800 group-hover:from-pink-500 group-hover:to-amber-500 transition-all duration-500">
          {grad.title}
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Year: {grad.graduation_year || "N/A"}
        </p>

        <Link href={`/graduated-students/${grad.slug}`}>
          <span className="inline-block px-10 py-2 mt-6 text-sm font-medium rounded-full  bg-amber-500 text-white shadow-md hover:shadow-sm ">
            View Details →
          </span>
        </Link>
      </div>
    </div>
  ))}
</div>



      {/* See All button only for home page */}
      {!showAll && (
        <div className="mt-10 text-center">
          <Link
            href="/graduated-students"
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition"
          >
            See All Graduations →
          </Link>
        </div>
      )}
    </section>
  );
}
