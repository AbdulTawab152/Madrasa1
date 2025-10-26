"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Awlyaa } from "../../lib/types";
import { AwlyaaApi } from "../../lib/api";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";
import IslamicHeader from "../components/IslamicHeader";
import UnifiedLoader from "@/components/loading/UnifiedLoader";
import ErrorDisplay from "@/components/ErrorDisplay";
import { NoDataEmptyState } from "@/components/EmptyState";
import {
  FaUser,
  FaAward,
  FaSearch,
  FaHeart,
  FaStar,
  FaUsers,
  FaGlobe,
  FaRibbon,
  FaQuoteLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function AwlyaaListPage() {
  const [awlyaa, setAwlyaa] = useState<Awlyaa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AwlyaaApi.getAll();
        setAwlyaa(res.data as Awlyaa[]);
      } catch (err: any) {
        setError(err.message || "Failed to fetch Awlyaa");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter awlyaa based on search term
  const filteredAwlyaa = awlyaa.filter(
    (item) =>
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return <UnifiedLoader variant="card-grid" count={6} showFilters={false} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <IslamicHeader pageType="awlayaa" />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <ErrorDisplay 
            error={error} 
            variant="full" 
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <IslamicHeader pageType="awlayaa" />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-20">
      

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-white to-orange-50 rounded-3xl p-10 border border-orange-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4 shadow-md">
                  <FaSearch className="text-white text-3xl" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">Find Your Scholar</h2>
                <p className="text-gray-600 text-lg">Search our collection of distinguished scholars by name, expertise, or location.</p>
              </div>
              
              <div className="relative max-w-3xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <FaSearch className="text-orange-500 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, expertise, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 text-lg transition-all duration-300 bg-white outline-none"
                />
                {searchTerm && (
                  <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                      aria-label="Clear search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              {searchTerm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center"
                >
                  <p className="text-orange-600 font-semibold text-base">
                    {filteredAwlyaa.length} scholar{filteredAwlyaa.length !== 1 ? 's' : ''} found
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>


        {/* Awlyaa Grid */}
        {filteredAwlyaa.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAwlyaa.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/awlayaa/${item.id}`}>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 group cursor-pointer h-full flex flex-col transform hover:-translate-y-1">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      {item.profile_image ? (
                        <img
                          src={
                            getImageUrl(item.profile_image, "/placeholder-awlyaa.jpg") ||
                            "/placeholder-awlyaa.jpg"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                              <FaUser className="text-4xl text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                              <FaStar className="text-white text-sm" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                          <FaHeart className="text-orange-500 text-lg" />
                        </div>
                        <div className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                          <FaUsers className="text-blue-500 text-lg" />
                        </div>
                      </div>

                      {/* Expertise Badge */}
                    
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h2>
                        {item.nickname && (
                          <p className="text-orange-600 font-medium text-sm mb-2">
                            "{item.nickname}"
                          </p>
                        )}
                        {item.title && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {item.title}
                          </p>
                        )}
                      </div>

                      {/* Age Information */}
                      {/* {item.age_at_death && (
                        <div className="mb-4 flex items-center justify-center">
                          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-full px-4 py-2">
                            <span className="text-orange-600 font-semibold text-sm">
                              Age: {item.age_at_death} years
                            </span>
                          </div>
                        </div>
                      )} */}

                      {/* Action Button */}
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center text-orange-600 text-sm font-medium">
                            View Profile
                          </span>
                          <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                            <FaArrowRight className="text-orange-500 group-hover:text-white transition-colors text-xs transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <NoDataEmptyState
            title="No Awlyaa Found"
            description="We couldn't find any scholars matching your search criteria. Try adjusting your search terms or browse all our distinguished Awlyaa."
            action={{
              label: "View All Awlyaa",
              onClick: () => setSearchTerm("")
            }}
            className="max-w-2xl mx-auto"
          />
        )}
      </div>
    </div>
  );
}
