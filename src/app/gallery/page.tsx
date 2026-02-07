"use client";

import { useMemo, useState } from "react";
import WorkCard from "@/components/WorkCard";
import { works } from "@/data/works";

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

export default function GalleryPage() {
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [steamType, setSteamType] = useState<SteamTypeFilter>(null);
  const [artworkType, setArtworkType] = useState<ArtworkTypeFilter>(null);

  const filteredWorks = useMemo(() => {
    if (platform === "all") return works;

    if (platform === "discord") {
      return works.filter((work) => work.platform === "discord");
    }

    const steamWorks = works.filter((work) => work.platform === "steam");

    if (!steamType) return steamWorks;

    if (steamType === "workshop") {
      return steamWorks.filter((work) => work.steamType === "workshop");
    }

    const artworkWorks = steamWorks.filter(
      (work) => work.steamType === "artwork",
    );

    if (!artworkType) return artworkWorks;

    return artworkWorks.filter((work) => work.artworkType === artworkType);
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
            <h1 className="text-3xl font-semibold">Gallery</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              A curated showcase of custom motion work for Steam & Discord
              profiles.
            </p>
          </div>
          <a
            href="/order"
            className="inline-flex items-center justify-center rounded-2xl border border-[var(--border)] px-5 py-2 text-sm font-medium transition hover:bg-white/5"
          >
            Order
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-black/20 p-4 text-sm text-[var(--muted)]">
          <p>
            These pieces were created as one-of-a-kind commissions. They are
            not for sale and exist here to demonstrate style, quality, and
            creative range.
          </p>
          <p className="mt-3">
            Looking for ready-to-use assets? Visit the{" "}
            <a
              href="/shop"
              className="text-[var(--text)] underline decoration-white/20 underline-offset-4 hover:text-[var(--gold)]"
            >
              Shop
            </a>
            . Want something made specifically for you?{" "}
            <a
              href="/order"
              className="text-[var(--text)] underline decoration-white/20 underline-offset-4 hover:text-[var(--gold)]"
            >
              Order
            </a>{" "}
            a custom animation.
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
          {filteredWorks.map((work) => (
            <WorkCard
              key={work.slug}
              slug={work.slug}
              title={work.title}
              type={work.type}
              tags={work.tags}
              previewSrc={work.previewSrc}
            />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ready to start a project?</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Tell me about your idea and I will send a quote.
            </p>
          </div>
          <a
            href="/order"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--gold)", color: "var(--bg)" }}
          >
            Order animation
          </a>
        </div>
      </section>
    </main>
  );
}
