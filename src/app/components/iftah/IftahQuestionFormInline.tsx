"use client";
import { useState, useEffect } from "react";
import { IftahQuestionApi } from "@/lib/api";
import { 
  FaQuestionCircle, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaWhatsapp, 
  FaTimes, 
  FaCheckCircle, 
  FaBookOpen, 
  FaGraduationCap,
  FaStar,
  FaClock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

export default function IftahQuestionFormInline() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    question: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedQuestions, setSubmittedQuestions] = useState<any[]>([]);
  const [showRecentQuestions, setShowRecentQuestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🚀 Form submission started');
    console.log('📝 Form data being submitted:', form);
    
    setLoading(true);
    setSuccess("");
    setError("");
    
    try {
      const res = await IftahQuestionApi.submit(form);
      console.log('📤 API response:', res);
      
      if (!res.success) {
        throw new Error(res.error || "Failed to submit question");
      }
      
      console.log('✅ Form submitted successfully');
      setSuccess("Your question has been submitted successfully!");
      setForm({ name: "", email: "", phone: "", whatsapp: "", question: "" });
      
      // Add to submitted questions
      const newQuestion = {
        id: Date.now(),
        ...form,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      setSubmittedQuestions(prev => [newQuestion, ...prev]);
      
      // Show success modal
      setShowSuccessModal(true);
      setShowModal(false);
      
      // Auto-hide success modal after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        setSuccess("");
      }, 5000);
      
    } catch (err: any) {
      console.error('❌ Form submission error:', err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6 shadow-lg">
          <FaQuestionCircle className="text-white text-3xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Ask Islamic Scholars
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get authentic answers to your Islamic questions from qualified scholars. 
          Our experts are here to guide you with knowledge based on Quran and Sunnah.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200 text-center">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
          <p className="text-gray-600">Questions Answered</p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaGraduationCap className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
          <p className="text-gray-600">Qualified Scholars</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaStar className="text-white text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
          <p className="text-gray-600">Satisfaction Rate</p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Submit Your Question</h2>
              <p className="text-amber-100">Get authentic Islamic guidance from qualified scholars</p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <FaQuestionCircle className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-amber-600" />
                  Full Name *
                </label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm hover:border-gray-300" 
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-amber-600" />
                  Email Address *
                </label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm hover:border-gray-300" 
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone className="text-amber-600" />
                  Phone Number
                </label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm hover:border-gray-300" 
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaWhatsapp className="text-green-500" />
                  WhatsApp
                </label>
                <input 
                  name="whatsapp" 
                  value={form.whatsapp} 
                  onChange={handleChange} 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm hover:border-gray-300" 
                  placeholder="Enter your WhatsApp number"
                />
              </div>
            </div>

            {/* Question Section */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaQuestionCircle className="text-amber-600" />
                Your Islamic Question *
              </label>
              <textarea 
                name="question" 
                value={form.question} 
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required 
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 min-h-[150px] focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all shadow-sm hover:border-gray-300 resize-none" 
                placeholder="Please write your Islamic question here. Be specific and provide context if needed..."
              />
              <p className="text-sm text-gray-500 mt-2">
                💡 Tip: Be specific about your question and provide any relevant context to get the best answer.
              </p>
            </div>

            {/* Status Messages */}
            {success && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
                <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl text-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Question...
                </>
              ) : (
                <>
                  <FaQuestionCircle className="text-xl" />
                  Submit Question
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Recent Questions Section */}
      {submittedQuestions.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FaClock className="text-amber-500" />
              Your Recent Questions
            </h3>
            <button
              onClick={() => setShowRecentQuestions(!showRecentQuestions)}
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
            >
              {showRecentQuestions ? <FaEyeSlash /> : <FaEye />}
              {showRecentQuestions ? 'Hide' : 'Show'} Questions
            </button>
          </div>
          
          {showRecentQuestions && (
            <div className="space-y-4">
              {submittedQuestions.slice(0, 3).map((question, index) => (
                <div key={question.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <FaQuestionCircle className="text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{question.name}</h4>
                        <p className="text-sm text-gray-500">{new Date(question.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      question.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : question.status === 'answered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {question.status}
                    </span>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{question.question}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fadeInUp border border-amber-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Question Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Your Islamic question has been submitted successfully. Our scholars will review and respond to your question soon.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}