"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];


const ScrollingRow = ({ direction = "left", delay = 0 }) => {
  const scrollX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
  const scrollY = direction === "left" ? ["0px", "15px"] : ["15px", "0px"];

  const repeatedImages = [...images, ...images, ...images, ...images];

  return (
    <motion.div
      className="flex gap-2 w-max rotate-[60deg]"
      animate={{ x: scrollX, y: scrollY }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 80,
        ease: "linear",
        delay,
      }}
    >
      {repeatedImages.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Scrolling image ${index + 1}`}
          width={340}
          height={190}
          className="w-[200px] h-[112px] sm:w-[340px] sm:h-[190px] rounded-lg object-cover"
        />
      ))}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div className="relative bg-primary-900 overflow-hidden mt-20 md:mt-[0px] space-y-6">
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black via-black/10 to-transparent z-10 pointer-events-none blur-lg" />

      <div className="space-y-3 space-x-0 relative z-20">
        <ScrollingRow direction="left" delay={0} />
        <ScrollingRow direction="right" delay={1} />
        <ScrollingRow direction="left" delay={2} />
        <ScrollingRow direction="right" delay={3} />
      </div>
<div className="absolute  top-1/3 mt-10 sm:top-1/3  left-4 sm:left-10 lg:left-40 max-w-[90%] sm:max-w-[600px] space-y-4 z-30">
  {/* Tagline */}
  <p className="text-sm sm:text-base md:text-lg text-orange-400 font-semibold uppercase tracking-wider bg-orange-500/10 px-3 py-1.5 rounded-full w-fit shadow-md animate-pulse">
    ✦ Knowledge • Faith • Leadership ✦
  </p>

  {/* Main Heading */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug text-white drop-shadow-lg">
    <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent block">
      Anwarul Uloom Madrasa
    </span>
    <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mt-1">
      Illuminating Young Minds
    </span>
  </h1>

  {/* Subtext */}
  <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-[95%]">
    Shaping the future with wisdom, values, and faith.  
    Join our programs and courses designed to inspire bright young minds.
  </p>

  {/* Buttons */}
  <div className="flex flex-wrap gap-4 mt-4">
    {/* Learn More */}
    <Link href={"/about"}>
    <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 px-5 py-2 rounded-full text-sm sm:text-base md:text-base font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform duration-300 outline-none focus:outline-none focus:ring-0">
      Learn More <FaArrowRight />
    </button>
    </Link>

    {/* Courses */}
    <Link href={"/courses"}>
    <button className="border border-orange-400 bg-white/10 backdrop-blur-sm text-orange-300 px-10 py-2 rounded-full text-sm sm:text-base md:text-base font-semibold flex items-center justify-center gap-2 hover:bg-orange-500/25 hover:text-white hover:shadow-lg transition-all duration-300 outline-none focus:outline-none focus:ring-0">
      View Courses
    </button>
    </Link>
  </div>
</div>





      {/* Background Ship Image */}
      <Image
        src="/ship.png"
        alt="A ship navigating the sea"
        fill
        priority
        className="object-cover absolute inset-0 z-10"
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-black via-yellow-1bg-[linear-gradient(to_top_right,_black,_rgba(255,255,0,0.2)5%,_rgba(255,255,0,0.2)_55%,_transparent)] blur-md" />
      </div>
    </div>
  );
};

export default Hero;
