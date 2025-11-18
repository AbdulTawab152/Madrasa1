// app/authors/[id]/page.tsx
import Image from "next/image";
import { AuthorsApi } from "../../../lib/api";
import { Author } from "../../../lib/types";
import {
  Calendar,
  BookOpen,
  Award,
  MapPin,
  BookText,
  User,
  Phone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import { getTranslation } from "@/lib/translations";
import Breadcrumb from "@/components/Breadcrumb";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

async function fetchAuthor(id: string): Promise<Author> {
  try {
    const response = await AuthorsApi.getById(id);
    if (!response.success) {
      throw new Error(response.error || "Author not found");
    }

    return response.data as Author;
  } catch {
    throw new Error("Author not found");
  }
}

export default async function AuthorDetailPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const author = await fetchAuthor(id);

  const t = (key: string): string => {
    const translation = getTranslation(key, "ps");
    return typeof translation === "string" ? translation : key;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return t("authorDetail.notAvailable");
    const cleaned = dateString.replace(/<[^>]*>/g, "").trim();
    if (!cleaned) return t("authorDetail.notAvailable");
    try {
      const date = new Date(cleaned);
      if (isNaN(date.getTime())) return cleaned;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return cleaned;
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb - matching card width, no shadow */}
        <div className="mb-6 mt-6">
          <div className="[&>nav]:px-0 [&>nav]:py-0 [&>nav]:-mt-0 [&>nav>div]:shadow-none ">
            <Breadcrumb />
          </div>
        </div>
       
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-3xl border border-amber-100/50 overflow-hidden mb-8">
          <div className="p-6 md:p-12">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-8">
              {/* Profile Image with Enhanced Styling */}
              <div className="relative mb-6">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl ring-4 ring-amber-100/50">
                  {author.image ? (
                    <Image
                      src={
                        getImageUrl(author.image, "/placeholder-author.jpg") ||
                        "/placeholder-author.jpg"
                      }
                      alt={`${author.first_name} ${author.last_name}`}
                      width={224}
                      height={224}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
                      <User className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                </div>
                {/* Status Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg border-2 border-white ${
                      author.is_alive
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {author.is_alive ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight text-center"
                style={{ fontFamily: "Amiri, serif" }}
              >
                {author.first_name} {author.last_name}
              </h1>

              {/* Book Count Badge */}
              {author.book_count > 0 && (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300 shadow-md mb-6">
                  <BookOpen className="w-5 h-5 text-amber-800" />
                  <span className="text-sm font-semibold text-amber-900" style={{ fontFamily: "Amiri, serif" }}>
                    {author.book_count} {author.book_count === 1 ? t("authorDetail.book") : t("authorDetail.books")}
                  </span>
                </div>
              )}
            </div>

            {/* Biography Section */}
            {author.bio && (
              <div className="mt-8 pt-8 border-t border-amber-200/50">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2" style={{ fontFamily: 'Amiri, serif' }}>
                  <BookText className="w-6 h-6 text-amber-600" />
                  {t("authorDetail.biography")}
                </h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_p]:mb-4 [&_p]:text-base [&_strong]:font-semibold [&_strong]:text-gray-900 [&_em]:italic [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2"
                  style={{ fontFamily: 'Amiri, serif' }}
                  dangerouslySetInnerHTML={{ __html: author.bio }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Information Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Amiri, serif' }}>
              <User className="w-5 h-5 text-amber-600" />
              {t("authorDetail.personalInformation")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:border-amber-200 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.fathersName")}
                  </p>
                  <p className="text-base font-medium text-gray-900" style={{ fontFamily: 'Amiri, serif' }}>
                    {author.father_name || t("authorDetail.notAvailable")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:border-amber-200 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.grandfathersName")}
                  </p>
                  <p className="text-base font-medium text-gray-900" style={{ fontFamily: 'Amiri, serif' }}>
                    {author.grandfather_name || t("authorDetail.notAvailable")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:border-amber-200 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.dateOfBirth")}
                  </p>
                  <p className="text-base font-medium text-gray-900" style={{ fontFamily: 'Amiri, serif' }}>
                    {formatDate(author.dob)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={{ fontFamily: 'Amiri, serif' }}>
              <Phone className="w-5 h-5 text-amber-600" />
              {t("authorDetail.contactInformation")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:border-amber-200 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.address")}
                  </p>
                  <p className="text-base font-medium text-gray-900 break-words leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                    {author.full_address || t("authorDetail.notAvailable")}
                  </p>
                </div>
              </div>

              {author.contact_no && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:border-amber-200 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      {t("authorDetail.contactNumber")}
                    </p>
                    <a
                      href={`tel:${author.contact_no}`}
                      className="text-base font-medium text-amber-700 hover:text-amber-800 transition-colors" style={{ fontFamily: 'Amiri, serif' }}
                    >
                      {author.contact_no}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {/* Books Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-200 px-6 py-8 flex flex-col items-center justify-center relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Decorative icon bg */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100/60 w-20 h-20 rounded-full z-0 blur-md"></div>
            <div className="z-10 flex flex-col items-center">
              <div className="mb-3">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-200 shadow-md">
                  <BookOpen className="w-7 h-7 text-amber-600" />
                </span>
              </div>
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                {t("authorDetail.books")}
              </h4>
              <p className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Amiri, serif' }}>{author.book_count || 0}</p>
            </div>
          </div>

          {/* Status Card */}
          <div className={`bg-white rounded-2xl shadow-lg border px-6 py-8 flex flex-col items-center justify-center relative overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
            author.is_alive ? "border-green-200" : "border-red-200"
          }`}>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full z-0 blur-md ${
              author.is_alive ? "bg-green-100/70" : "bg-red-100/70"
            }`}></div>
            <div className="z-10 flex flex-col items-center">
              <div className="mb-3">
                <span className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${
                  author.is_alive ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200"
                } shadow-md`}>
                  {author.is_alive ? (
                    <CheckCircle2 className="w-7 h-7 text-green-700" />
                  ) : (
                    <XCircle className="w-7 h-7 text-red-600" />
                  )}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                {t("authorDetail.status")}
              </h4>
            </div>
          </div>

          {/* Published Status Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-200 px-6 py-8 flex flex-col items-center justify-center relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100/50 w-20 h-20 rounded-full z-0 blur-md"></div>
            <div className="z-10 flex flex-col items-center">
              <div className="mb-3">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-200 shadow-md">
                  <Award className="w-7 h-7 text-blue-700" />
                </span>
              </div>
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                {t("authorDetail.published")}
              </h4>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Amiri, serif' }}>
                {author.is_published ? t("authorDetail.yes") : t("authorDetail.no")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
