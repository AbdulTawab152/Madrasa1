"use client";
import { useState } from "react";
import { IftahQuestionApi } from "@/lib/api";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await IftahQuestionApi.submit(form);
      if (!res.success) throw new Error(res.error || "Failed to submit question");
      setSuccess("آپ کا سوال کامیابی سے جمع ہو گیا ہے۔");
      setForm({ name: "", email: "", phone: "", whatsapp: "", question: "" });
    } catch (err: any) {
      setError(err.message || "کچھ غلط ہو گیا ہے۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 mb-16">
      {/* Floating Ask Question Button */}
<div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 
                bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-gray-200">
  
  {/* Left Text */}
  <div className="text-center sm:text-left max-w-lg">
    <h2 className="text-2xl font-semibold text-gray-900">
      Have a question?
    </h2>
    <p className="mt-1 text-gray-600">
      Our scholars are here to help you anytime.
    </p>
  </div>

  {/* CTA Button */}
  <button
    onClick={() => setShowModal(true)}
    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-14 
               rounded-full shadow-md transition-all duration-200 focus:outline-none 
               focus:ring-4 focus:ring-orange-200"
  >
    Ask a Question
  </button>
</div>




      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeInUp">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-extrabold text-amber-700 mb-2 text-center">Ask a Question</h2>
            <p className="text-gray-600 text-center mb-4">Write your question below, our team will respond soon.</p>
            {success && <div className="text-green-600 text-center mb-2">{success}</div>}
            {error && <div className="text-red-600 text-center mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-amber-700 mb-1">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="w-full border border-amber-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block font-semibold text-amber-700 mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border border-amber-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-amber-700 mb-1">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-amber-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block font-semibold text-amber-700 mb-1">WhatsApp</label>
                  <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="w-full border border-amber-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-amber-700 mb-1">Question</label>
                <textarea name="question" value={form.question} onChange={handleChange} required className="w-full border border-amber-200 rounded-lg px-3 py-2 min-h-[100px] focus:ring-2 focus:ring-amber-400" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg shadow-md text-lg transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
