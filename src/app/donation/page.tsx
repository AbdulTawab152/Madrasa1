"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaDonate,
  FaHeart,
  FaInfoCircle,
  FaGlobe,
  FaRibbon,
  FaComments
} from "react-icons/fa";
import { useState, useEffect } from "react";
import {DonationApi} from "../../lib/api";

interface DonationInfo {
  id: number;
  branch_name: string;
  address: string;
  description: string;
  contact: string;
  email: string;
  whatsapp: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export default function DonationPage() {
  const [donations, setDonations] = useState<DonationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from DonationApi
        const response = await DonationApi.getAll(); // Make sure endpoint matches your backend
        const donationsData = response?.data?.data || response?.data || [];

        setDonations(Array.isArray(donationsData) ? donationsData : []);
      } catch (err) {
        console.error("Error fetching donation data:", err);
        setError(
          "Failed to load donation information. Please try again later."
        );
        setDonations([]); // No static fallback
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen mt-32 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading donation information...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen mt-32 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen mt-32 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold leading-tight"
          >
            Transform <span className="text-gray-900 bg-white/80 px-3 py-1 rounded-lg">Lives</span>
            <br />
            With Your <span className="text-yellow-300">Generosity</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-orange-50"
          >
            Your generosity fuels education, food, and healthcare for people in need.
            Together we can create lasting change with just one donation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2 group">
              <FaDonate className="text-lg group-hover:scale-110 transition-transform" /> Donate Now
            </button>
            <Link href={`/contact`} 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2 group">
              <FaComments className="text-lg group-hover:scale-110 transition-transform" /> Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Organization Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800"
          >
            Trusted Organizations Making a Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-2 text-gray-600 max-w-2xl mx-auto"
          >
            Discover organizations creating positive change around the world
          </motion.p>
        </div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {donations.map((donation) => (
            <motion.div
              key={donation.id}
              variants={fadeIn}
              className="bg-white rounded-2xl overflow-hidden flex flex-col hover: transition-all duration-300  group"
            >
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 relative">
                <div className="absolute top-4 right-4 p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <FaHeart className="text-white" />
                </div>
                <div className="mt-10 mb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold">{donation.branch_name}</h3>
                    <span className="text-xs bg-amber-600/90 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center gap-1">
                      <FaRibbon className="text-white" /> Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-amber-100">
                    <FaGlobe className="text-amber-200" />
                    <span className="text-sm">{donation.country}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-gray-600 mb-6">{donation.description.replace(/<[^>]*>/g, '')}</p>

                  <div className="flex items-center gap-2 pl-4 mb-4">
                    <FaWhatsapp className="text-green-500" />
                    <span className="text-gray-700">{donation.whatsapp}</span>
                  </div>

                  <div className="mb-6 pl-4">
                    <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-orange-500" /> Location
                    </p>
                    <p className="text-sm text-gray-600">{donation.address.replace(/<[^>]*>/g, '')}</p>
                  </div>
                </div>

               
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
