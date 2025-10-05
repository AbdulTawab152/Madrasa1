"use client";

import { useState } from "react";
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiSend, FiMapPin, FiClock } from "react-icons/fi";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa6";
import { ContactApi } from "@/lib/api";

// Mock FAQ data (replace with your actual FAQDate import)


function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await ContactApi.submit(formData);

      if (!response.success) {
        throw new Error(response.error || "Something went wrong");
      }

      setStatus("✅ Message sent successfully!");
   
    } catch (err) {
      setStatus("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 py-16">
      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        {/* Left Info */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="flex gap-4 mb-8">
              <a href="#" className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center hover:bg-amber-700 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaWhatsapp className="text-xl" />
              </a>
              <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" className="w-12 h-12 bg-pink-500 text-white rounded-xl flex items-center justify-center hover:bg-pink-600 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaInstagram className="text-xl" />
              </a>
            </div>

            <div className="space-y-6">
              <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-amber-100 transition-all ">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                  <FaMapMarkerAlt className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Address</h3>
                  <p className="text-gray-600">410 Sandtown, California 94001, USA</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-amber-100 transition-all">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                  <FaPhone className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Contact</h3>
                  <p className="text-gray-600 mb-1">888-123-4567</p>
                  <p className="text-gray-600">info@example.com</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-amber-100 transition-all  group">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                  <FaClock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Opening Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 10:30am - 7:00pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:w-1/2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100" id="contact-form">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h3>
            <p className="text-gray-600 mb-8">We'll respond as soon as possible</p>
          
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-gray-400 z-10" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-lg"
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-gray-400 z-10" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-lg"
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute left-4 top-4 text-gray-400 z-10" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-lg"
                />
              </div>

              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-400 z-10" />
                <textarea
                  name="message"
                  placeholder="Your Message*"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-lg resize-none"
                ></textarea>
              </div>


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-sm disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    Send Message
                  </>
                )}
              </button>

              {status && (
                <div className={`rounded-xl p-4 text-center ${status.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
