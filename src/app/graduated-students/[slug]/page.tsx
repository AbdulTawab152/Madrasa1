"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationsApi } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";

async function getGraduation(slug: string): Promise<any> {
  const result = await GraduationsApi.getBySlug(slug);
  if (!result.success) {
    return null;
  }
  return result.data as any;
}

export default function GraduationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [graduation, setGraduation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Modal state for student details
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchGraduation() {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const data = await getGraduation(resolvedParams.slug);
        if (data) {
          setGraduation(data);
          if (data.graduation_images?.length) setSelectedImageIndex(0);
          else if (data.main_image) setSelectedImageIndex(-1);
        } else {
          setError("Graduation not found");
        }
      } catch (err) {
        setError("Failed to fetch graduation details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGraduation();
  }, [params]);

  const currentImageUrl = useMemo(() => {
    if (!graduation) return "";
    if (
      selectedImageIndex !== -1 &&
      graduation.graduation_images?.length > selectedImageIndex
    ) {
      return getImageUrl(
        graduation.graduation_images[selectedImageIndex].image
      );
    } else if (graduation.main_image && selectedImageIndex === -1) {
      return getImageUrl(graduation.main_image);
    }
    return "";
  }, [selectedImageIndex, graduation]);

  const goToNextImage = () => {
    if (graduation?.graduation_images?.length) {
      setSelectedImageIndex(
        (prev) => (prev + 1) % graduation.graduation_images.length
      );
    }
  };

  const goToPreviousImage = () => {
    if (graduation?.graduation_images?.length) {
      setSelectedImageIndex(
        (prev) =>
          (prev - 1 + graduation.graduation_images.length) %
          graduation.graduation_images.length
      );
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!graduation) return <ErrorMessage message="Graduation not found" />;

  return (
    <main className="mx-auto  mt-[180px] md:mt-24 sm:mt-10 max-w-7xl px-4 font-sans">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24 relative overflow-hidden rounded-3xl p- md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 bg-gradient-to-r from-white to-gray-50"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-orange-50 via-transparent to-yellow-50 opacity-30 pointer-events-none"
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Left Column - Main Image + Thumbnails */}
        <div className="lg:w-1/2  flex flex-col gap-4  relative">
          <motion.div
            className="relative w-full aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
            layout
          >
            {currentImageUrl && (
              <motion.img
                src={currentImageUrl}
                alt="Main Graduation Image"
                className="w-full h-full object-cover rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}

            {graduation.graduation_images?.length > 1 && (
              <>
                <motion.button
                  onClick={goToPreviousImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-primary-900/40 p-2 md:p-3 text-white hover:bg-primary-900/60 focus:outline-none"
                >
                  &lt;
                </motion.button>
                <motion.button
                  onClick={goToNextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary-900/40 p-2 md:p-3 text-white hover:bg-primary-900/60 focus:outline-none"
                >
                  &gt;
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Thumbnails */}
          {graduation.graduation_images?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {graduation.graduation_images.map((img: any, index: number) => (
                <motion.div
                  key={img.id}
                  className={`relative h-20 w-full cursor-pointer overflow-hidden rounded-lg shadow-md duration-300 ${
                    selectedImageIndex === index ? "ring-2 ring-orange-100" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <img
                    src={
                      getImageUrl(img.image, "/placeholder-graduation.jpg") ||
                      "/placeholder-graduation.jpg"
                    }
                    alt="Thumbnail"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Info */}
        <div className="lg:absolute right-0 top-1 z-10 lg:w-1/2 flex flex-col items-start justify-center px-2 md:px-6 py-6 md:py-12 text-left">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black drop-shadow-xl mb-4 md:mb-6"
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {graduation.title}
            <span className="mt-3 block h-1 w-1 sm:w-28 rounded-full bg-gradient-to-r from-orange-600 to-yellow-500 shadow-lg"></span>
          </motion.h1>

          <motion.p
            className="text-gray-700 text-sm sm:text-base md:text-md leading-relaxed mb-6 md:mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {graduation.description  ?.replace(/<[^>]*>/g, "")}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <InfoCard
              label="Date"
              value={new Date(graduation.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <InfoCard
              label="Time"
              value={`${new Date(graduation.start_time).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )} – ${new Date(graduation.end_time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}`}
            />
            {graduation.graduation_year && (
              <InfoCard
                label="Graduation Year"
                value={graduation.graduation_year}
              />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Graduates Section */}
      <section className=" px-4 mb-20 sm:px-6 md:px-8 lg:px-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold mb-12 text-center text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Esteemed Graduates
          <span className="block h-1.5 w-24 sm:w-28 bg-gradient-to-r from-orange-400 to-yellow-500 mt-3 mx-auto rounded-full"></span>
        </motion.h2>

        {graduation.graduated_students?.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {graduation.graduated_students.map((s: any, index: number) => {
              const imageUrl =
                getImageUrl(s.image, "/placeholder-graduation.jpg") ||
                "/placeholder-graduation.jpg";
              return (
                <motion.div
                  key={s.id}
                  className="group relative overflow-hidden rounded-3xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => openModal(s)}
                >
                  <div className="relative h-72 md:h-80 w-full rounded-3xl overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${s.first_name} ${s.last_name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/placeholder-graduation.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
                    {s.graduation_type?.name && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs md:text-sm font-semibold rounded-full bg-primary-900/40 text-white shadow-md">
                        {s.graduation_type.name}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 text-left text-gray-200">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                        <span className="text-white">{s.first_name}</span>{" "}
                        <span className="text-gray-200">{s.last_name}</span>
                      </h3>
                      <p className="text-xs text-gray-200 sm:text-sm">
                        <span className="font-medium">Father:</span>{" "}
                        {s.father_name}
                      </p>
                      <p className="text-xs text-gray-200 sm:text-sm">
                        <span className="font-medium">Grandfather:</span>{" "}
                        {s.grandfather_name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 mt-8 text-center text-base sm:text-lg">
            No students listed for this graduation.
          </p>
        )}
      </section>

      {/* Student Modal */}
      {isModalOpen && selectedStudent && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with orange gradient background */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white relative">
                <button
                className="absolute top-4 right-4 text-white hover:text-primary-100 bg-primary-900/30 rounded-full p-1 w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden">
                    <Image
                      src={
                        getImageUrl(selectedStudent.image, "/placeholder-graduation.jpg") ||
                        "/placeholder-graduation.jpg"
                      }
                      alt={`${selectedStudent.first_name} ${selectedStudent.last_name}`}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl text-white md:text-3xl font-bold">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                  </h2>
                  <p className="text-orange-100 mt-1 text-base md:text-lg">
                    {selectedStudent.father_name &&
                      `Son of ${selectedStudent.father_name}`}
                    {selectedStudent.grandfather_name &&
                      selectedStudent.father_name &&
                      `, Grandson of ${selectedStudent.grandfather_name}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Content with scrollable area */}
            <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Personal Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium min-w-[120px] text-sm md:text-base">
                        Date of Birth:
                      </span>
                      <span className="text-sm md:text-base">
                        {new Date(selectedStudent.dob).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium min-w-[120px] text-sm md:text-base">
                        Contact:
                      </span>
                      <span className="flex items-center gap-1 text-sm md:text-base">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {selectedStudent.contact_no || "Not provided"}
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium min-w-[120px] text-sm md:text-base">
                        Graduation:
                      </span>
                      <span className="bg-orange-100 text-orange-800 text-xs md:text-sm font-medium px-2.5 py-0.5 rounded">
                        {selectedStudent.graduation_type?.name ||
                          "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Address Information
                  </h3>

                  <div className="flex items-start">
                    <span className="text-gray-500 font-medium min-w-[120px] text-sm md:text-base">
                      Full Address:
                    </span>
                    <span className="text-sm md:text-base">
                      {selectedStudent.full_address || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedStudent.description && (
                <div className="mt-6 pt-4 border-t pb-20">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4v-5z"
                      />
                    </svg>
                    Description
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm md:text-base">
                    {selectedStudent.description  ?.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
              )}

              {/* Full-size Image */}
            </div>

            {/* Footer */}
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}

// Helper Components
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="p-10 text-center text-gray-700 font-medium bg-white rounded-2xl shadow-lg">
        Loading graduation details...
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="p-10 text-center text-red-700 font-medium bg-white rounded-2xl shadow-lg">
        Error: {message}
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-black text-sm">
      <span title={label} className="font-medium">
        {value}
      </span>
    </div>
  );
}
