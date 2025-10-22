"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationsApi } from "../../../lib/api";
import { FaCalendarAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";
import PaginationControls from "@/components/PaginationControls";

interface Graduation {
  id: number;
  title: string;
  slug: string;
  description: string;
  main_image?: string | null;
  graduation_year?: string | number;
  is_top?: boolean;
}

interface GraduationsSectionProps {
  showAll?: boolean;
}

export default function GraduationsSection({ showAll = false }: GraduationsSectionProps) {
  const [graduations, setGraduations] = useState<Graduation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const PAGE_SIZE = 8;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await GraduationsApi.getAll(showAll ? {} : { page, limit: PAGE_SIZE });
        let data: Graduation[] = Array.isArray(res?.data) ? res.data : [];
        
        if (!showAll) {
          setGraduations(data);
          const pagination = (res as any)?.pagination;
          if (pagination && typeof pagination.totalPages === 'number') {
            setTotalPages(pagination.totalPages);
          } else {
            setTotalPages(data.length < PAGE_SIZE && page === 1 ? 1 : (data.length === PAGE_SIZE ? page + 1 : page));
          }
        } else {
          setGraduations(data);
          setTotalPages(null);
        }
      } catch (err) {
        console.error(err);
        setGraduations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [showAll, page]);

  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-600 font-medium">Loading graduations...</span>
      </motion.div>
    );
  }

  if (!graduations.length) {
    return (
      <motion.div 
        className="text-center py-20 bg-white/60 rounded-2xl border border-amber-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">🎓</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          No graduations found
        </h2>
        <p className="text-gray-500">Check back later for upcoming graduation events</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Graduations
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Celebrating the remarkable achievements of our esteemed graduates
          </p>
        </div>
       

        {/* Enhanced Graduations Grid */}
        <div className="relative">
          {/* Simpler, friendlier background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-amber-50 via-yellow-50 to-transparent blur-sm opacity-70 rounded-t-3xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {graduations.map((grad, idx) => (
              <motion.div
                key={grad.id}
                className="group"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.10,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.027,
                  boxShadow: "0 4px 24px 0 rgba(255,190,80,0.12)",
                  transition: { duration: 0.17, ease: "easeOut" },
                }}
              >
                <div className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-amber-100/70 hover:border-amber-200 hover:ring-1 hover:ring-amber-200 transition-all duration-300 overflow-hidden h-full">
                  {/* Profile/Main image */}
                  <div className="relative">
                    <Image
                      src={
                        getImageUrl(grad.main_image, "/placeholder-graduation.jpg")
                        || "/placeholder-graduation.jpg"
                      }
                      alt={grad.title}
                      width={420}
                      height={230}
                      className="w-full h-48 object-cover will-change-transform"
                    />

                    {/* Year badge */}
                    <div className="absolute top-3 right-3 rounded-lg px-3 py-1 bg-white/90 backdrop-blur-[2px] flex items-center gap-2 text-[11px] font-semibold text-amber-700 border border-amber-200 shadow-sm">
                      <FaCalendarAlt className="text-amber-400" />
                      <span>{grad.graduation_year || "N/A"}</span>
                    </div>
                    
                    {/* Top Graduate badge */}
                    {grad.is_top && (
                      <div className="absolute top-3 left-3 rounded-lg px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold flex items-center gap-1 text-[11px] shadow">
                        <FaStar className="text-white" /> Top Graduate
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col px-5 py-5">
                    {/* Title */}
                    <h3 className="text-lg font-extrabold tracking-tight mb-1 text-gray-900 group-hover:text-amber-800 transition-colors duration-200 line-clamp-2">
                      {grad.title}
                    </h3>
                    {/* Description */}
                     <p className="text-gray-600 text-[13px] leading-6 mb-2 line-clamp-3 group-hover:line-clamp-6 transition-[line-clamp] duration-200">
                       {grad.description?.replace(/<[^>]*>/g, "") || "No description available."}
                     </p>
                   

                    {/* Card chips */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-50/80 border border-yellow-200 text-yellow-700 text-[11px] font-medium">
                        <FaCalendarAlt className="text-yellow-400" />
                        <span>{grad.graduation_year || "N/A"}</span>
                      </span>
                      {grad.is_top && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-medium">
                          <FaStar className="text-yellow-400" /> Top
                        </span>
                      )}
                    </div>

                    <div className="mt-auto border-t border-amber-100/70 pt-4"></div>
                    {/* Action */}
                     <Link href={`/graduated-students/${grad.slug}`} className="w-full" aria-label="View graduation details">
                      <button
                        type="button"
                        className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-sm hover:shadow focus:outline-none mt-2 flex justify-center items-center gap-2"
                      >
                        <span>View Details</span>
                        <FaArrowRight className="ml-1 text-sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {!showAll && graduations.length > 0 && (
          <PaginationControls
            className="mt-10"
            page={page}
            totalPages={typeof totalPages === 'number' ? totalPages : null}
            hasNextPage={typeof totalPages === 'number' ? (page < totalPages) : (graduations.length === PAGE_SIZE)}
            hasPrevPage={page > 1}
            onPageChange={(p) => setPage(p)}
            isBusy={loading}
          />
        )}
    </div>
  );
}
