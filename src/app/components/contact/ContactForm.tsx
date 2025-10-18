"use client";

import { useState } from "react";
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiSend, FiMapPin, FiClock } from "react-icons/fi";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa6";
import { ContactApi } from "@/lib/api";
import { useTranslation } from "@/hooks/useTranslation";

// Mock FAQ data (replace with your actual FAQDate import)


function Contact() {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.pleaseEnterName');
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.pleaseEnterEmail');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.validation.validEmailAddress');
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.pleaseEnterMessage');
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      setStatus("❌ " + t('contact.fillRequiredFields'));
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await ContactApi.submit(formData);

      if (!response.success) {
        throw new Error(response.error || "Something went wrong");
      }

      setStatus("✅ " + t('contact.messageSentSuccess'));
      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
   
    } catch (err) {
      setStatus("❌ " + t('contact.failedToSend'));
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 py-8 sm:py-16">
      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Info */}
        <div className="lg:w-1/2 space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('contact.getInTouch')}</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              {t('contact.loveToHear')}
            </p>

            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center hover:bg-amber-700 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaFacebook className="text-lg sm:text-xl" />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaWhatsapp className="text-lg sm:text-xl" />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaYoutube className="text-lg sm:text-xl" />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 text-white rounded-xl flex items-center justify-center hover:bg-pink-600 transition-all transform hover:-translate-y-1 shadow-sm">
                <FaInstagram className="text-lg sm:text-xl" />
              </a>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-amber-100 transition-all">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-amber-200 transition-colors">
                  <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">{t('contact.address')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">410 Sandtown, California 94001, USA</p>
                </div>
              </div>

              <div className="flex items-start p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-amber-100 transition-all">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-amber-200 transition-colors">
                  <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">{t('contact.contact')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">888-123-4567</p>
                  <p className="text-sm sm:text-base text-gray-600">info@example.com</p>
                </div>
              </div>

              <div className="flex items-start p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-amber-100 transition-all group">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-amber-200 transition-colors">
                  <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">{t('contact.openingHours')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">Mon - Fri: 10:30am - 7:00pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:w-1/2">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-amber-100" id="contact-form">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('contact.sendMessage')}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">{t('contact.respondSoon')}</p>
          
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="relative">
                <FiUser className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 z-10" />
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.yourName') + '*'}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-sm sm:text-base ${
                    errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-200"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <FiMail className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 z-10" />
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.yourEmail') + '*'}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-sm sm:text-base ${
                    errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <FiPhone className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 z-10" />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.yourPhone')}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <FiMessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 z-10" />
                <textarea
                  name="message"
                  placeholder={t('contact.yourMessage') + '*'}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white text-sm sm:text-base resize-none ${
                    errors.message ? "border-red-300 focus:ring-red-500" : "border-gray-200"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.message}
                  </p>
                )}
              </div>


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 sm:py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-sm disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    <FiSend className="text-base sm:text-lg" />
                    {t('contact.sendMessageButton')}
                  </>
                )}
              </button>

              {status && (
                <div className={`rounded-xl p-3 sm:p-4 text-center text-sm sm:text-base ${status.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
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
