"use client";

import { useEffect, useState, use } from "react";
import { IftahApi } from "@/lib/api";
import { buildStorageUrl } from "@/lib/utils";
import { cleanText } from "@/lib/textUtils";
import {
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
  iftah_sub_category?: {
    id: number;
    name: string;
    tag_id?: number;
    tag?: {
      id: number;
      name: string;
    };
  };
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
    <div className="min-h-screen mt-40 md:mt-32 bg-white relative py-12 px-4">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60'  height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10">
        <main className="max-w-4xl mx-auto" dir="rtl">
        {/* Go Back Button */}
        <div className="mb-6 flex flex-wrap gap-3">
          {iftah.iftah_sub_category && (
            <Link
              href={`/iftah/sub-category/${iftah.iftah_sub_category.id}`}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg transition-all duration-300 group shadow-md"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to {iftah.iftah_sub_category.name}</span>
            </Link>
          )}
          {iftah.tag && (
            <Link
            href={`/iftah/category/${encodeURIComponent(iftah.tag.name)}`}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-all duration-300 group shadow-md"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to {iftah.tag.name}</span>
          </Link>
          )}
        </div>

        {/* Main Fatwa Document */}
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8">
          {/* Category/Breadcrumb */}
          <div className="mb-6">
            {/* Subcategory Info */}
            {iftah.iftah_sub_category && (
              <div className="mb-4 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Amiri, serif' }}>
                      {iftah.iftah_sub_category.name}
                    </h3>
                   
                  </div>
                </div>
              </div>
            )}
            
            {iftah.tag && (
              <div className="text-right">
                <p className="text-gray-600 text-sm mb-2">عبادات &gt; &gt; {iftah.tag.name}</p>
              </div>
            )}
          </div>

          {/* Question Number */}
          <div className="mb-6">
            <p className="text-gray-700 text-sm">سوال نمبر: {iftah.id}</p>
          </div>

          {/* Title - Inline Design */}
          <div className="mb-6 flex items-start gap-4 bg-blue-50 p-4 rounded-lg border-r-4 border-blue-600">
            <div className="flex-shrink-0">
              <p className="font-bold text-gray-900 whitespace-nowrap">عنوان:</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 leading-relaxed">{cleanText(iftah.title)}</p>
            </div>
          </div>

          {/* Question - Inline Design */}
          <div className="mb-8 flex items-start gap-4 bg-green-50 p-4 rounded-lg border-r-4 border-green-600">
            <div className="flex-shrink-0">
              <p className="font-bold text-gray-900 whitespace-nowrap">سوال:</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 leading-relaxed">{cleanText(iftah.question)}</p>
            </div>
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

          {/* Answer - Enhanced Design */}
          <div className="mb-8 flex items-start gap-4 bg-amber-50 p-4 rounded-lg border-r-4 border-amber-600">
            <div className="flex-shrink-0">
              <p className="font-bold text-gray-900 whitespace-nowrap">جواب:</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 leading-relaxed">{cleanText(iftah.answer)}</p>
            </div>
          </div>

          {/* Note if available - Enhanced Design */}
          {iftah.note && (
            <div className="mb-8 flex items-start gap-4 bg-purple-50 p-4 rounded-lg border-r-4 border-purple-600">
              <div className="flex-shrink-0">
                <p className="font-bold text-gray-900 whitespace-nowrap">نوٹ:</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed">{cleanText(iftah.note)}</p>
              </div>
            </div>
          )}

          {/* Closing */}
          <div className="mt-8 mb-6 text-center">
            <p className="text-xl text-gray-800 font-bold" style={{ fontFamily: 'serif' }}>
              واللہ تعالیٰ اعلم
            </p>
          </div>

          {/* Mufti/Author Information - Simplified */}
          {iftah.mufti && (
            <div className="mb-6 p-5 bg-white rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-right" style={{ fontFamily: 'Amiri, serif' }}>
                معلومات مفتی
              </h3>
              <div className="space-y-3 text-right" dir="rtl">
                <div className="flex items-center gap-3 py-2 justify-end">
                  <span className="text-gray-900 text-base">{cleanText(iftah.mufti.full_name)}</span>
                  <span className="font-semibold text-gray-700 text-base">بشپړ نوم:</span>
                </div>
                {iftah.mufti.father_name && (
                  <div className="flex items-center gap-3 py-2 justify-end">
                    <span className="text-gray-900 text-base">{cleanText(iftah.mufti.father_name)}</span>
                    <span className="font-semibold text-gray-700 text-base">د پلار نوم:</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Institution Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700">دار الافتاء،</p>
            <p className="text-sm text-gray-700">اَلْجَامِعْةُ اَنوَار الْعُلُوْم اَلْاِسْلاَمِیّة اَلْمَدْرَسَةٌ خلیفه صاحب ارغندی (رح)</p>
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
        </main>
      </div>
    </div>
  );
}
