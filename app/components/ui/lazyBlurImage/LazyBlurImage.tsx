"use client"

import React, { useEffect, useRef, useState } from "react";

type LazyBlurImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

const LazyBlurImage: React.FC<LazyBlurImageProps> = ({
  src,
  alt = "",
  className = "",
}) => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder Blur */}
      <img
        src={`${src}?scale=0.3`}
        alt={alt}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 blur-md scale-105 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Main Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default LazyBlurImage;
