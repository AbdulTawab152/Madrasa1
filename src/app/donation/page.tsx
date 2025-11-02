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
    const translation = getTranslation(key, 'ps');
    return typeof translation === 'string' ? translation : key;
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
      <section className="py-20 sm:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <span>📋</span>
              <span>{t('donation.instructionTitle')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('donation.howToDonateTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('donation.howToDonateDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl font-bold">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-900">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">{t('donation.contactStep')}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{t('donation.contactStepDesc')}</p>
            </div>

            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl font-bold">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-900">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">{t('donation.donateStep')}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{t('donation.donateStepDesc')}</p>
            </div>

            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl font-bold">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-green-900">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">د مرستې تصدیق</h3>
              <p className="text-gray-600 leading-relaxed text-lg">د خپلو مرستو د رسیدلو تصدیق تر لاسه کړئ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      {/* <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <span>🛡️</span>
              <span>{t('donation.trustTitle')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('donation.trustTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('donation.trustDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group text-center bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">100% امن دی</h3>
              <p className="text-gray-600 leading-relaxed text-lg">ستاسو مرستې د لوړو امنیت معیارونو او تایید شوي حفاظت سره پروسس کیږي</p>
            </div>

            <div className="group text-center bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <FaCheckCircle className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{t('donation.verifiedTitle')}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{t('donation.verifiedDescription')}</p>
            </div>

            <div className="group text-center bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <FaClock className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">24/7 ملاتړ</h3>
              <p className="text-gray-600 leading-relaxed text-lg">موږ د ټولو پوښتنو او د مرستې اړتیاوو لپاره د ورځې او شپې ملاتړ وړاندې کوو</p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
