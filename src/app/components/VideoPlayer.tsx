"use client";

import { useRef, useState, useEffect } from "react";
import { getImageUrl } from "@/lib/utils";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, posterUrl, title }: VideoPlayerProps) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle handler
  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  // Sync muted state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        loop
        controls
        muted={muted}
        className="w-full h-full object-cover"
        poster={posterUrl || "/placeholder-course.jpg"}
      >
        <source src={getImageUrl(videoUrl)} type="video/mp4" />
        <source src={getImageUrl(videoUrl)} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* Mute/Unmute button */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute top-4 right-4 z-30 rounded-full bg-black/70 hover:bg-black/90 text-white p-3 transition-all duration-200 hover:scale-110 shadow-lg"
      >
        {muted ? (
          // Speaker off icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M9 9v6h4l5 5V4l-5 5H9z" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          // Speaker on icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <polygon points="11 5 6 9H2v6h4l5 4V5z" />
            <path d="M19 12c0-3.31-2.69-6-6-6v12a6 6 0 0 0 6-6z" />
          </svg>
        )}
      </button>

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
