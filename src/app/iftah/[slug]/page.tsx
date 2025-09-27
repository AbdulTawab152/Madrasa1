"use client";

import { useEffect, useState } from "react";
import { IftahApi } from "@/lib/api";
import { buildStorageUrl } from "@/lib/utils";
import {
  User,
  Calendar,
  Tag as TagIcon,
  FileText,
  CheckCircle2,
  XCircle,
  Star,
  Phone,
  MapPin,
  Download,
  ChevronLeft,
  Share2,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

interface Mufti {
  id: number;
  full_name: string;
  father_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  dob?: string | null;
  biography?: string | null;
}

interface Tag {
  id: number;
  name: string;
}

interface Iftah {
  id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  date?: string;
  note?: string;
  is_published?: number | boolean;
  is_top?: number | boolean;
  attachment?: string | null;
  mufti?: Mufti;
  tag?: Tag;
}

const buildAssetUrl = (path?: string | null) => buildStorageUrl(path) ?? undefined;

export default function IftahDetailsPage({ params }: { params: { slug: string } }) {
  const [iftah, setIftah] = useState<Iftah | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await IftahApi.getIftah(params.slug);
        if (!isMounted) return;

        if (response.success) {
          setIftah((response.data as Iftah) ?? null);
        } else {
          setIftah(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setIftah(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-25 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <BookOpen className="w-6 h-6 text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 font-medium mt-2">Loading divine wisdom...</p>
        </div>
      </div>
    );
  }

  if (!iftah) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-25 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md mx-auto border border-amber-100">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Content Not Found</h1>
          <p className="text-gray-600 mb-6">The requested question and answer could not be found.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-5 py-2.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors shadow-md hover:shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format date if available
  const formattedDate = iftah.date 
    ? new Date(iftah.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : "N/A";

  return (
    <div className="min-h-screen  mt-40 md:mt-32   bg-gradient-to-br from-amber-50 via-white to-amber-25">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-amber-100 z-10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link 
            href="/iftah"
            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
           iftah
          </Link>
        
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8">
        {/* Title and Metadata */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-2 rounded-full text-sm font-medium mb-5 shadow-md">
            <TagIcon className="w-4 h-4 mr-2" />
            {iftah.tag?.name || "General"}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight font-serif">
            {iftah.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-5 text-gray-600">
            <span className="flex items-center bg-white py-1.5 px-3 rounded-lg shadow-sm border border-amber-100">
              <Calendar className="w-4 h-4 mr-1.5 text-amber-600" />
              {formattedDate}
            </span>
            {iftah.mufti && (
              <span className="flex items-center bg-white py-1.5 px-3 rounded-lg shadow-sm border border-amber-100">
                <User className="w-4 h-4 mr-1.5 text-amber-600" />
                By {iftah.mufti.full_name}
              </span>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Main Content */}
        <div className="px-0 sm:px-4 lg:col-span-2 max-w-3xl mx-auto lg:px-4 py-10 space-y-8 text-gray-800">
{/* Question */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-amber-600 flex items-center">
              <FileText className="w-5 h-5 mr-2" /> Question
            </h2>
            <div className="text-gray-700 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: iftah.question }} />
          </section>

          {/* Answer */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-amber-700 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Answer
            </h2>
            <div className="text-gray-800 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: iftah.answer }} />
          </section>

          {/* Note */}
          {iftah.note && (
            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-amber-800 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" /> Additional Note
              </h2>
              <div className="text-gray-700 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: iftah.note }} />
            </section>
          )}

          {/* Attachment */}
          {iftah.attachment && (
            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2" /> Attachment
              </h2>
              <a
                href={buildAssetUrl(iftah.attachment)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </a>
              <p className="text-xs text-gray-500 mt-1">{iftah.attachment.split("/").pop()}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Mufti Card */}
          {iftah.mufti && (
            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <User className="w-5 h-5 mr-2" /> About the Mufti
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-amber-200">
                    <User className="w-9 h-9 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{iftah.mufti.full_name}</h3>
                  {iftah.mufti.father_name && <p className="text-sm text-gray-600">Son of {iftah.mufti.father_name}</p>}
                </div>
                {iftah.mufti.address && (
                  <p className="text-sm text-gray-700 flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-amber-600" /> {iftah.mufti.address}
                  </p>
                )}
                {iftah.mufti.phone && (
                  <p className="text-sm text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-amber-600" /> {iftah.mufti.phone}
                  </p>
                )}
                {iftah.mufti.email && (
                  <p className="text-sm text-gray-700 flex items-center truncate">
                    <span className="mr-2">📧</span> {iftah.mufti.email}
                  </p>
                )}
                {iftah.mufti.biography && (
                  <div className="mt-4 pt-4 border-t border-amber-100">
                    <p className="font-medium text-gray-900 mb-2">Biography</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{iftah.mufti.biography ?.replace(/<[^>]*>/g, "") }</p>
                  </div>
                )}
              </div>
            </div>
          )}

  

        </div>
               </div>

      </main>

     
    </div>
  );
}
