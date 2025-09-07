"use client";

import { getImageUrl } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const API = "https://lawngreen-dragonfly-304220.hostingersite.com/api/graduations";

async function getGraduation(slug: string) {
  const res = await fetch(`${API}/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return await res.json();
}

export default function GraduationDetailPage({ params }: { params: { slug: string } }) {
  const [graduation, setGraduation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function fetchGraduation() {
      try {
        setLoading(true);
        const data = await getGraduation(params.slug);
        if (data) {
          setGraduation(data);
          if (data.graduation_images && data.graduation_images.length > 0) {
            setSelectedImageIndex(0);
          } else if (data.main_image) {
            setSelectedImageIndex(-1); // main_image selected
          }
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
  }, [params.slug]);

  const currentImageUrl = useMemo(() => {
    if (graduation) {
      if (selectedImageIndex !== -1 && graduation.graduation_images && graduation.graduation_images.length > selectedImageIndex) {
        return getImageUrl(graduation.graduation_images[selectedImageIndex].image);
      } else if (graduation.main_image && selectedImageIndex === -1) {
        return getImageUrl(graduation.main_image);
      }
    }
    return "";
  }, [selectedImageIndex, graduation]);

  const goToNextImage = () => {
    if (graduation?.graduation_images?.length) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % graduation.graduation_images.length);
    }
  };

  const goToPreviousImage = () => {
    if (graduation?.graduation_images?.length) {
      setSelectedImageIndex((prevIndex) => (prevIndex - 1 + graduation.graduation_images.length) % graduation.graduation_images.length);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!graduation) return <ErrorMessage message="Graduation not found" />;

  return (
    <main className="mx-auto mt-24 sm:mt-10 max-w-7xl px-4 font-sans">
      {/* 🎓 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24 relative overflow-hidden rounded-3xl  p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 bg-gradient-to-r from-white to-gray-50"
      >
        {/* Cinematic Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-orange-50 via-transparent to-yellow-50 opacity-30 pointer-events-none"
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Left Column - Main Image + Thumbnails */}
        <div className="lg:w-1/2 flex flex-col gap-4 relative">
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

    {/* Navigation Buttons */}
    {graduation.graduation_images?.length > 1 && (
      <>
        <motion.button
          onClick={goToPreviousImage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 md:p-3 text-white hover:bg-black/75 focus:outline-none"
        >
          &lt;
        </motion.button>
        <motion.button
          onClick={goToNextImage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 md:p-3 text-white hover:bg-black/75 focus:outline-none"
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
          className={`relative h-20 w-full cursor-pointer overflow-hidden rounded-lg shadow-md duration-300 ${selectedImageIndex === index ? "ring-2 ring-orange-100" : ""}`}
          onClick={() => setSelectedImageIndex(index)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          layout
        >
          <img
            src={getImageUrl(img.image) || ""}
            alt="Thumbnail"
            className="h-full w-full object-cover rounded-lg"
          />
        </motion.div>
      ))}
    </div>
  )}
</div>


        {/* Right Column - Hero Text + Info */}
        <div className="relative z-10 lg:w-1/2 flex flex-col items-start justify-center px-2 md:px-6 py-6 md:py-12 text-left">
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
            {graduation.description}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="flex"> Date : <InfoCard label="Date" value={new Date(graduation.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} /></span> 
            <span className="flex"> Time :<InfoCard label="Time" value={`${new Date(graduation.start_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })} – ${new Date(graduation.end_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`} /></span>
            <span className="flex"> Year : {graduation.graduation_year && <InfoCard label="Graduation Year" value={graduation.graduation_year} />}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Graduates Section */}
      <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-12">
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
      {graduation.graduated_students.map((s: any, index: number) => (
        <motion.div
          key={s.id}
          className="group relative overflow-hidden rounded-3xl shadow-md transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Full Background Image */}
          {s.image && (
            <div
              className="h-72 md:h-80 w-full bg-center bg-cover rounded-3xl relative"
              style={{ backgroundImage: `url(${getImageUrl(s.image)})` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />

              {/* Badge */}
              {s.graduation_type?.name && (
                <span className="absolute top-4 text-white right-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-1 text-xs md:text-sm font-semibold text-white shadow-md">
                  {s.graduation_type.name}
                </span>
              )}

              {/* Name & Info */}
              <div className="absolute bottom-4 left-4 text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  <span className="text-white">{s.first_name}</span>{" "}
                  <span className="text-gray-200">{s.last_name}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-200">
                  <span className="font-medium">Father:</span> {s.father_name}
                </p>
                <p className="text-xs sm:text-sm text-gray-200">
                  <span className="font-medium">Grandfather:</span> {s.grandfather_name}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 mt-8 text-center text-base sm:text-lg">No students listed for this graduation.</p>
  )}
</section>


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

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-black text-sm">
      <span className="text-lg">{icon}</span>
      <span title={label} className="font-medium">{value}</span>
    </div>
  );
}
