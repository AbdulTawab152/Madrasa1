'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  [key: string]: any;
}

export default function ImageWithFallback({
  src,
  alt,
  fallback = '/placeholder-gallery.jpg',
  className = '',
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = (e: any) => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
    onError?.(e);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
