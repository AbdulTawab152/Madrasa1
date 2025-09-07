"use client";

import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaDonate,
  FaHandHoldingHeart,
  FaRegCreditCard,
} from "react-icons/fa";

interface DonationInfo {
  id: number;
  name: string;
  address: string;
  description: string;
  contact: string;
  email: string;
  whatsapp: string;
  country: string;
}

export default function DonationClient({ donations }: { donations: DonationInfo[] }) {
  if (!donations || donations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        No donation information available.
      </div>
    );
  }

  const [firstDonation, ...otherDonations] = donations;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        {/* Optional pattern.svg – safe fallback */}
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
              Together, We Can{" "}
              <span className="text-yellow-300">Change Lives</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-orange-50 max-w-lg">
              Your support helps us provide essential aid, resources, and hope
              to those who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Donation */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white shadow-lg rounded-2xl p-8 lg:flex lg:gap-8"
        >
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800">{firstDonation.name}</h2>
            <p className="mt-3 text-gray-600">{firstDonation.description}</p>

            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                {firstDonation.address}, {firstDonation.country}
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-orange-500" />
                {firstDonation.contact}
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-orange-500" />
                {firstDonation.email}
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-green-500" />
                {firstDonation.whatsapp}
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Other Donations */}
      {otherDonations.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Other Donation Centers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherDonations.map((donation) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {donation.name}
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-3">
                  {donation.description}
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-orange-500" />
                    {donation.address}, {donation.country}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone className="text-orange-500" />
                    {donation.contact}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope className="text-orange-500" />
                    {donation.email}
                  </li>
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Other Ways to Help */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Other Ways You Can Help
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-700/50 p-8 rounded-xl text-center"
            >
              <FaHandHoldingHeart className="mx-auto text-4xl text-orange-400" />
              <h3 className="mt-4 font-semibold text-lg">Volunteer</h3>
              <p className="mt-2 text-gray-300">
                Join our team of volunteers and make a direct impact in your
                community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-700/50 p-8 rounded-xl text-center"
            >
              <FaRegCreditCard className="mx-auto text-4xl text-orange-400" />
              <h3 className="mt-4 font-semibold text-lg">One-Time Donation</h3>
              <p className="mt-2 text-gray-300">
                Every contribution, big or small, helps us continue our mission.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-700/50 p-8 rounded-xl text-center"
            >
              <FaDonate className="mx-auto text-4xl text-orange-400" />
              <h3 className="mt-4 font-semibold text-lg">Monthly Giving</h3>
              <p className="mt-2 text-gray-300">
                Become a monthly donor and provide sustainable support to our
                programs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
