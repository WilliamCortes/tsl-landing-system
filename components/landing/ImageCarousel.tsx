"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { ImageCarouselProps } from "@/types/landing";

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
      <div className="flex">
        {images.map((src) => (
          <div key={src} className="min-w-0 shrink-0 grow-0 basis-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="aspect-video w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
