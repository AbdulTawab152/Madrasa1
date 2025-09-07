"use client";

import GraduationsSection from "../components/graduation/TopGraduations.tsx";
import { motion } from "framer-motion";
import { FaGraduationCap, FaStar, FaTrophy } from "react-icons/fa";

export default function GraduationsPage() {
  return(
<main className="min-h-screen mt-40 md:mt-32 bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
  {/* Enhanced Hero Section */}
  <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Multi-layered Background */}
    <div className="absolute inset-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/40"></div>
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-orange-200/40 to-yellow-200/40 rounded-full blur-3xl"
        animate={{ 
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"
        animate={{ 
          x: [0, -100, 0],
          y: [0, 80, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-orange-100/50 to-yellow-100/50 rounded-full blur-2xl"
        animate={{ 
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Geometric accent dots */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-orange-400/60 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-yellow-400/80 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-orange-300/70 rounded-full animate-pulse delay-2000"></div>
    </div>

    {/* Enhanced Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px'
      }} />
    </div>

    {/* Hero Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      {/* Enhanced Animated Badge */}
      <motion.div 
        className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 backdrop-blur-md border border-orange-200/50 text-orange-600 text-sm font-medium rounded-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <FaGraduationCap className="text-orange-500 text-sm" />
        </motion.div>
        <span className="text-sm">Graduation Events</span>
        <motion.div
          className="w-1.5 h-1.5 bg-orange-500 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Enhanced Heading */}
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Celebrate{" "}
        <span className="relative">
          <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            Achievements
          </span>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-orange-200/50 to-yellow-200/50 rounded-full -z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />
        </span>
        <br className="hidden md:block" />
        That{" "}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Inspire
          </span>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-300/60 to-orange-300/60 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          />
        </span>
      </motion.h1>

      {/* Enhanced Subtext */}
      <motion.p 
        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Join us in honoring the hard work, dedication, and success of our graduates.
        Explore upcoming and past graduation events filled with joy, pride, and unforgettable memories.
      </motion.p>

      {/* Enhanced Feature Icons */}
      <motion.div 
        className="flex justify-center items-center gap-6 md:gap-8 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-orange-100/50 hover:bg-white/80 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <FaTrophy className="text-sm" />
          </div>
          <span className="text-xs font-semibold text-gray-700">Excellence</span>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-yellow-100/50 hover:bg-white/80 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <FaStar className="text-sm" />
          </div>
          <span className="text-xs font-semibold text-gray-700">Achievement</span>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-orange-100/50 hover:bg-white/80 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <FaGraduationCap className="text-sm" />
          </div>
          <span className="text-xs font-semibold text-gray-700">Success</span>
        </motion.div>
      </motion.div>
    </div>
  </section>

  {/* Enhanced Content Section */}
  <section className="relative py-20 bg-white/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6">
      <GraduationsSection showAll={true} />
    </div>
  </section>
</main>
)}
