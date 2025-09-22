"use client";

import { useState } from "react";
import { FaFacebook,  FaWhatsapp, FaMapMarkerAlt, FaClock, FaPhone,  } from "react-icons/fa";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiSend } from "react-icons/fi";

import "aos/dist/aos.css";
import { FaYoutube } from "react-icons/fa6";

// Mock FAQ data (replace with your actual FAQDate import)


function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);
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
      const res = await fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Something went wrong");

      setStatus("✅ Message sent successfully!");
      if (!saveInfo) {
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err) {
      setStatus("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen mt-32 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <div
              className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center animate-bounce shadow-lg transition-transform duration-300 hover:scale-110"
              style={{
                animation: "bounce 1.5s infinite",
              }}
            >
              <FiMessageSquare className="text-white text-2xl animate-pulse" />
            </div>
          </div>
          <h1 
         
            className="text-white text-4xl md:text-5xl font-bold mb-4"
          >
            Contact Us
          </h1>
          <p 
           
            className="text-white/90 z-50 text-lg md:text-xl max-w-2xl mx-auto"
          >
            We're here to answer your questions and explore opportunities to work together
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col-reverse md:flex-row gap-1 -mt-32 relative z-10">
        {/* Left Info */}
        <div className="space-y-8 text-xs md:text-xs lg:text-base">
          <div>
            <p className="text-blue-600 font-medium mb-2 text-xs md:text-xs lg:text-sm">CONTACT US</p>
            <h1 className="text-base md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">
              Let's start a conversation
            </h1>
            <p className="text-gray-600 text-xs md:text-xs lg:text-base leading-relaxed mb-6">
              Thank you for visiting my website! If you have any questions, or are interested in collaboration, I'd be happy to connect with you.
            </p>

            <div className="flex gap-2 mb-6">
              <a href="#" className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-md">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all transform hover:-translate-y-1 shadow-md">
                <FaWhatsapp className="text-xl" />
              </a>
              <a href="#" className="w-8 h-8 bg-red-700 text-white rounded-xl flex items-center justify-center hover:bg-red-800 transition-all transform hover:-translate-y-1 shadow-md">
                <FaYoutube className="text-xl" />
              </a>
            </div>

            <div className="space-y-4">
              <div className="flex items-start p-2 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 group">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 group-hover:bg-blue-200 transition-colors">
                  <FaMapMarkerAlt className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs md:text-xs lg:text-sm">Address</h3>
                  <p className="text-gray-600 text-xs md:text-xs lg:text-base">410 Sandtown, California 94001, USA</p>
                </div>
              </div>

              <div className="flex items-start p-2 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 group">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2 group-hover:bg-green-200 transition-colors">
                  <FaPhone className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs md:text-xs lg:text-sm">Contact</h3>
                  <p className="text-gray-600 text-xs md:text-xs lg:text-base">888-123-4567</p>
                  <p className="text-gray-600 text-xs md:text-xs lg:text-base">info@example.com</p>
                </div>
              </div>

              <div className="flex items-start p-2 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 group">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2 group-hover:bg-purple-200 transition-colors">
                  <FaClock className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs md:text-xs lg:text-sm">Opening Hours</h3>
                  <p className="text-gray-600 text-xs md:text-xs lg:text-base">Mon - Fri: 10:30am - 7:00pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white md:w-[500px] p-8  rounded-2xl shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Fill out the form</h3>
          <p className="text-gray-500 mb-6">We'll respond as soon as possible</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute left-4 top-4 text-gray-400 z-10" />
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
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
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute left-4 top-4 text-gray-400 z-10" />
              <input
                type="number"
                name="phone"
                placeholder="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-4 text-gray-400 z-10" />
              <textarea
                name="message"
                placeholder="Your Message*"
             
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              ></textarea>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={saveInfo}
                  onChange={() => setSaveInfo(!saveInfo)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 cursor-pointer">
                  Save information for the next time
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
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
              <div className={`rounded-lg p-3 text-center ${status.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* FAQ Section
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Quick answers to common questions about our services and support
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQDate.map((faq) => (
            <div 
              key={faq.id} 
              className="group bg-gray-50 rounded-xl transition-all hover:bg-gray-100 overflow-hidden"
              data-aos="fade-up"
            >
              <div 
                onClick={() => toggleFAQ(faq.id)}
                className="flex justify-between items-center p-5 font-semibold text-gray-900 cursor-pointer"
              >
                <span>{faq.title}</span>
                <span className="transition-transform duration-300 group-open:rotate-180 text-gray-500 ml-4 flex-shrink-0">
                  {activeFAQ === faq.id ? (
                    <span className="text-2xl font-bold">-</span>
                  ) : (
                    <span className="text-2xl font-bold">+</span>
                  )}
                </span>
              </div>
              {activeFAQ === faq.id && (
                <div className="px-5 pb-5 text-gray-600">{faq.desc}</div>
              )}
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
 
    </div>
  );
}

export default Contact;