// app/authors/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
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
  Home,
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
    <main className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-gray-50 font-sans" dir="rtl">
      <Breadcrumb />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Button */}
        <div className="mb-6">
          <div className="flex items-center justify-start gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#d0e8e8] text-[#4a8a8a] w-full">
            <Link href="/" className="flex items-center gap-2 hover:text-[#5a9a9a] transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">{t("navbar.home")}</span>
            </Link>
            <span className="text-[#4a8a8a] mx-1">،</span>
            <Link href="/authors" className="text-sm font-medium hover:text-[#5a9a9a] transition-colors">
              {t("navbar.author")}
            </Link>
          </div>
        </div>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-3xl border border-amber-100/50 overflow-hidden mb-8">
          <div className="p-8 md:p-12">
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border-2 border-white ${
                      author.is_alive
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {author.is_alive ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-semibold">{t("authorDetail.alive")}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span className="text-xs font-semibold">{t("authorDetail.deceased")}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
                style={{ fontFamily: "Amiri, serif" }}
              >
                {author.first_name} {author.last_name}
              </h1>

              {/* Book Count Badge */}
              {author.book_count > 0 && (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300 shadow-md mb-6">
                  <BookOpen className="w-5 h-5 text-amber-800" />
                  <span className="text-sm font-semibold text-amber-900">
                    {author.book_count} {author.book_count === 1 ? t("authorDetail.book") : t("authorDetail.books")}
                  </span>
                </div>
              )}
            </div>

            {/* Biography Section */}
            {author.bio && (
              <div className="mt-8 pt-8 border-t border-amber-200/50">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookText className="w-6 h-6 text-amber-600" />
                    {t("authorDetail.biography")}
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_p]:mb-4 [&_p]:text-base [&_strong]:font-semibold [&_strong]:text-gray-900 [&_em]:italic [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: author.bio }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Information Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-600" />
              {t("authorDetail.personalInformation")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.fathersName")}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {author.father_name || t("authorDetail.notAvailable")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.grandfathersName")}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {author.grandfather_name || t("authorDetail.notAvailable")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.dateOfBirth")}
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {formatDate(author.dob)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-600" />
              {t("authorDetail.contactInformation")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("authorDetail.address")}
                  </p>
                  <p className="text-base font-medium text-gray-900 break-words">
                    {author.full_address || t("authorDetail.notAvailable")}
                  </p>
                </div>
              </div>

              {author.contact_no && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-amber-50/30 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      {t("authorDetail.contactNumber")}
                    </p>
                    <a
                      href={`tel:${author.contact_no}`}
                      className="text-base font-medium text-amber-700 hover:text-amber-800 transition-colors"
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-amber-700" />
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {t("authorDetail.books")}
              </h4>
            </div>
            <p className="text-3xl font-bold text-gray-900">{author.book_count || 0}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              {author.is_alive ? (
                <CheckCircle2 className="w-6 h-6 text-green-700" />
              ) : (
                <XCircle className="w-6 h-6 text-red-700" />
              )}
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {t("authorDetail.status")}
              </h4>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {author.is_alive ? t("authorDetail.alive") : t("authorDetail.deceased")}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-blue-700" />
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {t("authorDetail.published")}
              </h4>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {author.is_published ? t("authorDetail.yes") : t("authorDetail.no")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
