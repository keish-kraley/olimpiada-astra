"use client";

import { useState } from "react";
import Image from "next/image";

function LightboxModal({
  slug,
  images,
  initialIndex,
  onClose,
}: {
  slug: string;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
        onClick={onClose}
      >
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      {currentIndex > 0 && (
        <button
          type="button"
          className="absolute left-4 text-white/80 hover:text-white z-10"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((i) => i - 1);
          }}
        >
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          type="button"
          className="absolute right-4 text-white/80 hover:text-white z-10"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((i) => i + 1);
          }}
        >
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      <div
        className="relative max-w-5xl max-h-[85vh] w-full h-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={`/galeria/${slug}/${currentImage}`}
          alt={`Foto ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>

      <div className="absolute bottom-4 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default function GalleryGrid({
  slug,
  images,
}: {
  slug: string;
  images: string[];
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, index) => (
          <button
            key={img}
            type="button"
            onClick={() => setLightbox(index)}
            className="group aspect-square relative overflow-hidden rounded-lg bg-gray-200 cursor-pointer"
          >
            <Image
              src={`/galeria/${slug}/${img}`}
              alt={`Foto ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <LightboxModal
          slug={slug}
          images={images}
          initialIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
