"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Awlyaa } from "../../lib/types";
import { AwlyaaApi } from "../../lib/api";
import { motion } from "framer-motion";
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
    <div className="min-h-screen mt-20 md:mt-10 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white pt-32 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10% left-10% w-72 h-72 bg-white rounded-full"></div>
          <div className="absolute top-60% left-80% w-96 h-96 bg-amber-300 rounded-full"></div>
          <div className="absolute top-20% left-70% w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaRibbon className="text-amber-200" />
              <span className="text-amber-100 text-sm">
                Distinguished Community
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Meet Our <span className="text-amber-200">Awlyaa</span>
            </h1>

            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-10">
              Discover the exceptional individuals who shape our community with
              their expertise, passion, and dedication to making a difference.
            </p>

            {/* <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <FaUsers className="text-lg" /> Join Our Community
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <FaStar className="text-lg" /> Become an Awlyaa
              </motion.button>
            </div> */}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
          >
            {[
              { value: "100+", label: "Awlyaa Members" },
              { value: "25+", label: "Countries" },
              { value: "15+", label: "Expertise Fields" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/20"
              >
                <div className="text-2xl md:text-3xl font-bold text-amber-200">
                  {stat.value}
                </div>
                <div className="text-orange-100 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 -mt-16 relative z-20">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Find Your Expert
              </h2>
              <p className="text-gray-600">
                Browse our community of distinguished Awlyaa
              </p>
            </div>

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
                          src={`https://lawngreen-dragonfly-304220.hostingersite.com/storage/${item.profile_image}`}
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
                      <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {item.name}
                      </h2>

                      {item.title && (
                        <div className="flex items-center gap-2 mb-4">
                          <FaAward className="text-orange-500 flex-shrink-0" />
                          <p className="text-gray-600 line-clamp-2">
                            {item.title}
                          </p>
                        </div>
                      )}

                      <p>
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

        {/* Testimonial Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <FaQuoteLeft className="text-4xl text-orange-200 mb-6" />
              <p className="text-xl md:text-2xl font-light mb-6">
                Being part of the Awlyaa community has allowed me to connect with incredible minds, share knowledge, and grow both personally and professionally. It's more than a network—it's a family.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold">SA</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Ahmed</p>
                  <p className="text-orange-200">Senior Awlyaa Member</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Join Our Community?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Apply to become an Awlyaa and connect with like-minded professionals, share your expertise, and grow your influence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md flex items-center gap-2"
              >
                <FaStar className="text-lg" /> Apply Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FaUsers className="text-lg" /> Learn More
              </motion.button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
