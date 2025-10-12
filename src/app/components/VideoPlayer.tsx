"use client";

import { useRef, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/utils";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, posterUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Set video to unmuted by default
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  }, []);

  // Handle click to play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle video play/pause events
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div className="relative w-full h-full cursor-pointer" onClick={handleVideoClick}>
      <video
        ref={videoRef}
        autoPlay
        loop
        controls
        muted={false}
        className="w-full h-full object-cover"
        poster={posterUrl || "/placeholder-course.jpg"}
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={getImageUrl(videoUrl)} type="video/mp4" />
        <source src={getImageUrl(videoUrl)} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* Click to play/pause indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className={`transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-80 scale-100'}`}>
          <div className="w-20 h-20 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced shadow overlays for better text readability */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top gradient for better button visibility */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent"></div>
        
        {/* Bottom gradient for title readability */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        
        {/* Side gradients for better overall contrast */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-black/30 to-transparent"></div>
        
        {/* Amber overlay for brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/60 to-amber-900/70 mix-blend-multiply"></div>
      </div>

      {/* Course Title with enhanced shadow effects */}
      <div className="absolute inset-0 flex items-end pb-8 z-20">
        <h1 className="mx-auto text-3xl sm:text-4xl lg:text-5xl font-bold text-white px-5 text-center">
          <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {title}
          </span>
        </h1>
      </div>
    </div>
  );
}
