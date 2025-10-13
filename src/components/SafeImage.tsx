"use client";

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  onError?: () => void;
}

export default function SafeImage({
  src,
  alt = 'Image',
  fallback = '/placeholder-blog.jpg',
  width,
  height,
  fill = false,
  sizes,
  className = '',
  priority = false,
  onError,
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(() => {
    // Handle null, undefined, or empty string
    if (!src || src === 'null' || src === 'undefined' || src.trim() === '') {
      return fallback;
    }
    return src;
  });

  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback);
      onError?.();
    }
  };

  // If we have an error and fallback is already set, don't render anything
  if (hasError && imageSrc === fallback) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  const imageProps = {
    src: imageSrc,
    alt,
    className,
    priority,
    onError: handleError,
    ...(fill ? { fill: true, sizes } : { width, height }),
  };

  return <Image {...imageProps} />;
}
