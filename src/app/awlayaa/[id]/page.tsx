import Image from "next/image";
import { AwlyaaApi } from "../../../lib/api";
import { Awlyaa } from "../../../lib/types";
import {
  User,
  Calendar,
  BookOpen,
  GraduationCap,
  Users,
  Heart,
  Quote,
  Star,
  Award,
  MapPin,
  BookText,
} from "lucide-react";

interface AwlyaaPageProps {
  params: Promise<{ id: string }>;
}

const getImageUrl = (img?: string | null) => {
  if (!img) return "/placeholder-author.jpg";
  if (img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function AwlyaaDetailPage({ params }: AwlyaaPageProps) {
  const { id } = await params;
  const res = await AwlyaaApi.getById(id);
  const awlyaa: Awlyaa = res.data as Awlyaa;

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="bg-white rounded-3xl  overflow-hidden mb-10 border border-gray-200">
          <div className="relative h-48 bg-gradient-to-r from-orange-500 to-amber-500">
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          <div className="px-8 pb-8 -mt-20 relative z-10">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                {awlyaa.profile_image ? (
                  <Image
                    src={getImageUrl(awlyaa.profile_image)}
                    alt={awlyaa.name}
                    width={200}
                    height={200}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 border-4 border-white ">
                    <User size={60} />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full ">
                  <Award size={20} />
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mt-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {awlyaa.name}
              </h1>
              <p className="text-xl text-amber-600 font-medium mt-2">
                {awlyaa.title || "Distinguished Scholar"}
              </p>
              {awlyaa.nickname && (
                <p className="text-gray-500 mt-1">"{awlyaa.nickname}"</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Facts Card */}
            <div className="bg-white rounded-2xl p-6  border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="text-amber-500" size={24} />
                Personal Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Father's Name</p>
                    <p className="font-medium">
                      {awlyaa.father_name || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Children</p>
                    <p className="font-medium">
                      {awlyaa.number_of_children || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GraduationCap
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="font-medium">
                      {awlyaa.education || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Books Written</p>
                    <p className="font-medium">
                      {awlyaa.books_written || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Birth Information */}
            <div className="bg-white rounded-2xl p-6  border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-amber-500" size={24} />
                Birth Details
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-gray-700">
                    {formatDate(awlyaa.birth_date)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-700">
                    {[
                      awlyaa.birth_place,
                      awlyaa.birth_city,
                      awlyaa.birth_country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Death Information (if applicable) */}
            {awlyaa.death_date && (
              <div className="bg-white rounded-2xl p-6  border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="text-amber-500" size={24} />
                  Death Details
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-700">
                      {formatDate(awlyaa.death_date)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="text-gray-400" size={16} />
                    <span className="text-gray-700">
                      {[
                        awlyaa.death_place,
                        awlyaa.death_city,
                        awlyaa.death_country,
                      ]
                        .filter(Boolean)
                        .join(", ") || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teachers Section */}
            <div className="bg-white rounded-2xl p-6  border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <GraduationCap className="text-amber-500" size={24} />
                Teachers & Mentors
              </h2>

              {awlyaa.teachers &&
              Array.isArray(awlyaa.teachers) &&
              awlyaa.teachers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {awlyaa.teachers.map((t: any) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="text-amber-600" size={16} />
                      </div>
                      <span className="font-medium">
                        {t.teacher?.name || "Unknown Teacher"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No teacher information available
                </p>
              )}
            </div>

            {/* Students Section */}
            <div className="bg-white rounded-2xl p-6  border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-amber-500" size={24} />
                Students & Followers
              </h2>

              {awlyaa.students &&
              Array.isArray(awlyaa.students) &&
              awlyaa.students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {awlyaa.students.map((s: any) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="text-orange-600" size={16} />
                      </div>
                      <span className="font-medium">
                        {s.student?.name || "Unknown Student"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No student information available
                </p>
              )}
            </div>

            {/* Famous Works Section */}
            <div className="bg-white rounded-2xl p-6  border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookText className="text-amber-500" size={24} />
                Famous Works & Contributions
              </h2>

              {awlyaa.famous_works &&
              Array.isArray(awlyaa.famous_works) &&
              awlyaa.famous_works.length > 0 ? (
                <div className="space-y-3">
                  {awlyaa.famous_works.map((work: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Star
                        className="text-amber-500 mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span className="font-medium">{work}</span>
                    </div>
                  ))}
                </div>
              ) : awlyaa.famous_works ? (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Star
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={16}
                  />
                  <span className="font-medium">{awlyaa.famous_works}</span>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No famous works information available
                </p>
              )}
            </div>

            {/* Extra Information */}
            {awlyaa.extra_information && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Quote className="text-amber-500" size={24} />
                  Additional Information
                </h2>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {awlyaa.extra_information}
                  </p>
                </div>
              </div>
            )}

            {/* Legacy Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Legacy & Impact</h2>
              <p className="opacity-90">
                This distinguished scholar has made significant contributions to
                their field and continues to inspire generations of students and
                researchers through their work and teachings.
              </p>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 bg-white/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    {awlyaa.teachers?.length || 0}+
                  </div>
                  <div className="text-sm">Teachers</div>
                </div>
                <div className="flex-1 bg-white/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    {awlyaa.students?.length || 0}+
                  </div>
                  <div className="text-sm">Students</div>
                </div>
                <div className="flex-1 bg-white/20 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    {awlyaa.books_written || 0}+
                  </div>
                  <div className="text-sm">Books</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
