"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
  onLoad?: () => void;
  priority?: boolean;
  skeleton?: boolean;
}

/**
 * Lazy-loading image component with skeleton loader support
 * Optimizes performance by loading images only when needed
 */
export function LazyImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  objectFit = "cover",
  onLoad,
  priority = false,
  skeleton = true
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    // Use requestIdleCallback to defer image loading
    const id = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback(() => setImageSrc(src))
      : setTimeout(() => setImageSrc(src), 0);

    return () => {
      if (typeof id === "number" && typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(id);
      } else if (typeof id === "number") {
        clearTimeout(id);
      }
    };
  }, [src, priority]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && skeleton && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse z-10" />
      )}

      {imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{
            objectFit: objectFit
          }}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          onLoadingComplete={handleLoadingComplete}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
        />
      )}
    </div>
  );
}

/**
 * High-performance image component optimized for cards
 * Combines lazy-loading with progressive enhancement
 */
export function CardImage({
  src,
  alt,
  className = "w-full h-[180px]",
  onLoad
}: {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={className}
      objectFit="cover"
      onLoad={onLoad}
      skeleton={true}
    />
  );
}

/**
 * Instructor profile image with fallback avatar
 */
export function AvatarImage({
  src,
  alt,
  className = "w-8 h-8 rounded-full"
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const imageSrc = src || `https://i.pravatar.cc/150?u=${alt.replace(/\s+/g, "")}`;

  return (
    <LazyImage
      src={imageSrc}
      alt={alt}
      width={150}
      height={150}
      className={className}
      objectFit="cover"
      skeleton={false}
    />
  );
}

