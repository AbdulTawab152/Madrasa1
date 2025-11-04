"use client";

import { useState, useEffect } from "react";
import { IftahQuestionApi, IftahApi } from "@/lib/api";
import { endpoints } from "@/lib/config";
import { useToast } from "@/components/Toast";
import { FiX, FiUser, FiMail, FiPhone, FiMessageSquare, FiSend, FiTag } from "react-icons/fi";

interface IftahQuestionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Tag {
  id: number;
  name: string;
  subcategories?: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  tagId?: number;
}

export default function IftahQuestionForm({ isOpen, onClose }: IftahQuestionFormProps) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingTags, setLoadingTags] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    question: "",
    tagId: "",
    iftah_sub_category_id: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    question: "",
    tagId: "",
    iftah_sub_category_id: "",
  });

  // Fetch tags with their subcategories from API when form opens
  useEffect(() => {
    if (isOpen) {
      const fetchTagsWithSubcategories = async () => {
        try {
          setLoadingTags(true);
          console.log('🏷️ [IFTAH FORM] Fetching tags and subcategories from API...');
          
          // Step 1: Fetch all tags
          let result = await IftahApi.getTags({ limit: 100 });
          
          // If local route fails, try direct API call as fallback
          if (!result.success || !result.data || (Array.isArray(result.data) && result.data.length === 0)) {
            console.log('🔄 [IFTAH FORM] Local route failed, trying direct API call...');
            try {
              const directResponse = await fetch(`${endpoints.iftahTags}?limit=100`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                cache: 'no-store'
              });
              
              if (directResponse.ok) {
                const directData = await directResponse.json();
                let tagsArray: any[] = [];
                if (Array.isArray(directData)) {
                  tagsArray = directData;
                } else if (directData.tags && Array.isArray(directData.tags)) {
                  tagsArray = directData.tags;
                } else if (directData.data && Array.isArray(directData.data)) {
                  tagsArray = directData.data;
                }
                
                result = {
                  success: true,
                  data: tagsArray,
                };
              }
            } catch (directError) {
              console.error('❌ [IFTAH FORM] Direct API call also failed:', directError);
            }
          }
          
          if (result.success) {
            // Handle different response formats
            let tagsArray: any[] = [];
            
            if (Array.isArray(result.data)) {
              tagsArray = result.data;
            } else if (result.data && typeof result.data === 'object' && result.data !== null) {
              const dataObj = result.data as any;
              if (dataObj.tags && Array.isArray(dataObj.tags)) {
                tagsArray = dataObj.tags;
                console.log('📊 [IFTAH FORM] Found tags in data.tags property');
              } else if (Array.isArray(dataObj.data)) {
                tagsArray = dataObj.data;
                console.log('📊 [IFTAH FORM] Found tags in data.data property');
              }
            }
            
            if (tagsArray.length > 0) {
              // Format tags
              const formattedTags = tagsArray.map((tag: any) => {
                const tagId = tag.id || tag.tagId || tag.ID;
                const tagName = tag.name || tag.tag_name || tag.title || tag.label || String(tagId || 'Unknown');
                
                return {
                  id: Number(tagId) || 0,
                  name: String(tagName).trim(),
                  subcategories: [] as SubCategory[],
                };
              })
              .filter(tag => tag.id > 0 && tag.name)
              .sort((a, b) => a.name.localeCompare(b.name));
              
              console.log(`✅ [IFTAH FORM] Found ${formattedTags.length} tag(s), fetching subcategories...`);
              
              // Step 2: Fetch subcategories for each tag
              const tagsWithSubcategories = await Promise.all(
                formattedTags.map(async (tag) => {
                  try {
                    // Fetch tag data which includes subcategories in the iftah items
                    const tagResult = await IftahApi.getTagById(tag.id);
                    
                    if (tagResult.success && tagResult.data?.data && Array.isArray(tagResult.data.data)) {
                      // Extract unique subcategories from the iftah items
                      const subcategoriesMap = new Map<number, SubCategory>();
                      
                      tagResult.data.data.forEach((item: any) => {
                        if (item.iftah_sub_category && item.iftah_sub_category.id) {
                          const subCat = item.iftah_sub_category;
                          if (!subcategoriesMap.has(subCat.id)) {
                            subcategoriesMap.set(subCat.id, {
                              id: subCat.id,
                              name: subCat.name || 'Unknown',
                              tagId: subCat.tagId || tag.id,
                            });
                          }
                        }
                      });
                      
                      const subcategories = Array.from(subcategoriesMap.values())
                        .sort((a, b) => a.name.localeCompare(b.name));
                      
                      console.log(`   📁 Tag "${tag.name}" (ID: ${tag.id}): ${subcategories.length} subcategory(ies)`);
                      
                      return {
                        ...tag,
                        subcategories: subcategories.length > 0 ? subcategories : undefined,
                      };
                    }
                  } catch (error) {
                    console.warn(`⚠️ [IFTAH FORM] Failed to fetch subcategories for tag ${tag.id}:`, error);
                  }
                  
                  return {
                    ...tag,
                    subcategories: undefined, // No subcategories or error
                  };
                })
              );
              
              // Filter: Only show tags that have subcategories, OR show all tags but only display subcategories if they exist
              // Based on user request: "when we have any tag but we don't have any subcategory that not showing in there"
              // This means: Show all tags, but only show subcategories dropdown if they exist
              const finalTags = tagsWithSubcategories;
              
              console.log(`✅ [IFTAH FORM] Successfully loaded ${finalTags.length} tag(s) with subcategories`);
              finalTags.forEach((tag) => {
                if (tag.subcategories && tag.subcategories.length > 0) {
                  console.log(`   ✓ ${tag.name} (ID: ${tag.id}): ${tag.subcategories.length} subcategory(ies)`);
                } else {
                  console.log(`   ⚠ ${tag.name} (ID: ${tag.id}): No subcategories`);
                }
              });
              
              setTags(finalTags);
            } else {
              console.warn('⚠️ [IFTAH FORM] No tags found in API response');
              toast.error('دسته‌بندی‌ها یافت نشد. لطفاً بعداً تلاش کنید.');
            }
          } else {
            console.error('❌ [IFTAH FORM] API request failed:', result.error);
            toast.error('خطا در بارگذاری دسته‌بندی‌ها');
          }
        } catch (error) {
          console.error('❌ [IFTAH FORM] Error fetching tags:', error);
          toast.error('خطا در بارگذاری دسته‌بندی‌ها');
        } finally {
          setLoadingTags(false);
        }
      };

      fetchTagsWithSubcategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      phone: "",
      whatsapp: "",
      question: "",
      tagId: "",
      iftah_sub_category_id: "",
    };

    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "نام الزامی است";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "لطفاً یک ایمیل معتبر وارد کنید";
      isValid = false;
    }

    // Validate question
    if (!formData.question.trim()) {
      newErrors.question = "سوال الزامی است";
      isValid = false;
    } else if (formData.question.trim().length < 10) {
      newErrors.question = "لطفاً سوال خود را به طور کامل توضیح دهید";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      return;
    }

    setLoading(true);

    try {
      // Prepare submission payload with tagId and iftah_sub_category_id if selected
      const submissionPayload: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        whatsapp: formData.whatsapp || undefined,
        question: formData.question,
      };
      
      // Include tagId if selected
      if (formData.tagId && formData.tagId.trim()) {
        submissionPayload.tagId = Number(formData.tagId);
        console.log('🏷️ [IFTAH FORM] Including tagId:', submissionPayload.tagId);
      }
      
      // Include iftah_sub_category_id if selected
      if (formData.iftah_sub_category_id && formData.iftah_sub_category_id.trim()) {
        submissionPayload.iftah_sub_category_id = Number(formData.iftah_sub_category_id);
        console.log('📁 [IFTAH FORM] Including iftah_sub_category_id:', submissionPayload.iftah_sub_category_id);
      }
      
      console.log('📤 [IFTAH FORM] Submission payload:', submissionPayload);
      
      const result = await IftahQuestionApi.submit(submissionPayload);

      if (result.success) {
        toast.success("سوال شما با موفقیت ارسال شد!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
          question: "",
          tagId: "",
          iftah_sub_category_id: "",
        });
        setErrors({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
          question: "",
          tagId: "",
          iftah_sub_category_id: "",
        });
        // Close modal after success
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const errorMsg = (result as any)?.error || (result as any)?.message || "خطا در ارسال سوال";
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error("❌ Error submitting question:", error);
      console.error("❌ Error details:", error.details);
      console.error("❌ Error status:", error.status);
      
      // Show more detailed error message
      let errorMessage = error.message || "خطا در ارسال سوال. لطفاً دوباره تلاش کنید.";
      
      if (error.status === 500) {
        // Get tag and subcategory names for better error messages
        const selectedTag = tags.find(tag => String(tag.id) === formData.tagId);
        const selectedSubCategory = selectedTag?.subcategories?.find(sub => String(sub.id) === formData.iftah_sub_category_id);
        
        const tagInfo = selectedTag ? `${selectedTag.name} (ID: ${selectedTag.id})` : (formData.tagId ? `ID: ${formData.tagId}` : '');
        const subCategoryInfo = selectedSubCategory ? `${selectedSubCategory.name} (ID: ${selectedSubCategory.id})` : (formData.iftah_sub_category_id ? `ID: ${formData.iftah_sub_category_id}` : '');
        
        if (error.message?.includes("tagId") || error.message?.includes("Column not found")) {
          errorMessage = `خطای پایگاه داده: ستون tagId در جدول iftah_questions وجود ندارد. ${tagInfo ? `دسته‌بندی انتخاب شده: ${tagInfo}. ` : ''}لطفاً به مدیر سیستم اطلاع دهید.`;
        } else if (error.message?.includes("iftah_sub_category_id")) {
          errorMessage = `خطای پایگاه داده: ستون iftah_sub_category_id در جدول iftah_questions وجود ندارد. ${subCategoryInfo ? `زیرمجموعه انتخاب شده: ${subCategoryInfo}. ` : ''}لطفاً به مدیر سیستم اطلاع دهید.`;
        } else {
          errorMessage = `خطای سرور (500). ${tagInfo || subCategoryInfo ? `(${tagInfo}${subCategoryInfo ? `, ${subCategoryInfo}` : ''}) ` : ''}لطفاً بعداً تلاش کنید یا با مدیر سیستم تماس بگیرید.`;
        }
      } else if (error.status === 422) {
        errorMessage = "داده‌های ارسالی نامعتبر است. لطفاً تمام فیلدها را بررسی کنید.";
      } else if (error.status === 401 || error.status === 403) {
        errorMessage = "خطای دسترسی. لطفاً صفحه را رفرش کنید و دوباره تلاش کنید.";
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">ارسال سوال</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="بستن"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              نام * <FiUser className="inline-block mr-1 text-amber-600" />
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="نام کامل خود را وارد کنید"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ایمیل * <FiMail className="inline-block mr-1 text-amber-600" />
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                errors.email ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="example@email.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Tag/Category Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              دسته‌بندی (اختیاری) <FiTag className="inline-block mr-1 text-emerald-600" />
              {loadingTags && (
                <span className="text-xs text-gray-500 mr-2">(در حال بارگذاری...)</span>
              )}
            </label>
            <select
              name="tagId"
              value={formData.tagId}
              onChange={(e) => {
                handleChange(e);
                // Reset subcategory when tag changes
                setFormData(prev => ({ ...prev, iftah_sub_category_id: "" }));
              }}
              disabled={loadingTags}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                errors.tagId ? "border-red-400" : "border-gray-200"
              } ${loadingTags ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <option value="">-- انتخاب دسته‌بندی (اختیاری) --</option>
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name} {tag.subcategories && tag.subcategories.length > 0 ? `(${tag.subcategories.length} زیرمجموعه)` : ''}
                  </option>
                ))
              ) : (
                !loadingTags && <option value="" disabled>هیچ دسته‌بندی یافت نشد</option>
              )}
            </select>
            {errors.tagId && (
              <p className="text-red-500 text-sm mt-1">{errors.tagId}</p>
            )}
            {tags.length === 0 && !loadingTags && (
              <p className="text-xs text-gray-500 mt-1">دسته‌بندی‌ها در حال بارگذاری هستند...</p>
            )}
          </div>

          {/* Subcategory Field - Only show if selected tag has subcategories */}
          {formData.tagId && (() => {
            const selectedTag = tags.find(tag => String(tag.id) === formData.tagId);
            const hasSubcategories = selectedTag?.subcategories && selectedTag.subcategories.length > 0;
            
            if (!hasSubcategories) return null;
            
            return (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  زیرمجموعه (اختیاری) <FiTag className="inline-block mr-1 text-teal-600" />
                </label>
                <select
                  name="iftah_sub_category_id"
                  value={formData.iftah_sub_category_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${
                    errors.iftah_sub_category_id ? "border-red-400" : "border-gray-200"
                  }`}
                >
                  <option value="">-- انتخاب زیرمجموعه (اختیاری) --</option>
                  {selectedTag.subcategories?.map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
                {errors.iftah_sub_category_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.iftah_sub_category_id}</p>
                )}
              </div>
            );
          })()}

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              شماره تلفن <FiPhone className="inline-block mr-1 text-amber-600" />
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="07X XXX XXXX"
            />
          </div>

          {/* WhatsApp Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              واتساپ <FiPhone className="inline-block mr-1 text-green-600" />
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="07X XXX XXXX"
            />
          </div>

          {/* Question Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              سوال * <FiMessageSquare className="inline-block mr-1 text-amber-600" />
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none ${
                errors.question ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="لطفاً سوال شرعی خود را به طور کامل و واضح بنویسید..."
              required
            />
            {errors.question && (
              <p className="text-red-500 text-sm mt-1">{errors.question}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              حداقل ۱۰ کاراکتر ({formData.question.length}/10)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>در حال ارسال...</span>
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  <span>ارسال سوال</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

