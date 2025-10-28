"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import IslamicHeader from "../components/IslamicHeader";
import { getTranslation } from "@/lib/translations";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaDonate,
  FaHeart,
  FaInfoCircle,
  FaGlobe,
  FaRibbon,
  FaComments,
  FaPhone,
  FaHandsHelping,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaClock
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
  const t = (key: string): string => {
    return getTranslation(key, 'ps');
  };

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
        const donationsData = (response as any)?.data?.data || (response as any)?.data || [];

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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700 font-medium">{t('donation.loadingInfo')}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaInfoCircle className="text-red-600 text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Donation Information</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <IslamicHeader pageType="donation" />
      
   

      {/* Donation Methods Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
              {t('donation.chooseMethod')}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            {t('donation.chooseMethod')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4"
          >
            {t('donation.chooseMethodDesc')}
          </motion.p>
        </div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {donations.map((donation, index) => {
            const gradientColors = [
              'from-blue-500 to-blue-600',
              'from-green-500 to-green-600', 
              'from-yellow-500 to-orange-500',
              'from-purple-500 to-indigo-500',
              'from-red-500 to-pink-500',
              'from-teal-500 to-cyan-500'
            ];
            const currentGradient = gradientColors[index % gradientColors.length];
            
            return (
              <motion.div
                key={donation.id}
                variants={fadeIn}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row min-h-[300px]">
                  {/* Header Section */}
                  <div className={`bg-gradient-to-br ${currentGradient} text-white p-6 sm:p-8 lg:w-1/3 flex-shrink-0 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">{donation.branch_name}</h3>
                        <p className="text-white/90 text-sm font-medium">{donation.country}</p>
                      </div>
                      <p className="text-white/95 text-sm leading-relaxed">
                        {donation.description.replace(/<[^>]*>/g, '')}
                      </p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-8 lg:w-2/3 bg-gray-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {donation.whatsapp && (
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <FaWhatsapp className="text-white text-lg" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-white text-sm mb-1">{t('donation.whatsapp')}</p>
                            <p className="text-xs text-white/90">{donation.whatsapp}</p>
                          </div>
                        </div>
                      )}

                      {donation.email && (
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <FaEnvelope className="text-white text-lg" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-white text-sm mb-1">{t('donation.email')}</p>
                            <p className="text-xs text-white/90">{donation.email}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 sm:col-span-2">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <FaMapMarkerAlt className="text-white text-lg" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white text-sm mb-1">{t('donation.location')}</p>
                          <p className="text-xs text-white/90">{donation.address.replace(/<[^>]*>/g, '')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <motion.a
                        href={`https://wa.me/${donation.whatsapp?.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 bg-gradient-to-r ${currentGradient} text-white py-4 px-6 rounded-xl font-semibold text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-transparent hover:border-white/20`}
                      >
                        <FaWhatsapp className="text-xl" />
                        <span>{t('donation.contactWhatsapp')}</span>
                      </motion.a>
                      
                      {donation.email && (
                        <motion.a
                          href={`mailto:${donation.email}`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-slate-500 to-slate-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-transparent hover:border-white/20"
                        >
                          <FaEnvelope className="text-xl" />
                          <span>{t('donation.sendEmail')}</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Donation Instructions */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="bg-white/20 text-white px-6 py-2 rounded-full text-sm font-semibold">
                {t('donation.howToDonate')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('donation.howToDonate')}
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed px-4">
              {t('donation.howToDonateDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('donation.step1')}</h3>
              <p className="text-orange-100 leading-relaxed">{t('donation.step1Desc')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('donation.step2')}</h3>
              <p className="text-orange-100 leading-relaxed">{t('donation.step2Desc')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('donation.step3')}</h3>
              <p className="text-orange-100 leading-relaxed">{t('donation.step3Desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-green-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 text-gray-700"
          >
            <div className="flex items-center gap-3 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-green-600 text-lg sm:text-xl" />
              </div>
              <span className="font-bold text-base sm:text-lg">{t('donation.secure')}</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-blue-600 text-lg sm:text-xl" />
              </div>
              <span className="font-bold text-base sm:text-lg">{t('donation.verified')}</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaClock className="text-purple-600 text-lg sm:text-xl" />
              </div>
              <span className="font-bold text-base sm:text-lg">{t('donation.support')}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
