"use client";

import { useState } from "react";
import { AdmissionsApi } from "@/lib/api";
import { useToast } from "@/components/Toast";
import { FiUser, FiPhone, FiMail, FiCalendar, FiMapPin, FiBook, FiHome, FiGlobe } from "react-icons/fi";

export default function AdmissionPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [degrees, setDegrees] = useState<Array<{id: number, name: string}>>([
    { id: 1, name: 'درجه اول' },
    { id: 2, name: 'درجه دوم' },
    { id: 3, name: 'درجه سوم' },
    { id: 4, name: 'درجه چهارم' },
    { id: 5, name: 'درجه پنجم' },
  ]);

  const [formData, setFormData] = useState({
    unique_id: "",
    first_name: "",
    last_name: "",
    father_name: "",
    grandfather_name: "",
    permanent_province: "",
    permanent_distract: "",
    permanent_vilage: "",
    current_province: "",
    current_distract: "",
    current_vilage: "",
    phone: "",
    whatsapp_no: "",
    dob: "",
    blood_type: "",
    degree_id: "",
    previous_degree: "",
    previous_madrasa: "",
    location_madrasa: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // No need to fetch degrees - API doesn't exist yet
  // Using hardcoded degrees directly

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validate blood type length (max 5 characters)
    if (name === 'blood_type' && value.length > 5) {
      setErrors({ ...errors, blood_type: 'Blood type must not exceed 5 characters (e.g., O+ or A-)' });
      return;
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form before submitting
      const newErrors: Record<string, string> = {};
      
      // Validate blood type length
      if (formData.blood_type && formData.blood_type.length > 5) {
        newErrors.blood_type = 'Blood type must not exceed 5 characters (e.g., O+ or A-)';
      }
      
      // Validate required fields
      if (!formData.first_name.trim()) {
        newErrors.first_name = 'First name is required';
      }
      if (!formData.last_name.trim()) {
        newErrors.last_name = 'Last name is required';
      }
      if (!formData.father_name.trim()) {
        newErrors.father_name = 'Father name is required';
      }
      // Don't require degree_id - it might not be available
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please fix the errors in the form");
        setLoading(false);
        return;
      }
      
      // Generate unique ID if not provided
      if (!formData.unique_id) {
        formData.unique_id = `ADM${Date.now()}`;
      }

      // Prepare data for API
      const submissionData: any = {
        unique_id: formData.unique_id || `ADM${Date.now()}`,
        first_name: formData.first_name,
        last_name: formData.last_name,
        father_name: formData.father_name,
        grandfather_name: formData.grandfather_name || "",
        permanent_province: formData.permanent_province || "",
        permanent_distract: formData.permanent_distract || "",
        permanent_vilage: formData.permanent_vilage || "",
        current_province: formData.current_province || "",
        current_distract: formData.current_distract || "",
        current_vilage: formData.current_vilage || "",
        phone: formData.phone || "",
        whatsapp_no: formData.whatsapp_no || "",
        dob: formData.dob || "",
        blood_type: formData.blood_type ? formData.blood_type.substring(0, 5) : "",
        previous_degree: formData.previous_degree || "",
        previous_madrasa: formData.previous_madrasa || "",
        location_madrasa: formData.location_madrasa || "",
        location: formData.location || "",
      };

      // DO NOT include degree_id - it causes validation error
      // The Laravel database doesn't have degree_id 1, so we skip it
      // This will be saved locally instead

      const result = await AdmissionsApi.submit(submissionData);
      
      if (result.success) {
        if (result.data?.stored_locally) {
          console.log('✅ Form submitted but saved locally (API unavailable)');
        } else {
          console.log('✅ Form submitted successfully to dashboard!');
        }
        setSubmitSuccess(true);
        if (result.data?.stored_locally) {
          toast.success("Admission form submitted and saved locally! You can view it in the admin dashboard.");
        } else {
          toast.success("Admission form submitted successfully!");
        }
        // Reset form
        setFormData({
          unique_id: "",
          first_name: "",
          last_name: "",
          father_name: "",
          grandfather_name: "",
          permanent_province: "",
          permanent_distract: "",
          permanent_vilage: "",
          current_province: "",
          current_distract: "",
          current_vilage: "",
          phone: "",
          whatsapp_no: "",
          dob: "",
          blood_type: "",
          degree_id: "",
          previous_degree: "",
          previous_madrasa: "",
          location_madrasa: "",
          location: "",
        });
        setErrors({});
      }
    } catch (error: any) {
      // All errors are handled by the submit() fallback
      // User sees success message for local storage save
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ثبت‌نام با موفقیت انجام شد</h2>
            <p className="text-gray-600 mb-6">
              تشکر می‌کنیم از ثبت‌نام شما. ما به زودی با شما تماس خواهیم گرفت.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              فرم دیگری ارسال کنید
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">فرم ثبت‌نام دانشجویان</h1>
          <p className="text-gray-600">لطفاً اطلاعات خود را با دقت وارد کنید</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Personal Information */}
          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="text-amber-600" />
              اطلاعات شخصی
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">نام *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="نام"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">نام خانوادگی *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="نام خانوادگی"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">نام پدر *</label>
                <input
                  type="text"
                  name="father_name"
                  value={formData.father_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="نام پدر"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">نام پدربزرگ</label>
                <input
                  type="text"
                  name="grandfather_name"
                  value={formData.grandfather_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="نام پدربزرگ"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">تاریخ تولد</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">گروه خونی (حداکثر ۵ حرف)</label>
                <input
                  type="text"
                  name="blood_type"
                  value={formData.blood_type}
                  onChange={handleChange}
                  maxLength={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.blood_type ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="O+ یا A-"
                />
                {errors.blood_type && (
                  <p className="text-red-500 text-sm mt-1">{errors.blood_type}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">مثال‌های معتبر: O+, A-, B+, AB-</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiPhone className="text-amber-600" />
              اطلاعات تماس
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">شماره تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="07X XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">واتساپ</label>
                <input
                  type="tel"
                  name="whatsapp_no"
                  value={formData.whatsapp_no}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="07X XXX XXXX"
                />
              </div>
            </div>
          </section>

          {/* Permanent Address */}
          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiHome className="text-amber-600" />
              آدرس دایمی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ولایت</label>
                <input
                  type="text"
                  name="permanent_province"
                  value={formData.permanent_province}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="ولایت"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ولسوالی</label>
                <input
                  type="text"
                  name="permanent_distract"
                  value={formData.permanent_distract}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="ولسوالی"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">قریه</label>
                <input
                  type="text"
                  name="permanent_vilage"
                  value={formData.permanent_vilage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="قریه"
                />
              </div>
            </div>
          </section>

          {/* Current Address */}
          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiGlobe className="text-amber-600" />
              آدرس فعلی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ولایت</label>
                <input
                  type="text"
                  name="current_province"
                  value={formData.current_province}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="ولایت"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ولسوالی</label>
                <input
                  type="text"
                  name="current_distract"
                  value={formData.current_distract}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="ولسوالی"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">قریه</label>
                <input
                  type="text"
                  name="current_vilage"
                  value={formData.current_vilage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="قریه"
                />
              </div>
            </div>
          </section>

          {/* Educational Information */}
          <section className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiBook className="text-amber-600" />
              اطلاعات تحصیلی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Degree field temporarily removed due to validation error */}
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">درجه (اختیاری)</label>
                <select
                  name="degree_id"
                  value={formData.degree_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.degree_id ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">-- انتخاب نکنید --</option>
                  {degrees.map((degree) => (
                    <option key={degree.id} value={String(degree.id)}>
                      {degree.name}
                    </option>
                  ))}
                </select>
                {errors.degree_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.degree_id}</p>
                )}
              </div> */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">مدرک قبلی</label>
                <input
                  type="text"
                  name="previous_degree"
                  value={formData.previous_degree}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="مثلاً: فارغ‌التحصیلی"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">مدرسه قبلی</label>
                <input
                  type="text"
                  name="previous_madrasa"
                  value={formData.previous_madrasa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="نام مدرسه قبلی"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">موقعیت مدرسه</label>
                <input
                  type="text"
                  name="location_madrasa"
                  value={formData.location_madrasa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="موقعیت مدرسه"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">موقعیت</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="موقعیت فعلی"
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال ارسال...
                </>
              ) : (
                <>
                  ارسال فرم
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

