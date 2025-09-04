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
        if (!showAll) data = data.slice(0, 4); // only 4 for home page
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
    <section className="py-16 md:py-24 bg-gray-50">
      {/* Hero */}
      {showAll && (
  <div className="relative overflow-hidden py-24 lg:py-32 text-center">
    {/* Background gradients */}
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 -z-20 opacity-75"></div>
    <div className="absolute inset-0 bg-radial-gradient-circle opacity-15 -z-10"></div>

    {/* Floating blobs */}
    <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-3xl animate-blob"></div>
    <div className="absolute -bottom-32 right-0 w-96 h-96 bg-yellow-200 rounded-full opacity-15 blur-3xl animate-blob animation-delay-2000"></div>
    <div className="absolute top-16 right-20 w-64 h-64 bg-orange-100 rounded-full opacity-10 blur-2xl animate-blob animation-delay-4000"></div>

    {/* Hero Heading */}
    <div className="relative z-10">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6 drop-shadow-sm">
        All{" "}
        <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent animate-gradient-x">
          Graduates
        </span>
      </h1>

      <p className="mt-8 text-orange-700 text-xl sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-md opacity-95">
        Highlighting the achievements and journeys of students who have successfully completed their studies 🌟
      </p>

      {/* Glow accent line */}
      <div className="mt-10 w-48 h-1.5 mx-auto rounded-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 opacity-80 shadow-md relative">
        <div className="absolute inset-0 bg-orange-500 rounded-full opacity-40 blur-md animate-pulse"></div>
      </div>
    </div>

    {/* Small particle dots */}
    <div className="absolute top-10 left-10 w-2 h-2 bg-orange-300 rounded-full opacity-30 animate-pulse"></div>
    <div className="absolute bottom-20 right-24 w-3 h-3 bg-yellow-300 rounded-full opacity-20 animate-pulse animation-delay-1500"></div>
    <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-orange-200 rounded-full opacity-15 animate-pulse animation-delay-2500"></div>
    <div className="absolute top-1/10 right-1/4 w-2.5 h-2.5 bg-yellow-300 rounded-full opacity-25 animate-pulse animation-delay-500"></div>
    <div className="absolute bottom-1/10 left-1/3 w-2 h-2 bg-orange-200 rounded-full opacity-15 animate-pulse animation-delay-3500"></div>
  </div>
)}




      {/* Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto px-4 md:px-6">
  {graduations.map((grad) => (
    <div
      key={grad.id}
      className="relative group bg-white rounded-3xl shadow-sm overflow-hidden  border border-gray-100 hover:shadow-md transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-300"
    >
      {/* Floating shapes */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-100 opacity-15 rounded-full blur-3xl animate-pulse mix-blend-multiply group-hover:scale-125 transition-transform duration-500"></div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-100 opacity-15 rounded-full blur-3xl animate-pulse mix-blend-multiply animation-delay-2000 group-hover:scale-125 transition-transform duration-500"></div>

      {/* Profile Image */}
      <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl ring-4 ring-white/70 group-hover:ring-orange-400 transition-all duration-500 flex items-center justify-center">
        <Image
          src={getImageUrl(grad.main_image)}
          alt={grad.title}
          width={192}
          height={192}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-115 group-hover:rotate-3"
        />
        {grad.is_top && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md flex items-center gap-1 animate-pulse">
            <FaStar className="text-white" /> Top
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-8 text-center mt-4">
        <h3 className="text-lg sm:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-800 group-hover:from-orange-500 group-hover:to-yellow-500 transition-all duration-500">
          {grad.title}
        </h3>
        <p className="text-gray-600 text-xs mt-2 leading-relaxed">
          Graduation Year: <span className="font-semibold text-gray-700">{grad.graduation_year || "N/A"}</span>
        </p>

        <Link href={`/graduated-students/${grad.slug}`}>
          <span className="inline-block px-8 py-2 mt-6 text-sm font-semibold rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            View Details →
          </span>
        </Link>
      </div>
    </div>
  ))}
</div>



      {/* See All button only for home page */}
      {/* {!showAll && (
        <div className="mt-16 text-center">
          <Link
            href="/graduated-students"
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            View All Graduates →
          </Link>
        </div>
      )} */}
    </section>
  );
}
