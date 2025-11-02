"use client";

import Image from "next/image";
import { Awlyaa } from "../../../lib/types";
import { getImageUrl } from "@/lib/utils";
import { cleanText } from "@/lib/textUtils";
import { getTranslation } from "@/lib/translations";
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

interface AwlyaaContentProps {
  awlyaa: Awlyaa;
}

export default function AwlyaaContent({ awlyaa }: AwlyaaContentProps) {
  const t = (key: string): string => {
    const translation = getTranslation(key, 'ps');
    return typeof translation === 'string' ? translation : key;
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('awlyaaDetail.notSpecified');
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
        <div className="bg-white rounded-3xl overflow-hidden mb-10 border border-gray-200">
          <div className="relative h-48 bg-gradient-to-r from-orange-500 to-amber-500">
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
          </div>

          <div className="px-8 pb-8 -mt-20 relative z-10">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                {awlyaa.profile_image ? (
                  <Image
                    src={
                      getImageUrl(awlyaa.profile_image, "/placeholder-author.jpg") ||
                      "/placeholder-author.jpg"
                    }
                    alt={awlyaa.name}
                    width={200}
                    height={200}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 border-4 border-white">
                    <User size={60} />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full">
                  <Award size={20} />
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mt-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {cleanText(awlyaa.name)}
              </h1>
              <p className="text-md md:text-xl text-amber-600 font-medium mt-2">
                {cleanText(awlyaa.title || t('awlyaaDetail.distinguishedScholar'))}
              </p>
              {awlyaa.nickname && (
                <p className="text-gray-500 mt-1">"{cleanText(awlyaa.nickname)}"</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Teachers */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <GraduationCap className="text-amber-500" size={24} />
                {t('awlyaaDetail.teachers')}
              </h2>

              {awlyaa.teachers &&
              Array.isArray(awlyaa.teachers) &&
              awlyaa.teachers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {awlyaa.teachers.map((t: any) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="text-amber-600" size={16} />
                      </div>
                      {t.teacher?.id ? (
                        <a
                          href={`/awlayaa/${t.teacher.id}`}
                          className="font-semibold text-[12px] text-amber-700 hover:underline transition-colors outline-none focus:outline-none focus:ring-0"
                          title={t('awlyaaDetail.viewTeacherDetails')}
                        >
                          {cleanText(t.teacher?.name || t('awlyaaDetail.unknownTeacher'))}
                        </a>
                      ) : (
                        <span className="font-semibold text-[12px]">
                          {cleanText(t.teacher?.name || t('awlyaaDetail.unknownTeacher'))}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  {t('awlyaaDetail.noTeacherInfo')}
                </p>
              )}
            </div>

            {/* Students Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-amber-500" size={24} />
                {t('awlyaaDetail.students')}
              </h2>

              {awlyaa.students &&
              Array.isArray(awlyaa.students) &&
              awlyaa.students.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {awlyaa.students.map((s: any) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="text-orange-600" size={16} />
                      </div>
                      {s.student?.id ? (
                        <a
                          href={`/awlayaa/${s.student.id}`}
                          className="font-semibold text-[12px] text-orange-700 hover:underline transition-colors outline-none focus:outline-none focus:ring-0"
                          title={t('awlyaaDetail.viewStudentDetails')}
                        >
                          {cleanText(s.student?.name || t('awlyaaDetail.unknownStudent'))}
                        </a>
                      ) : (
                        <span className="font-semibold text-[12px]">
                          {cleanText(s.student?.name || t('awlyaaDetail.unknownStudent'))}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  {t('awlyaaDetail.noStudentInfo')}
                </p>
              )}
            </div>

            {/* Quick Facts Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="text-amber-500" size={24} />
                {t('awlyaaDetail.personalInformation')}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">{t('awlyaaDetail.fathersName')}</p>
                    <p className="font-semibold">
                      {cleanText(awlyaa.father_name || t('awlyaaDetail.notSpecified'))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500">{t('awlyaaDetail.children')}</p>
                    <p className="font-medium">
                      {awlyaa.number_of_children || t('awlyaaDetail.notSpecified')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-500">{t('awlyaaDetail.booksWritten')}</p>
                    <p className="text-sm">
                      {cleanText(awlyaa.books_written || t('awlyaaDetail.notSpecified'))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Birth Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-amber-500" size={24} />
                {t('awlyaaDetail.birthDetails')}
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
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">{t('awlyaaDetail.birthPlace')}</span>
                    <span className="text-gray-700">
                      {cleanText([
                        awlyaa.birth_place,
                        awlyaa.birth_city,
                        awlyaa.birth_country,
                      ]
                        .filter(Boolean)
                        .join(", ") || t('awlyaaDetail.notSpecified'))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Death Information (if applicable) */}
            {awlyaa.death_date && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="text-amber-500" size={24} />
                  {t('awlyaaDetail.deathDetails')}
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
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">{t('awlyaaDetail.deathPlace')}</span>
                      <span className="text-gray-700">
                        {cleanText([
                          awlyaa.death_place,
                          awlyaa.death_city,
                          awlyaa.death_country,
                        ]
                          .filter(Boolean)
                          .join(", ") || t('awlyaaDetail.notSpecified'))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="mb-6 text-left">
                <p className="text-sm text-gray-500">{t('awlyaaDetail.education')}</p>
                <p className="font">
                  {cleanText(awlyaa.education || t('awlyaaDetail.notSpecified'))}
                </p>
              </div>

              {/* Famous Works Section */}
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookText className="text-amber-500" size={24} />
                {t('awlyaaDetail.famousWorksContributions')}
              </h2>

              {awlyaa.famous_works &&
              Array.isArray(awlyaa.famous_works) &&
              awlyaa.famous_works.length > 0 ? (
                <div className="space-y-3">
                  {awlyaa.famous_works.map((work: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3"
                    >
                      <Star
                        className="text-amber-500 mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span className="font-medium">{cleanText(work)}</span>
                    </div>
                  ))}
                </div>
              ) : awlyaa.famous_works ? (
                <div className="flex items-start gap-3 rounded-lg">
                  <Star
                    className="text-amber-500 mt-1 flex-shrink-0"
                    size={16}
                  />
                  <span className="font-semibold text-sm">{cleanText(awlyaa.famous_works)}</span>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  {t('awlyaaDetail.noFamousWorks')}
                </p>
              )}
            </div>

            {/* Extra Information */}
            {awlyaa.extra_information && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Quote className="text-amber-500" size={24} />
                  {t('awlyaaDetail.additionalInformation')}
                </h2>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {cleanText(awlyaa.extra_information)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

