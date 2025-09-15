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
  FaHeart,
  FaShareAlt,
  FaInfoCircle,
  FaGlobe,
  FaUsers,
  FaRibbon,
  FaComments
} from "react-icons/fa";
import { useState, useEffect } from "react";

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
        const response = await fetch(
          "https://lawngreen-dragonfly-304220.hostingersite.com/api/donate-info-for-web"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setDonations(data);
      } catch (err) {
        console.error("Error fetching donation data:", err);
        setError("Failed to load donation information. Please try again later.");
        
        // Fallback to sample data if API fails
        setDonations([
          {
            id: 1,
            branch_name: "Kellie Nielsen",
            address: "Ut esse, ut rem expe.",
            contact: "607",
            description: "Eligendi perspiciatis adipisci est consequat Quidem quas",
            email: "mefurydin@mailinator.com",
            whatsapp: "359",
            country: "Sint voluptas iusto assumenda sit repudiandae",
            created_at: "2025-08-16T11:56:56.000000Z",
            updated_at: "2025-08-16T11:56:56.000000Z"
          },
          {
            id: 2,
            branch_name: "Global Aid Relief",
            address: "45 Community Road, London",
            contact: "+44 987 654 321",
            description: "Focused on healthcare and educational support for children in need across the UK.",
            email: "contact@globalaid.org",
            whatsapp: "+44987654321",
            country: "UK",
            created_at: "2025-08-16T11:56:56.000000Z",
            updated_at: "2025-08-16T11:56:56.000000Z"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Animation variants
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

  // Fallback category if API data doesn't include category
  const getCategoryForId = (id: number) => {
    const categories = [
      "Education & Shelter",
      "Healthcare & Education",
      "Mental Health & Emergency",
      "Environment & Sustainability"
    ];
    return categories[id % categories.length];
  };

  // Fallback impact if API data doesn't include impact


  // Generate a color based on organization ID for consistent branding
  const getColorForId = (id: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-orange-500 to-orange-600",
      "from-teal-500 to-teal-600",
      "from-pink-500 to-pink-600"
    ];
    return colors[id % colors.length];
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

  return (
    <main className="min-h-screen mt-32 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] bg-repeat" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200 rounded-full opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold leading-tight"
          >
            Transform <span className="text-gray-900 bg-white/80 px-3 py-1 rounded-lg">Lives</span>  
            <br />With Your <span className="text-yellow-300">Generosity</span>
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
            <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2 group">
              <FaComments className="text-lg group-hover:scale-110 transition-transform" /> Contact Us
            </a>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          <div className="w-64 h-64 bg-white opacity-5 rounded-t-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-800 text-white py-16 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] bg-repeat"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "250+", label: "Projects Funded" },
              { value: "50k+", label: "Lives Impacted" },
              { value: "15+", label: "Countries Served" },
              { value: "98%", label: "Direct to Cause" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-600/30"
              >
                <div className="text-4xl font-bold text-orange-400">{stat.value}</div>
                <div className="mt-2 text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
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
        className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border border-orange-100 group"
      >
        {/* Header with orange gradient background */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 relative">
          <div className="absolute top-4 right-4 p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
            <FaHeart className="text-white" />
          </div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-amber-600/90 backdrop-blur-sm text-white rounded-full text-sm font-medium">
              {getCategoryForId(donation.id)}
            </span>
          </div>
          
          <div className="mt-10 mb-2">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold">
                {donation.branch_name}
              </h3>
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
            <p className="text-gray-600 mb-6">
              {donation.description.replace(/<[^>]*>/g, '')}
            </p>
            
            <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" /> Location
              </h4>
              <p className="text-sm text-gray-600">{donation.address.replace(/<[^>]*>/g, '')}</p>
            </div>
            
          
          </div>
          
          <div className="mt-6">
            <a href="#contact" className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium shadow-md transition-all flex items-center justify-center gap-2 group">
              <FaInfoCircle className="group-hover:scale-110 transition-transform" /> Learn More & Contact
            </a>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
</section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-200 rounded-full opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-300 rounded-full opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 text-center mb-4"
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          >
            Reach out to our partner organizations directly through their preferred contact methods
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-orange-600 mb-6">Contact Methods</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaWhatsapp className="text-green-500" /> WhatsApp
                  </h4>
                  <div className="grid gap-3">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-800">{donation.branch_name}</p>
                          <p className="text-sm text-gray-600">{donation.whatsapp}</p>
                        </div>
                        <a
                          href={`https://wa.me/${donation.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                        >
                          <FaWhatsapp /> Message
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaEnvelope className="text-orange-500" /> Email
                  </h4>
                  <div className="grid gap-3">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-800">{donation.branch_name}</p>
                          <p className="text-sm text-gray-600">{donation.email}</p>
                        </div>
                        <a
                          href={`mailto:${donation.email}`}
                          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                        >
                          <FaEnvelope /> Email
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaPhone className="text-orange-500" /> Phone
                  </h4>
                  <div className="grid gap-3">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <p className="font-medium text-gray-800">{donation.branch_name}</p>
                          <p className="text-sm text-gray-600">{donation.contact}</p>
                        </div>
                        <a
                          href={`tel:${donation.contact.replace(/\D/g, "")}`}
                          className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                        >
                          <FaPhone /> Call
                        </a>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-orange-600 mb-6">Send a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Organization
                  </label>
                  <select
                    id="organization"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Choose an organization</option>
                    {donations.map((donation) => (
                      <option key={donation.id} value={donation.id}>
                        {donation.branch_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all shadow-md"
                >
                  Send Message
                </button>
              </form>
              
              <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-orange-600" /> Need help choosing?
                </h4>
                <p className="text-sm text-orange-700">
                  Not sure which organization to contact? Email us at <a href="mailto:help@donations.org" className="font-medium underline">help@donations.org</a> and we'll help you find the right match for your donation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="bg-orange-500 py-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-300 rounded-full opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            Ready to Make an Impact?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-orange-100 max-w-2xl mx-auto"
          >
            Your donation can change lives. Choose how you want to contribute and join our community of changemakers.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2 group">
              <FaDonate className="text-lg group-hover:scale-110 transition-transform" /> Donate Now
            </button>
            <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2 group">
              <FaComments className="text-lg group-hover:scale-110 transition-transform" /> Contact Us
            </a>
          </motion.div>
        </div>
      </section> */}

      {/* Newsletter Section */}
      
    </main>
  );
}