"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import img from "../../../public/1.jpg"
// import Btn from "../Btn";

const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/05.jpg",];

const ScrollingRow = ({ direction = "left", delay = 0 }: { direction?: "left" | "right"; delay?: number }) => {
  const scrollX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
  const scrollY = direction === "left" ? ["0px", "15px"] : ["15px", "0px"];

  const repeatedImages = [...images, ...images, ...images, ...images];

  return (
    <motion.div
      className="flex mt-32 gap-6 w-max "
      animate={{ x: scrollX, y: scrollY, rotateX: [10, 50, 30] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 140,
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
          className="w-[340px] h-[200px] rounded-lg object-cover"
        />
      ))}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div className="relative  bg-black overflow-hidden md:mt-[-100px] space-y-6">
      <div className="absolute bottom-1/2 left-0 w-full h-[300px] bg-gradient-to-t from-black via-black/10 to-transparent z-10 pointer-events-none blur-lg" />

      <div className="space-y-4 space-x-0 relative z-20">
        <ScrollingRow direction="left" delay={0} />
        <ScrollingRow direction="right" delay={1} />
        <ScrollingRow direction="left" delay={2} />
        <ScrollingRow direction="right" delay={3} />
      </div>

      <div className="absolute text-white max-w-[90%] sm:max-w-[500px] top-1/3 left-20 lg:left-60 space-y-4 z-30">
        {/* Highlighted small text */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-400 font-semibold px-3 py-1 rounded-full bg-black/30 inline-block">
          Anwarul LLom Madrasa
        </p>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-orange-400 px-3 py-1 font-extrabold leading-snug ">
          Anwarul Uloom <span className="text-white"> Madrasa</span>
        </h1>

        {/* Subheading / info */}
        <p className="text-sm md:text-lg text-gray-400 font-medium">
          Rooted in the Qur'an and Sunnah, ensuring pure Islamic teachings.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-2">
          {/* <Btn btnText="Apply Now" /> */}


          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-8 py-3 border border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors"
          >
            Our Courses <FaArrowRight className="ml-4" />
          </Link>
        </div>
      </div>


      {/* Background Ship Image */}
      <Image
        src="/ship.png"
        alt="A ship navigating the sea"
        fill
        className="object-cover absolute inset-0 z-10"
      />

      {/* Radial Gradient Overlay */}
      {/* Partial Black Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-black via-yellow-1bg-[linear-gradient(to_top_right,_black,_rgba(255,255,0,0.2)5%,_rgba(255,255,0,0.2)_55%,_transparent)] blur-md" />
      </div>

    </div>
  );
};

export default Hero;
