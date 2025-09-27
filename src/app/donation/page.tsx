"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import IslamicHeader from "../components/IslamicHeader";
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
  FaArrowRight,
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
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading donation information...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <IslamicHeader pageType="donation" title="Ways to Donate" />
      
   

      {/* Donation Methods Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Choose Your Donation Method
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We offer multiple secure and convenient ways for you to contribute to our cause
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
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Header Section */}
                  <div className={`bg-gradient-to-br ${currentGradient} text-white p-8 lg:w-1/3 flex-shrink-0`}>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{donation.branch_name}</h3>
                      <p className="text-white/80 text-sm">{donation.country}</p>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {donation.description.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {donation.whatsapp && (
                        <div className="flex items-center gap-3 p-3 bg-green-600 rounded-xl">
                          <FaWhatsapp className="text-white text-lg" />
                          <div>
                            <p className="font-semibold text-white text-sm">WhatsApp</p>
                            <p className="text-xs text-white">{donation.whatsapp}</p>
                          </div>
                        </div>
                      )}

                      {donation.email && (
                        <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-xl">
                          <FaEnvelope className="text-white text-lg" />
                          <div>
                            <p className="font-semibold text-white text-sm">Email</p>
                            <p className="text-xs text-white">{donation.email}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 p-3 bg-orange-600 rounded-xl md:col-span-2">
                        <FaMapMarkerAlt className="text-white text-lg" />
                        <div>
                          <p className="font-semibold text-white text-sm">Location</p>
                          <p className="text-xs text-white">{donation.address.replace(/<[^>]*>/g, '')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.a
                        href={`https://wa.me/${donation.whatsapp?.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 bg-gradient-to-r ${currentGradient} text-white py-3 px-6 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                      >
                        <FaWhatsapp className="text-lg" />
                        Contact via WhatsApp
                      </motion.a>
                      
                      {donation.email && (
                        <motion.a
                          href={`mailto:${donation.email}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FaEnvelope className="text-lg" />
                          Send Email
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
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              How to Make a Donation
            </h2>
            <p className="text-xl text-orange-100">
              Follow these simple steps to contribute to our cause
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Method</h3>
              <p className="text-orange-100">Select your preferred donation method from the options above</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Follow Instructions</h3>
              <p className="text-orange-100">Use the provided details to complete your donation</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Confirm Donation</h3>
              <p className="text-orange-100">Send us a message to confirm your donation and receive updates</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-green-600 text-xl" />
              <span className="font-semibold">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-600 text-xl" />
              <span className="font-semibold">Verified Organizations</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-purple-600 text-xl" />
              <span className="font-semibold">24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
