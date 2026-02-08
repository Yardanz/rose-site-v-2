"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ShopItem } from "@/data/shop";

type ShopDetailClientProps = {
  item: ShopItem;
};

const includedItems = [
  "Clean looped animation file (MP4/WebM)",
  "Optimized sizing for profile use",
  "Reusable pack license",
  "Subtle finishing adjustments",
];

const personalizationItems = [
  "Custom nickname or short text",
  "Subtle integration into animation style",
  "One revision included",
];

const licenseNotes = [
  "Personal and commercial use allowed",
  "No reselling or redistribution",
  "One purchase per client account",
];

export default function ShopDetailClient({ item }: ShopDetailClientProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleCanPlay = () => {
    if (!videoRef.current) return;
    setVideoReady(true);
    videoRef.current.play().catch(() => undefined);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-black/20 px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
        >
          Back to shop
        </Link>
      </div>

      <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-10">
          <div className="relative flex max-h-[70vh] items-center justify-center rounded-2xl border border-[var(--border)] bg-black/30 p-4">
            <div className="relative aspect-[9/16] w-full max-h-[70vh] max-w-[520px] overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20">
              <img
                src={item.thumbnail}
                alt={`${item.title} preview`}
                className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-200 ease-out ${
                  videoReady ? "opacity-0" : "opacity-100"
                }`}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onContextMenu={(event) => event.preventDefault()}
              />
              {item.previewVideo ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-200 ease-out"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={item.thumbnail}
                  controls={false}
                  controlsList="nodownload noremoteplayback"
                  onContextMenu={(event) => event.preventDefault()}
                  onCanPlay={handleCanPlay}
                  onLoadedData={handleCanPlay}
                  src={item.previewVideo}
                />
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:sticky md:top-24 md:self-start">
            <div>
              <h1 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
                {item.title}
              </h1>
              <p className="mt-2 text-base font-semibold text-[var(--text)] sm:mt-3 sm:text-lg">
                {item.price}
              </p>
              <p className="mt-3 text-sm text-[var(--muted)] sm:mt-4 sm:text-base">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-black/10 p-4">
              <h2 className="text-sm font-semibold">Add personalization</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                You can add your nickname or short text directly into the
                animation.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {personalizationItems.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-[var(--muted)]">
                +$X customization fee
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-black/10 p-4">
              <h2 className="text-sm font-semibold">What&apos;s included</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {includedItems.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-black/10 p-4">
              <h2 className="text-sm font-semibold">License</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {licenseNotes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/order?product=${item.slug}`}
                className="inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90 sm:w-auto"
                style={{ background: "var(--gold)", color: "var(--bg)" }}
              >
                Order this animation
              </Link>
              <Link
                href="/shop"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--border)] px-6 py-3 text-sm font-medium transition hover:bg-white/5 sm:w-auto"
              >
                Back to shop
              </Link>
            </div>
            <p className="text-xs text-[var(--muted)]">
              Customizations and payment are completed on the order page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
