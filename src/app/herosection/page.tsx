"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImageSet, setCurrentImageSet] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(0);
  
  // Different image sets for variety
  const imageSets = [
    ["/1.jpg", "/2.jpg", "/3.jpg", ],
  ];

  // Background images for slider
  const bgImages = [
    "/1.jpg",
    "/2.jpg", 
    "/3.jpg",
    "/4.jpg",
    "/5.jpg"
  ];

  // Rotate image sets every 5 seconds
  useEffect(() => {
    const imageSetInterval = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % imageSets.length);
    }, 5000);
    
    return () => clearInterval(imageSetInterval);
  }, [imageSets.length]);

  // Rotate background images every 8 seconds
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % bgImages.length);
    }, 8000);
    
    return () => clearInterval(bgInterval);
  }, [bgImages.length]);

  return (
    <section className="relative mt-20 min-h-screen  pt-10 overflow-hidden">
      
      {/* Background Image Slider with Overlay */}
    <div className="absolute inset-0">
 {bgImages.map((src, index) => (
  <div
    key={index}
    className={`absolute inset-0 transition-opacity duration-1000 ${
      currentBgImage === index ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {/* Main Image Container with Glow Effects */}
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt="Islamic Learning Background"
        fill
        className="object-cover"
        priority={index === 0}
      />
      
      {/* Orange Glow Overlay */}
      <div className="absolute inset-0  mix-blend-overlay"></div>
      
      {/* Gradient Vignette Effect */}
      <div className="absolute inset-0 bg-radial-gradient(at center, transparent 60%, orange-900 100%)"></div>
      
      {/* Animated Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/10 to-orange-400/0 ${
        currentBgImage === index ? 'animate-pulse-glow' : ''
      }`}></div>
    </div>
    
    {/* Main Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-amber-700/40"></div>
    
    {/* Subtle Shadow Effects */}
    <div className="absolute inset-0 shadow-2xl shadow-orange-500/20"></div>
    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/0 via-orange-400/10 to-orange-500/0 blur-xl opacity-50"></div>
    
    {/* Animated Light Rays */}
    <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-orange-200/5 to-transparent ${
      currentBgImage === index ? 'animate-light-sweep' : ''
    }`}></div>
  </div>
))}
</div>


      {/* Background image navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {bgImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBgImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentBgImage === index 
                ? "bg-amber-600 w-8" 
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Change background to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl -z-10"></div>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center max-lg:text-center justify-between mt-16 pb-16 px-6 sm:px-10 md:px-16 mx-auto w-full relative z-10 gap-12">
        
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-center lg:items-start lg:max-w-lg xl:max-w-2xl">
          
          {/* Badge */}
          <div className="mt-16 mb-6 flex items-center space-x-2 border border-amber-600 text-amber-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/80">
            <span>63 Years of Islamic Excellence</span>
            <span className="flex items-center justify-center size-6 p-1 rounded-full bg-amber-600 transition-all duration-300 group-hover:rotate-12">
              <svg width="14" height="11" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6.5h14M9.5 1 15 6.5 9.5 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-white font-semibold text-4xl sm:text-5xl md:text-6xl xl:text-7xl max-w-2xl leading-tight">
            Anwarul Uloom
            <span className="block text-amber-600 mt-3 text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
              أنوار العلوم
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="mt-6 text-gray-100 font-medium text-xl sm:text-2xl md:text-3xl max-w-xl leading-relaxed">
            Illuminating Minds with Sacred Knowledge
          </h2>

          {/* Description */}
          <p className="mt-6 text-gray-600 max-w-md text-base sm:text-lg leading-relaxed backdrop-blur-sm bg-white/70 p-4 rounded-2xl">
            Established in 1961, we nurture hearts and minds through authentic Islamic teachings, scholarly wisdom, and spiritual guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center mt-10 gap-4">
        <Link
  href="/courses"
  className="group relative inline-flex items-center px-8 py-4 rounded-full bg-orange-500/40  text-white font-medium text-base overflow-hidden transition-all duration-300  hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transform hover:-translate-y-1"
>
  <span className="relative z-10 flex items-center space-x-2">
    <span>Explore Our Courses</span>
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 group-hover:translate-x-2"
    >
      <path
        d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
  {/* Optional overlay effect */}
  <span className="absolute inset-0 bg-white opacity-10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></span>
</Link>

            <Link
              href="/about"
              className="text-amber-600 bg-amber-100 px-7 py-3.5 rounded-full text-base font-medium hover:bg-amber-200 transition-all duration-300 transform hover:-translate-y-1 border border-amber-200"
            >
              Learn About Us
            </Link>
          </div>

          {/* Stats */}
          {/* <div className="flex items-center mt-16 gap-10 backdrop-blur-sm bg-white/80 p-6 rounded-2xl">
            {[
              { number: "63+", label: "Years" },
              { number: "500+", label: "Graduates" },
              { number: "50+", label: "Scholars" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl font-bold text-amber-600 transition-all duration-300 group-hover:scale-110">{stat.number}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Right Column - Enhanced Image Gallery */}
        <div className="lg:max-w-md xl:max-w-lg w-full">
          <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
            
            {/* Main featured image */}
            <div className="col-span-2 row-span-2 relative h-80 rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src={imageSets[currentImageSet][0]}
                alt="Featured Islamic Education"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white font-bold text-xl mb-2">Sacred Knowledge</h3>
                  <p className="text-amber-200 text-sm">Traditional Islamic Learning</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </div>
            </div>

            {/* Secondary images */}
            {imageSets[currentImageSet].slice(1).map((src, index) => (
              <div
                key={index}
                className="relative h-40 rounded-2xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={src}
                  alt={`Islamic Education ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-3 left-3 right-3">
                  
                  </div>
                </div>
              </div>
            ))}

            {/* Decorative element */}
            <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
            <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-amber-600/20 rounded-full blur-xl"></div>
          </div>

          {/* Gallery navigation dots */}
          <div className="flex justify-center mt-6 gap-2">
            {imageSets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageSet(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImageSet === index 
                    ? "bg-amber-600 w-6" 
                    : "bg-amber-300 hover:bg-amber-400"
                }`}
                aria-label={`View image set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        {/* <div className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center backdrop-blur-sm bg-white/20">
          <div className="w-1 h-3 bg-amber-600 rounded-full mt-2 animate-pulse"></div>
        </div> */}
      </div>
    </section>
  );
}