"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationsApi } from "../../../lib/api";
import { FaCalendarAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";

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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GraduationsApi.getAll();
        let data: Graduation[] = Array.isArray(res?.data) ? res.data : [];
        if (!showAll) data = data.slice(0, 3);
        setGraduations(data);
      } catch (err) {
        console.error(err);
        setGraduations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [showAll]);

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
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">🎓</div>
        <h2 className="text-3xl font-bold text-gray-700 mb-2">
          No graduations found
        </h2>
        <p className="text-gray-500">Check back later for upcoming graduation events</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
        {/* Enhanced Section Header */}
        {/* <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mx-auto"></div>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Our{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                Graduations
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-orange-200/50 to-yellow-200/50 rounded-full -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Celebrating the remarkable achievements and unforgettable milestones of our esteemed graduates
          </motion.p>
        </motion.div> */}

        {/* Enhanced Graduations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graduations.map((grad, idx) => (
            <motion.div
              key={grad.id}
              className="group relative h-[480px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              {/* Enhanced Card Container */}
              <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-amber-100 hover:border-amber-200 transition-all duration-500 overflow-hidden group-hover:bg-gradient-to-br group-hover:from-amber-50/50 group-hover:to-orange-50/50 transform group-hover:-translate-y-2 h-full flex flex-col">
                {/* Image Section */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <Image
                  src={
                    getImageUrl(grad.main_image, "/placeholder-graduation.jpg") ||
                    "/placeholder-graduation.jpg"
                  }
                    alt={grad.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Year Badge */}
                  <motion.div 
                    className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-lg flex items-center gap-2 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <FaCalendarAlt className="text-amber-600 text-xs" />
                    <span>{grad.graduation_year || "N/A"}</span>
                  </motion.div>

                  {/* Featured Badge */}
                  {grad.is_top && (
                    <motion.div 
                      className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.3 + idx * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <FaStar className="text-yellow-200" /> 
                      <span>Featured</span>
                    </motion.div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <motion.h3 
                    className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300 line-clamp-2"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {grad.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {grad.description?.replace(/<[^>]*>/g, "")}
                  </motion.p>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <Link href={`/graduated-students/${grad.slug}`}>
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg transition-all duration-300 text-sm shadow-lg hover:shadow-xl outline-none focus:outline-none focus:ring-0"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>View Details</span>
                        <FaArrowRight className="text-xs" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

    </div>
  );
}
