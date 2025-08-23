import Link from "next/link";
import Image from "next/image";

interface Graduation {
  studentName: string;
  slug: string;
  photo?: string;
  graduationDate: string;
  course?: string;
  grade?: string;
  certificate?: string;
  testimonial?: string;
  achievements?: string[];
  // Extra fields you were already using
  is_published?: boolean;
  is_featured?: boolean;
  image?: string;
  title?: string;
  description?: string;
  location?: string;
  organizer?: string;
  faculty?: string;
  degree?: string;
  duration?: string;
}

interface GraduationsSectionProps {
  graduations: Graduation[];
  showAll?: boolean;
}

export default function GraduationsSection({ graduations, showAll = false }: GraduationsSectionProps) {
  const sortedGraduations =
    graduations
      ?.filter(graduation => graduation.is_published)
      .sort((a, b) => new Date(b.graduationDate).getTime() - new Date(a.graduationDate).getTime()) || [];

  const displayGraduations = showAll ? sortedGraduations : sortedGraduations.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <div className="w-full">
      {!showAll && (
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            🎓 {showAll ? "All Graduations" : "Featured Graduations"}
          </h2>
          <p className="text-lg text-gray-600 mt-3">
            {showAll
              ? "Explore all graduation ceremonies and achievements"
              : "Celebrate the success of our brightest students"}
          </p>
        </div>
      )}

      {/* Graduation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayGraduations.map(graduation => (
          <Link
            key={graduation.slug}
            href={`/graduated-students/${graduation.slug}`}
            className="group"
          >
            <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden flex flex-col">
              
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                {graduation.image ? (
                  <Image
                    src={getImageUrl(graduation.image)}
                    alt={graduation.title || graduation.studentName}
                    width={500}
                    height={250}
                    className="w-full h-full object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center">
                    <span className="text-green-800 font-medium">No Image</span>
                  </div>
                )}

                {/* Featured Badge */}
                {graduation.is_featured && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">
                    🌟 Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Student Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                  {graduation.studentName}
                </h3>

                {/* Graduation Title */}
                {graduation.title && (
                  <p className="text-sm text-gray-700 font-medium mb-2">{graduation.title}</p>
                )}

                {/* Description */}
                {graduation.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                    {graduation.description}
                  </p>
                )}

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                  <span>📅 {graduation.graduationDate}</span>
                  <span>📍 {graduation.location || "TBA"}</span>
                  <span>👤 {graduation.organizer || "Organizer"}</span>
                  <span>🏫 {graduation.faculty || "Faculty"}</span>
                  <span>🎓 {graduation.degree || "Degree"}</span>
                  <span>📘 {graduation.course || "Course"}</span>
                  <span>⭐ {graduation.grade || "Grade N/A"}</span>
                  <span>📜 {graduation.certificate || "No Certificate"}</span>
                </div>

                {/* Testimonial */}
                {graduation.testimonial && (
                  <blockquote className="italic text-gray-500 text-xs border-l-2 border-green-500 pl-2 mb-3">
                    “{graduation.testimonial}”
                  </blockquote>
                )}

                {/* Achievements */}
                {graduation.achievements && graduation.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-gray-700 mb-3">
                    {graduation.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.03] shadow-md text-sm">
                  View Details →
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* See All Button */}
      {!showAll && displayGraduations.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/graduations"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.05] shadow-lg"
          >
            Explore All Graduations
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
