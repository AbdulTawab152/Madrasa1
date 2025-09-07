"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationsApi } from "../../../lib/api";
import { FaCalendarAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Graduation {
  id: number;
  title: string;
  slug: string;
  description: string;
  main_image?: string | null;
  graduation_year?: string | number;
  is_top?: boolean;
}

const getImageUrl = (img?: string | null) => {
  if (!img) return "/placeholder-graduation.jpg";
  if (img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

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
        if (!showAll) data = data.slice(0, 4);
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
    <section className="relative  overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/30"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl  px-4 sm:px-6 lg:px-8">
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

        {/* Clean Graduations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {graduations.map((grad, idx) => (
            <motion.div
              key={grad.id}
              className="group relative"
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
              {/* Clean Card Container */}
              <div className="relative bg-white rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-300 overflow-hidden group-hover:bg-gray-50/50">
                {/* Image Section */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={getImageUrl(grad.main_image)}
                    alt={grad.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Year Badge */}
                  <motion.div 
                    className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 text-xs font-semibold text-gray-900 rounded-lg flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <FaCalendarAlt className="text-orange-600 text-xs" />
                    <span>{grad.graduation_year || "N/A"}</span>
                  </motion.div>

                  {/* Featured Badge */}
                  {grad.is_top && (
                    <motion.div 
                      className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
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
                <div className="p-5 md:p-6">
                  <motion.h3 
                    className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {grad.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {grad.description}
                  </motion.p>

                  {/* Action Button */}
                  <Link href={`/graduated-students/${grad.slug}`}>
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-lg transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>View Details</span>
                      <FaArrowRight className="text-xs" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clean View All Button */}
        {!showAll && graduations.length >= 4 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/graduated-students">
              <motion.button
                className="px-8 py-3 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View All Graduations
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
