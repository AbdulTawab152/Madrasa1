// app/graduations/[slug]/page.tsx
import { GraduationsApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";

export interface Graduation {
  id?: number;
  slug: string;

  // Student Info
  studentName: string;
  photo?: string;

  // Basic Graduation Info
  title?: string;
  description?: string;
  graduationDate: string;
  location?: string;
  faculty?: string;
  degree?: string;
  duration?: string;
  organizer?: string;

  // Extra Academic Info
  course?: string;
  grade?: string;
  certificate?: string;
  testimonial?: string;
  achievements?: string[];

  // Media
  image?: string;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function GraduationDetailsPage({ params }: Params) {
  const { slug } = await params;

  // Fetch graduation details
  const res = await GraduationsApi.getAll();
  const graduations = Array.isArray(res.data) ? (res.data as Graduation[]) : [];
  const graduation: Graduation | undefined = graduations.find(g => g.slug === slug);

  if (!graduation) {
    return <p className="text-center mt-20 text-xl">Graduation not found!</p>;
  }

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <main className="max-w-4xl mt-32 mx-auto p-8">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{graduation.title || graduation.studentName}</h1>
      {graduation.description && <p className="text-gray-600 mb-6">{graduation.description}</p>}

      {/* Image */}
      {(graduation.image || graduation.photo) && (
        <div className="mb-6">
          <Image
            src={getImageUrl(graduation.image || graduation.photo)}
            alt={graduation.title || graduation.studentName}
            width={800}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}

      {/* Meta Info */}
      <div className="flex flex-col gap-2 text-gray-700 mb-6 text-sm">
        <span>📅 Date: {graduation.graduationDate}</span>
        <span>📍 Location: {graduation.location || "TBA"}</span>
        <span>🎓 Faculty: {graduation.faculty || "Unknown"}</span>
        <span>🎖️ Degree: {graduation.degree || "N/A"}</span>
        <span>📘 Course: {graduation.course || "N/A"}</span>
        <span>⭐ Grade: {graduation.grade || "N/A"}</span>
        <span>⏱️ Duration: {graduation.duration || "N/A"}</span>
        <span>🎤 Organizer: {graduation.organizer || "Unknown"}</span>
      </div>

      {/* Certificate */}
      {graduation.certificate && (
        <div className="mb-6">
          <p className="font-semibold">📜 Certificate:</p>
          <a
            href={getImageUrl(graduation.certificate)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Certificate
          </a>
        </div>
      )}

      {/* Testimonial */}
      {graduation.testimonial && (
        <blockquote className="mb-6 p-4 bg-gray-50 border-l-4 border-amber-500 italic text-gray-700">
          “{graduation.testimonial}”
        </blockquote>
      )}

      {/* Achievements */}
      {graduation.achievements && graduation.achievements.length > 0 && (
        <div className="mb-6">
          <p className="font-semibold mb-2">🏆 Achievements:</p>
          <ul className="list-disc list-inside text-gray-700">
            {graduation.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/graduated-students"
        className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
      >
        Back to Graduations
      </Link>
    </main>
  );
}
