"use client";

import { FaArrowLeft } from "react-icons/fa";

interface RTLArrowIconProps {
  className?: string;
  size?: string;
}

export default function RTLArrowIcon({ className = "", size = "text-sm" }: RTLArrowIconProps) {
  // Since we're hardcoded to Pashto (RTL), arrow points left
  return (
    <FaArrowLeft 
      className={`${size} ${className}`}
    />
  );
}

