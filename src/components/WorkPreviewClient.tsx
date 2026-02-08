"use client";

import { useEffect, useRef, useState } from "react";

type WorkPreviewClientProps = {
  title: string;
  previewSrc?: string;
  mode?: "hover" | "always";
};

export default function WorkPreviewClient({
  title,
  previewSrc,
  mode = "always",
}: WorkPreviewClientProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [isHoverCapable, setIsHoverCapable] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const isAlways = mode === "always";

  const handleMouseEnter = () => {
    if (isAlways || !isHoverCapable) return;
    setIsHovered(true);
    setVideoReady(false);
    setHoverKey((prev) => prev + 1);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => undefined);
    }
  };

  const handleMouseLeave = () => {
    if (isAlways || !isHoverCapable) return;
    setIsHovered(false);
    setVideoReady(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCanPlay = () => {
    if (!videoRef.current) return;
    if (isAlways || !isHoverCapable || isHovered) {
      setVideoReady(true);
      videoRef.current.play().catch(() => undefined);
    }
  };

  useEffect(() => {
    if (isAlways) return;
    const media = window.matchMedia("(hover: none)");
    const update = () => setIsHoverCapable(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [isAlways]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = entry?.isIntersecting ?? false;
        setIsInView(visible);
        if (!visible) {
          setVideoReady(false);
          setIsHovered(false);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!isInView) {
      videoRef.current.pause();
      return;
    }
    if (isAlways || !isHoverCapable) {
      videoRef.current.play().catch(() => undefined);
    }
  }, [isAlways, isHoverCapable, isInView]);

  const shouldShowVideo =
    (isAlways && isInView) ||
    (!isHoverCapable && isInView) ||
    isHovered;

  return (
    <div
      ref={containerRef}
      className="relative flex max-h-[70vh] items-center justify-center rounded-2xl border border-[var(--border)] bg-black/30 p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="relative aspect-[9/16] w-full max-h-[70vh] max-w-[520px] overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20">
        <div className="absolute inset-0 bg-black/30" />

        {previewSrc ? (
          <video
            key={hoverKey}
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-200 ease-out ${
              shouldShowVideo ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={shouldShowVideo}
            controls={false}
            controlsList="nodownload noremoteplayback"
            onContextMenu={(event) => event.preventDefault()}
            onCanPlay={handleCanPlay}
            onLoadedData={handleCanPlay}
            src={isInView ? previewSrc : undefined}
          />
        ) : null}
      </div>
    </div>
  );
}
