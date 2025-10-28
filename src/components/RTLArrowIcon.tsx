"use client";

import { FaArrowLeft } from "react-icons/fa";

interface RTLArrowIconProps {
  className?: string;
  size?: string;
}

export default function RTLArrowIcon({ className = "", size = "text-sm" }: RTLArrowIconProps) {
  // Since we're hardcoded to Pashto (RTL), always flip the arrow to point left
  return (
    <FaArrowLeft 
      className={`${size} ${className}`}
      style={{ transform: 'scaleX(-1)' }}
    />
  );
}

