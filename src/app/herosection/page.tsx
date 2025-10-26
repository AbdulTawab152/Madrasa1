"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { useTranslation } from "@/hooks/useTranslation";
import { getLanguageDirection } from "@/lib/i18n";

// ✅ Array of images from public folder
const images = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg",
  "/hero6.jpg",
  "/hero7.jpg",
  "/about1.jpg",
  "/about2.jpg",
  "/about3.jpg",
  "/about4.jpg",
  "/about5.jpg",
  "/about6.jpg",
  "/about7.jpg",
  "/about8.jpg",
  "/about9.jpg",
];

const Ship = "/ship.png";

// ✅ Scrolling row — smooth and natural animation
const ScrollingRow = ({
  direction = "left",
  delay = 0,
}: {
  direction?: "left" | "right";
  delay?: number;
}) => {
  // Create a seamless loop by duplicating images
  const repeatedImages = [...images, ...images];
  
  // Calculate the total width for seamless looping
  const imageWidth = 320; // Base width
  const gap = 8; // Gap between images
  const totalWidth = (imageWidth + gap) * images.length;

  return (
    <motion.div
      className="flex gap-2 w-max"
      animate={{ 
        x: direction === "left" ? [-totalWidth, 0] : [0, -totalWidth]
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 120, // Faster movement (smaller duration = faster)
        ease: "linear",
        delay,
      }}
      style={{
        width: totalWidth * 2, // Double width for seamless loop
        willChange: "transform", // Optimize for smooth animation
      }}
    >
      {repeatedImages.map((img, index) => (
        <Image
          key={`${img}-${index}`}
          src={img}
          alt={`scrolling-${index}`}
          width={320}
          height={210}
          className="w-[220px] h-[140px] sm:w-[250px] sm:h-[180px] lg:w-[320px] lg:h-[210px] rounded-lg object-cover shadow-2xl drop-shadow-[8px_8px_16px_rgba(0,0,0,0.8)] hover:shadow-3xl transition-shadow duration-300 flex-shrink-0"
        />
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const { t, i18n } = useTranslation("common", { useSuspense: false });
  const isRTL = getLanguageDirection(i18n?.language || "ps") === 'rtl';

  return (
    <section
      className="relative bg-green-800 overflow-hidden mt-32  flex flex-col justify-center"
      dir="ltr"
    >
      {/* Background Ship */}
      <Image
        src={Ship}
        alt="Background ship"
        fill
        className="object-cover absolute inset-0 z-10 opacity-70"
        priority
      />

      {/* Dark Background Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20" />
      
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-21" />
      
      {/* Custom Gradient Overlay */}
      <div className="w-full h-full bg-gradient-to-tr from-black via-yellow-100 to-transparent blur-md absolute inset-0 z-22" />

      {/* Scrolling Rows — 4 rows stacked vertically with smooth animation */}
      <div className="relative z-30 flex flex-col space-y-2 py-30">
        <div className="overflow-hidden">
          <ScrollingRow direction="left" delay={0} />
        </div>
        <div className="overflow-hidden">
          <ScrollingRow direction="right" delay={1} />
        </div>
        <div className="overflow-hidden">
          <ScrollingRow direction="left" delay={2} />
        </div>
        <div className="overflow-hidden">
          <ScrollingRow direction="right" delay={3} />
        </div>
      </div>

      {/* Hero Text Content - Perfectly Centered with Black Shadow */}
      <div className="absolute inset-0 z-40 flex items-center justify-center px-4">
        <div className="text-white max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-sky-200 font-bold px-4 py-2 rounded-full bg-sky-500/20 inline-block shadow-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {t("hero.tagline")}
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              {t("hero.title")}
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mt-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              {t("hero.subtitle")}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/about">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 px-6 py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2 shadow-2xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-300">
                {t("hero.aboutUs")} <FaArrowRight />
              </button>
            </Link>
            
            <Link href="/courses">
              <button className="border-2 border-orange-400 bg-white/10 backdrop-blur-sm text-orange-300 hover:bg-orange-500/25 hover:text-white hover:shadow-2xl px-6 py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)]">
                {t("hero.ourCourses")}
              </button>
            </Link>
          </div>

          <div className="w-full h-full bg-gradient-to-tr from-black via-yellow-100 to-transparent blur-md" />
        </div>
     

      </div>


      
    </section>
  );
};

export default Hero;
