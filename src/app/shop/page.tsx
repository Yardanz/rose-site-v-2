"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { shopItems } from "@/data/shop";

type PlatformFilter = "all" | "steam" | "discord";
type SteamTypeFilter = "artwork" | "workshop" | null;
type ArtworkTypeFilter = "man" | "woman" | "couple" | null;

type SegmentOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentControlProps<T extends string> = {
  label?: string;
  options: Array<SegmentOption<T>>;
  value: T | null;
  onChange: (value: T) => void;
};

function SegmentControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentControlProps<T>) {
  return (
    <div className="space-y-2">
      {label ? (
        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]/70">
          {label}
        </span>
      ) : null}
      <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1">
        {options.map((option, index) => {
          const isActive = value === option.value;
          const showDivider = index !== options.length - 1;
          return (
            <div key={option.value} className="flex items-center">
              <button
                type="button"
                onClick={() => onChange(option.value)}
                className={[
                  "rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/60",
                  isActive
                    ? "bg-[var(--gold)] text-[var(--bg)] shadow-[0_0_12px_rgba(216,179,86,0.25)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]",
                ].join(" ")}
              >
                {option.label}
              </button>
              {showDivider ? (
                <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShopCard({
  slug,
  title,
  price,
  description,
  tags,
  thumbnail,
  previewVideo,
}: {
  slug: string;
  title: string;
  price: string;
  description: string;
  tags: string[];
  thumbnail: string;
  previewVideo?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setVideoReady(false);
    setHoverKey((prev) => prev + 1);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => undefined);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setVideoReady(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCanPlay = () => {
    if (!videoRef.current) return;
    if (isHovered) {
      setVideoReady(true);
      videoRef.current.play().catch(() => undefined);
    }
  };

  return (
    <Link
      href={`/shop/${slug}`}
      className="group relative block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-white/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="relative overflow-hidden rounded-xl border border-[var(--border)]">
        <div className="relative aspect-[9/16] bg-black/20">
          <img
            src={thumbnail}
            alt={`${title} preview`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ease-out ${
              isHovered && videoReady ? "opacity-0" : "opacity-100"
            }`}
            draggable={false}
          />
        </div>
        {previewVideo ? (
          <video
            key={hoverKey}
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ease-out ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            controlsList="nodownload noremoteplayback"
            onContextMenu={(event) => event.preventDefault()}
            onCanPlay={handleCanPlay}
            onLoadedData={handleCanPlay}
            poster={thumbnail}
            src={previewVideo}
          />
        ) : null}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-xs text-[var(--muted)]">{price}</span>
        </div>
        <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
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

export default function ShopPage() {
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [steamType, setSteamType] = useState<SteamTypeFilter>(null);
  const [artworkType, setArtworkType] = useState<ArtworkTypeFilter>(null);

  const filteredItems = useMemo(() => {
    if (platform === "all") return shopItems;

    if (platform === "discord") {
      return shopItems.filter((item) => item.platform === "discord");
    }

    const steamItems = shopItems.filter((item) => item.platform === "steam");

    if (!steamType) return steamItems;

    if (steamType === "workshop") {
      return steamItems.filter((item) => item.steamType === "workshop");
    }

    const artworkItems = steamItems.filter(
      (item) => item.steamType === "artwork",
    );

    if (!artworkType) return artworkItems;

    return artworkItems.filter((item) => item.artworkType === artworkType);
  }, [platform, steamType, artworkType]);

  const handlePlatformChange = (value: PlatformFilter) => {
    setPlatform(value);
    setSteamType(null);
    setArtworkType(null);
  };

  const handleSteamTypeChange = (value: SteamTypeFilter) => {
    setSteamType(value);
    setArtworkType(null);
  };

  const handleArtworkTypeChange = (value: ArtworkTypeFilter) => {
    setArtworkType(value);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Shop</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Ready-to-use motion assets with fixed pricing.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-black/20 p-4 text-sm text-[var(--muted)]">
          <p>
            These are reusable packs with a fixed price. Instant delivery after
            purchase will be added soon.
          </p>
          <p className="mt-3">
            Until checkout is available, you can browse the catalog and request
            a pack via{" "}
            <a
              href="/order"
              className="text-[var(--text)] underline decoration-white/20 underline-offset-4 hover:text-[var(--gold)]"
            >
              Order
            </a>
            .
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="h-px w-full bg-white/5" />
          <div className="rounded-3xl border border-white/10 bg-black/20 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]/70">
              Filter by platform and artwork type.
            </p>
            <div className="mt-4 space-y-4">
              <SegmentControl
                label="Platform"
                value={platform}
                onChange={handlePlatformChange}
                options={[
                  { label: "All", value: "all" },
                  { label: "Steam", value: "steam" },
                  { label: "Discord", value: "discord" },
                ]}
              />

              {platform === "steam" ? (
                <SegmentControl
                  label="Steam type"
                  value={steamType}
                  onChange={handleSteamTypeChange}
                  options={[
                    { label: "Artwork", value: "artwork" },
                    { label: "Workshop", value: "workshop" },
                  ]}
                />
              ) : null}

              {platform === "steam" && steamType === "artwork" ? (
                <SegmentControl
                  label="Artwork type"
                  value={artworkType}
                  onChange={handleArtworkTypeChange}
                  options={[
                    { label: "Man", value: "man" },
                    { label: "Woman", value: "woman" },
                    { label: "Couple", value: "couple" },
                  ]}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ShopCard
              key={item.slug}
              slug={item.slug}
              title={item.title}
              price={item.price}
              description={item.description}
              tags={item.tags}
              thumbnail={item.thumbnail}
              previewVideo={item.previewVideo}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
