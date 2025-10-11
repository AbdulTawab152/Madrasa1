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
  FaEyeSlash,
  FaArrowRight,
  FaCalendar
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
  const [showQuestionFormModal, setShowQuestionFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    question: "",
  });
  const [submittedQuestions, setSubmittedQuestions] = useState<any[]>([]);
  const [showQuestionsList, setShowQuestionsList] = useState(false);

  // Helper function to check if form is valid
  const isFormValid = () => {
    return form.name.trim().length >= 2 && 
           /^[a-zA-Z\s\u0600-\u06FF]+$/.test(form.name.trim()) &&
           form.email.trim() && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
           form.question.trim().length >= 15 &&
           form.question.trim().length <= 1000 &&
           (!form.phone.trim() || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(form.phone.trim())) &&
           (!form.whatsapp.trim() || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(form.whatsapp.trim()));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      question: "",
    };

    let isValid = true;

    // Validate name
    if (!form.name.trim()) {
      newErrors.name = "Please add your name";
      isValid = false;
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    } else if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(form.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
      isValid = false;
    }

    // Validate email
    if (!form.email.trim()) {
      newErrors.email = "Please add your email address";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone (optional but if provided, must be valid)
    if (form.phone.trim() && !/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Please add a valid phone number";
      isValid = false;
    }

    // Validate WhatsApp (optional but if provided, must be valid)
    if (form.whatsapp.trim() && !/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(form.whatsapp.trim())) {
      newErrors.whatsapp = "Please add a valid WhatsApp number";
      isValid = false;
    }

    // Validate question
    if (!form.question.trim()) {
      newErrors.question = "Please add your Islamic question";
      isValid = false;
    } else if (form.question.trim().length < 15) {
      newErrors.question = "Please write a more detailed question (at least 15 characters)";
      isValid = false;
    } else if (form.question.trim().length > 1000) {
      newErrors.question = "Question is too long (maximum 1000 characters)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate form before submitting
    if (!validateForm()) {
      setError("Please fill in all required fields correctly.");
      return;
    }
    
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
      
      // Store the submitted question
      setSubmittedQuestions(prev => [newQuestion, ...prev]);
      
      // Show success modal
      setShowSuccessModal(true);
      setShowQuestionFormModal(false);
      
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Section - Compact Design */}
      <div className="relative mb-8 sm:mb-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Content */}
              <div className="flex-1 text-white">
                <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-xs font-semibold mb-4 border border-white/30">
                  <FaQuestionCircle className="mr-2 text-sm" />
                  <span>Islamic Q&A</span>
                  <div className="ml-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                  Seek Divine Guidance
                </h1>
                
                <p className="text-sm sm:text-base mb-6 opacity-95 leading-relaxed max-w-lg">
                  Get authentic Islamic answers from qualified scholars based on Quran and Sunnah.
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                  <div className="flex items-center">
                    <FaCheckCircle className="mr-1.5 text-green-300 text-xs" />
                    <span className="opacity-90">Expert Scholars</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="mr-1.5 text-green-300 text-xs" />
                    <span className="opacity-90">Quick Response</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="mr-1.5 text-green-300 text-xs" />
                    <span className="opacity-90">Free Service</span>
                  </div>
                </div>
              </div>

              {/* Right Content - CTA */}
              <div className="flex flex-col items-center md:items-end">
                <div className="text-center md:text-right mb-4">
                  <div className="text-4xl sm:text-5xl mb-2">📿</div>
                  <h3 className="text-lg font-semibold mb-1">Ask Your Question</h3>
                  <p className="text-amber-100 text-xs">Get personalized guidance</p>
                </div>
                
                <button
                  onClick={() => setShowQuestionFormModal(true)}
                  className="flex items-center justify-center px-3 py-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:via-orange-500 hover:to-amber-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-100 border border-amber-200"
                >
                  <FaQuestionCircle className="mr-1 text-base" />
                  <span className="">Ask a Question</span>
                </button>
                
              
              </div>
            </div>
          </div>

          {/* Stats Section */}
       
        </div>
      </div>

      {/* Questions List Section */}
      {submittedQuestions.length > 0 && (
        <div className="mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 sm:px-8 sm:py-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Submitted Questions</h2>
                  <p className="text-sm text-gray-600">Track your Islamic questions and their status</p>
                </div>
                <button
                  onClick={() => setShowQuestionsList(!showQuestionsList)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <FaEye className="text-sm" />
                  {showQuestionsList ? "Hide Questions" : "View Questions"}
                </button>
              </div>
            </div>


            {/* Questions List */}
            {showQuestionsList && (
              <div className="px-6 py-4 sm:px-8 sm:py-6">
                <div className="space-y-4">
                  {submittedQuestions.map((question) => (
                      <div key={question.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-gray-500">
                                {new Date(question.timestamp).toLocaleDateString()}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                question.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {question.status}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                              {question.question}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>By: {question.name}</span>
                              {question.email && <span>Email: {question.email}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {submittedQuestions.length === 0 && (
                    <div className="text-center py-8">
                      <FaQuestionCircle className="mx-auto text-gray-300 text-4xl mb-4" />
                      <p className="text-gray-500 text-sm">
                        No questions submitted yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Question Form Modal */}
      {showQuestionFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative overflow-hidden border border-amber-100 animate-fadeInUp">
            {/* Close Button */}
            <button
              onClick={() => setShowQuestionFormModal(false)}
              className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 hover:bg-white text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaTimes className="text-xs" />
            </button>

            {/* Form Header */}
            <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-6 sm:px-6 sm:py-8 text-white overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              
              <div className="relative text-center">
                <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold mb-2 border border-white/30">
                  <FaQuestionCircle className="mr-1 text-xs" />
                  <span>Ask Your Question</span>
                  <div className="ml-1 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                </div>
                
                <h2 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">Seek Islamic Guidance</h2>
                <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
                  Get authentic answers from qualified Islamic scholars based on Quran and Sunnah.
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-4 py-4 sm:px-6 sm:py-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              {/* Form Validation Summary */}
              {Object.values(errors).some(error => error !== "") && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">⚠️</span>
                    <div className="flex flex-wrap gap-1">
                      {errors.name && <span className="bg-red-100 px-2 py-1 rounded text-xs">{errors.name}</span>}
                      {errors.email && <span className="bg-red-100 px-2 py-1 rounded text-xs">{errors.email}</span>}
                      {errors.phone && <span className="bg-red-100 px-2 py-1 rounded text-xs">{errors.phone}</span>}
                      {errors.whatsapp && <span className="bg-red-100 px-2 py-1 rounded text-xs">{errors.whatsapp}</span>}
                      {errors.question && <span className="bg-red-100 px-2 py-1 rounded text-xs">{errors.question}</span>}
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-xs">
                      <div className="w-5 h-5 bg-amber-100 rounded-md flex items-center justify-center">
                        <FaUser className="text-amber-600 text-xs" />
                      </div>
                      Full Name *
                    </label>
                    <input 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      required 
                      className={`w-full border-2 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm hover:border-amber-300 text-xs sm:text-sm bg-gray-50 focus:bg-white ${
                        errors.name ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-xs">
                      <div className="w-5 h-5 bg-amber-100 rounded-md flex items-center justify-center">
                        <FaEnvelope className="text-amber-600 text-xs" />
                      </div>
                      Email Address *
                    </label>
                    <input 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                      className={`w-full border-2 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm hover:border-amber-300 text-xs sm:text-sm bg-gray-50 focus:bg-white ${
                        errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-xs">
                      <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                        <FaPhone className="text-blue-600 text-xs" />
                      </div>
                      Phone Number
                    </label>
                    <input 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      className={`w-full border-2 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm hover:border-amber-300 text-xs sm:text-sm bg-gray-50 focus:bg-white ${
                        errors.phone ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Enter phone number (optional)"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-xs">
                      <div className="w-5 h-5 bg-green-100 rounded-md flex items-center justify-center">
                        <FaWhatsapp className="text-green-600 text-xs" />
                      </div>
                      WhatsApp
                    </label>
                    <input 
                      name="whatsapp" 
                      value={form.whatsapp} 
                      onChange={handleChange} 
                      className={`w-full border-2 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm hover:border-amber-300 text-xs sm:text-sm bg-gray-50 focus:bg-white ${
                        errors.whatsapp ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Enter WhatsApp number (optional)"
                    />
                    {errors.whatsapp && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Question Section */}
                <div className="space-y-1">
                  <label className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-xs">
                    <div className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center">
                      <FaQuestionCircle className="text-purple-600 text-xs" />
                    </div>
                    Your Islamic Question *
                  </label>
                  <div className="relative">
                    <textarea 
                      name="question" 
                      value={form.question} 
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      required 
                      maxLength={1000}
                      className={`w-full border-2 rounded-lg px-2.5 py-2 min-h-[80px] sm:min-h-[100px] focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 shadow-sm hover:border-amber-300 resize-none text-xs sm:text-sm bg-gray-50 focus:bg-white pr-12 ${
                        errors.question ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Please write your Islamic question here (minimum 15 characters)..."
                    />
                    {/* Character Counter */}
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                      <span className={form.question.length > 900 ? "text-red-500" : form.question.length > 800 ? "text-yellow-500" : ""}>
                        {form.question.length}/1000
                      </span>
                    </div>
                  </div>
                  {errors.question && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.question}
                    </p>
                  )}
               
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl text-xs sm:text-sm transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative z-10">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FaQuestionCircle className="text-xs sm:text-sm relative z-10" />
                      <span className="relative z-10">Submit Question</span>
                      <FaArrowRight className="text-xs relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden border border-green-100 animate-fadeInUp">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50"></div>
            
            <div className="relative px-6 py-8 text-center">
              {/* Success Icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <FaCheckCircle className="text-white text-2xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
              
              {/* Success Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">Question Submitted!</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Your Islamic question has been submitted successfully. Our scholars will review and provide authentic guidance.
              </p>
              
              {/* Features */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-6 border border-amber-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-amber-500 text-xs" />
                    <span>24-48 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaStar className="text-amber-500 text-xs" />
                    <span>Expert Review</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
              >
                <span>Continue</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}