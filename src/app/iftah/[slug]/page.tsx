"use client";

import { useEffect, useState, use } from "react";
import { IftahApi } from "@/lib/api";
import { buildStorageUrl } from "@/lib/utils";
import { cleanText } from "@/lib/textUtils";
import {
  User,
  Phone,
  MapPin,
  Download,
  ChevronLeft,
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

export default function IftahDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [iftah, setIftah] = useState<Iftah | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await IftahApi.getIftah(slug);
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
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br  from-amber-50 via-white to-amber-25 flex items-center justify-center p-4">
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
    <div className="min-h-screen mt-40 md:mt-32 bg-gray-50 py-12 px-4">
      <main className="max-w-4xl mx-auto" dir="rtl">
        {/* Go Back Button */}
        <div className="mb-6">
          {iftah.tag && (
            <Link 
              href="/iftah"
              className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 ml-2" />
              <span className="text-sm">بازگشت</span>
            </Link>
          )}
        </div>

        {/* Main Fatwa Document */}
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8">
          {/* Category/Breadcrumb */}
          {iftah.tag && (
            <div className="mb-6 text-right">
              <p className="text-gray-600 text-sm mb-2">عبادات &gt; &gt; {iftah.tag.name}</p>
            </div>
          )}

          {/* Question Number */}
          <div className="mb-6">
            <p className="text-gray-700 text-sm">سوال نمبر: {iftah.id}</p>
          </div>

          {/* Title */}
          <div className="mb-6">
            <p className="font-bold text-gray-900 mb-2">عنوان:</p>
            <p className="text-gray-800 leading-relaxed">{cleanText(iftah.title)}</p>
          </div>

          {/* Question */}
          <div className="mb-8">
            <p className="font-bold text-gray-900 mb-2">سوال:</p>
            <p className="text-gray-800 leading-relaxed">{cleanText(iftah.question)}</p>
          </div>

          {/* Divider Line */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Answer Number */}
          <div className="mb-6">
            <p className="text-gray-700 text-sm">جواب نمبر: {iftah.id}</p>
          </div>

          {/* Bismillah - Centered */}
          <div className="text-center mb-6">
            <p className="text-2xl text-gray-800 font-bold" style={{ fontFamily: 'serif' }}>
              بسم اللہ الرحمن الرحیم
            </p>
          </div>

          {/* Fatwa ID */}
          <div className="mb-6 text-left" dir="ltr">
            <p className="text-sm text-gray-600">Fatwa: {iftah.id}</p>
          </div>

          {/* Answer */}
          <div className="mb-8">
            <p className="text-gray-800 leading-relaxed">{cleanText(iftah.answer)}</p>
          </div>

          {/* Note if available */}
          {iftah.note && (
            <div className="mb-8">
              <p className="text-gray-800 leading-relaxed">{cleanText(iftah.note)}</p>
            </div>
          )}

          {/* Closing */}
          <div className="mt-8 mb-6 text-center">
            <p className="text-xl text-gray-800 font-bold" style={{ fontFamily: 'serif' }}>
              واللہ تعالیٰ اعلم
            </p>
          </div>

          {/* Institution Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700">دار الافتاء،</p>
            <p className="text-sm text-gray-700">اَلْجَامِعْةُ اَنوَار الْعُلُوْم اَلْاِسْلاَمِیّة اَلْمَدْرَسَةٌ خلیفه صاحب ارغندی (رح)</p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-6 pt-6 border-t border-gray-200 text-left" dir="ltr">
            <span>📅 {formattedDate}</span>
          </div>

          {/* Attachment */}
          {iftah.attachment && (
            <div className="mt-6 pt-6 border-t border-gray-200 text-left" dir="ltr">
              <a
                href={buildAssetUrl(iftah.attachment)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" /> Download Attachment
              </a>
            </div>
          )}
        </div>

        {/* Mufti Card - Below the Fatwa */}
        {iftah.mufti && (
          <div className="bg-white shadow-md border border-gray-200 rounded-lg mt-8 p-8" dir="rtl">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-xl mb-2">{cleanText(iftah.mufti.full_name)}</h3>
              {iftah.mufti.father_name && (
                <p className="text-gray-600 text-sm">Son of {cleanText(iftah.mufti.father_name)}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">Islamic Scholar & Mufti</p>
            </div>

            <div className="space-y-3 mb-6">
              {iftah.mufti.phone && (
                <div className="flex items-center p-3 bg-gray-50 rounded border">
                  <Phone className="w-4 h-4 text-gray-600 ml-3" />
                  <span className="text-gray-800">{iftah.mufti.phone}</span>
                </div>
              )}
              {iftah.mufti.email && (
                <div className="flex items-center p-3 bg-gray-50 rounded border">
                  <span className="text-gray-600 ml-3">📧</span>
                  <span className="text-gray-800 break-all text-sm">{iftah.mufti.email}</span>
                </div>
              )}
              {iftah.mufti.address && (
                <div className="flex items-start p-3 bg-gray-50 rounded border">
                  <MapPin className="w-4 h-4 text-gray-600 ml-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 text-sm">{iftah.mufti.address}</span>
                </div>
              )}
            </div>

            {iftah.mufti.biography && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Biography</h4>
                <p className="text-gray-700 leading-relaxed text-sm">{cleanText(iftah.mufti.biography)}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
