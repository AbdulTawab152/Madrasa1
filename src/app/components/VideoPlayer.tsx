"use client";

import { useRef, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/utils";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from "react-icons/fa";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, posterUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Set video to unmuted by default and cleanup
  useEffect(() => {
    if (videoRef.current) {
      // Ensure audio is enabled
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
      
      // Force enable audio
      if (!isMuted && volume > 0) {
        videoRef.current.muted = false;
      }
    }

    // Cleanup function to pause video when component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [volume, isMuted]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle click to play/pause with proper error handling
  const handleVideoClick = async () => {
    if (!videoRef.current || isLoading) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        // Check if video is ready to play
        if (videoRef.current.readyState >= 2) {
          await videoRef.current.play();
          setIsPlaying(true);
        } else {
          // Wait for video to be ready
          videoRef.current.addEventListener('canplay', async () => {
            try {
              await videoRef.current?.play();
              setIsPlaying(true);
            } catch (error) {
              console.warn('Video play error after canplay:', error);
            }
          }, { once: true });
        }
      }
    } catch (error) {
      console.warn('Video play/pause error:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting, ensure volume is set
      if (!newMutedState && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
      videoRef.current.muted = newVolume === 0;
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle duration change
  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle video play/pause events
  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
    setIsLoading(false);
  };

  // Handle video errors
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.warn('Video error:', e);
    setIsPlaying(false);
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={posterUrl || "/placeholder-course.jpg"}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationChange}
        preload="metadata"
        onClick={handleVideoClick}
        playsInline
        controls={false}
      >
        <source src={getImageUrl(videoUrl)} type="video/mp4" />
        <source src={getImageUrl(videoUrl)} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {/* Progress Bar */}
        <div className="w-full px-4 py-2 pointer-events-auto">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-4 py-3 pointer-events-auto">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleVideoClick(); }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <FaPause className="w-5 h-5 text-white" />
              ) : (
                <FaPlay className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {isMuted ? (
                  <FaVolumeMute className="w-4 h-4 text-white" />
                ) : (
                  <FaVolumeUp className="w-4 h-4 text-white" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => { e.stopPropagation(); handleVolumeChange(e); }}
                className="w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
                }}
              />
            </div>

            {/* Time Display */}
            <div className="text-white text-sm font-medium px-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Fullscreen Button */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isFullscreen ? (
                <FaCompress className="w-4 h-4 text-white" />
              ) : (
                <FaExpand className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Center Play Button (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <button
            onClick={handleVideoClick}
            className="pointer-events-auto w-20 h-20 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 hover:scale-110"
          >
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaPlay className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
