"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type WorkCardProps = {
  slug: string;
  title: string;
  type: string;
  tags: string[];
  previewSrc?: string;
  mode?: "hover" | "always";
};

export default function WorkCard({
  slug,
  title,
  type,
  tags,
  previewSrc,
  mode = "hover",
}: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const thumbnailSrc = useMemo(() => {
    if (!previewSrc) return undefined;
    return previewSrc.replace(/\.(mp4|webm)$/i, ".jpg");
  }, [previewSrc]);

  const handleMouseEnter = () => {
    if (mode !== "hover") return;
    setIsHovered(true);
    setVideoReady(false);
    setHoverKey((prev) => prev + 1);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => undefined);
    }
  };

  const handleMouseLeave = () => {
    if (mode !== "hover") return;
    setIsHovered(false);
    setVideoReady(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCanPlay = () => {
    if (!videoRef.current) return;
    if (mode === "always" || isHovered) {
      setVideoReady(true);
      videoRef.current.play().catch(() => undefined);
    }
  };

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-white/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="relative overflow-hidden rounded-xl border border-[var(--border)]">
        <div className="relative aspect-[9/16] bg-black/20">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={`${title} preview`}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ease-out ${
                mode === "always" || (isHovered && videoReady)
                  ? "opacity-0"
                  : "opacity-100"
              }`}
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 bg-black/30" />
          )}
        </div>
        {previewSrc ? (
          <video
            key={hoverKey}
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ease-out ${
              mode === "always" || isHovered ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={mode === "always"}
            controls={false}
            controlsList="nodownload noremoteplayback"
            onContextMenu={(event) => event.preventDefault()}
            onCanPlay={handleCanPlay}
            onLoadedData={handleCanPlay}
            poster={thumbnailSrc}
            src={previewSrc}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/80">
            View
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-xs text-[var(--muted)]">{type}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
