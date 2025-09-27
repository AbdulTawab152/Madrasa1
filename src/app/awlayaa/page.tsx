"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Awlyaa } from "../../lib/types";
import { AwlyaaApi } from "../../lib/api";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";
import IslamicHeader from "../components/IslamicHeader";
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
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center mt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Awlyaa...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center mt-32">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <IslamicHeader pageType="awlayaa" />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-20">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-white rounded-2xl  p-6 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          

            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
              />
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
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-60 overflow-hidden">
                      {item.profile_image ? (
                        <img
                          src={
                            getImageUrl(item.profile_image, "/placeholder-awlyaa.jpg") ||
                            "/placeholder-awlyaa.jpg"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                          <div className="relative">
                            <FaUser className="text-5xl text-orange-400" />
                            <div className="absolute -top-1 -right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                              <FaStar className="text-white text-xs" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <FaHeart className="text-orange-500" />
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                          Expert
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {item.name}
                      </h2>

                  

                      <p className="text-sm pt-2">
                        <strong>Death:</strong>{" "}
                        {item.death_date
                          ? `${new Date(item.death_date).toDateString()} – ${
                              item.death_place
                            }, ${item.death_city}, ${item.death_country}`
                          : "Still Alive"}
                      </p>

                      {/* Mock Expertise Tags */}

                      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="inline-flex items-center text-orange-600 text-sm font-medium">
                          View Profile
                        </span>
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <FaArrowRight className="text-orange-500 group-hover:text-white transition-colors text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="text-gray-300 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Awlyaa Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all members
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              View All Awlyaa
            </button>
          </motion.div>
        )}

    

      
      </div>
    </div>
  );
}
