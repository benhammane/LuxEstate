"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const prev = React.useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = React.useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  const cover = images[0];
  const rest = images.slice(1, 5);

  return (
    <>
      {/* Mosaic */}
      <div className="grid h-[46vh] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[56vh] lg:h-[62vh]">
        <button
          onClick={() => openAt(0)}
          className="group relative col-span-4 row-span-2 sm:col-span-2"
        >
          <Image
            src={cover}
            alt={title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </button>
        {rest.map((src, i) => (
          <button
            key={i}
            onClick={() => openAt(i + 1)}
            className={cn(
              "group relative hidden sm:block",
              rest.length < 4 && i === rest.length - 1 && "row-span-2",
            )}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {i === rest.length - 1 && images.length > 5 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
                +{images.length - 5} photos
              </span>
            )}
          </button>
        ))}
        <button
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium shadow-lift backdrop-blur transition-colors hover:bg-background"
        >
          <Expand className="size-4" />
          Voir les {images.length} photos
        </button>
      </div>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95">
          <div className="flex items-center justify-between p-4 text-white/90">
            <span className="text-sm">
              {index + 1} / {images.length}
            </span>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              aria-label="Fermer"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
            <button
              onClick={prev}
              className="absolute left-4 z-10 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Précédent"
            >
              <ChevronLeft className="size-6" />
            </button>
            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={images[index]}
                alt={`${title} — photo ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <button
              onClick={next}
              className="absolute right-4 z-10 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Suivant"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto p-4">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-opacity",
                  i === index
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
