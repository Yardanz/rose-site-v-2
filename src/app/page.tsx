import type { Metadata } from "next";
import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import HowItWorks from "@/components/HowItWorks";
import { works } from "@/data/works";

export const metadata: Metadata = {
  title: "Animated Avatars for Steam & Discord | R.A. Design",
  description:
    "Custom animated avatars and profile animations for Steam and Discord. Send your image and get a clean, premium loop.",
};

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 md:p-14">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -top-24 right-[-80px] h-64 w-64 rounded-full opacity-25 blur-3xl"
             style={{ background: "var(--gold)" }} />

        <p className="text-sm tracking-wide text-[var(--muted)]">
          Motion design for Steam & Discord profiles
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
          Animated avatars & banners
          <span className="block text-[var(--muted)]">
            clean loops, premium feel
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          Custom animation for your static artwork. Optimized for profile use.
          You send an image — I deliver a smooth loop in WebM/MP4.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--gold)", color: "var(--bg)" }}
          >
            Order animation
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-2xl border border-[var(--border)] px-6 py-3 text-sm font-medium transition hover:bg-white/5"
          >
            View gallery
          </Link>
        </div>
      </section>

      <HowItWorks />

      {/* FEATURED / NEXT SECTION */}
      <section className="mt-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Selected works</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              A few recent pieces — more in the gallery.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-2xl border border-[var(--border)] px-5 py-2 text-sm font-medium transition hover:bg-white/5"
          >
            Open gallery
          </Link>
        </div>

        {/* works grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.slice(0, 3).map((work) => (
            <WorkCard
              key={work.slug}
              slug={work.slug}
              title={work.title}
              type={work.type}
              tags={work.tags}
              previewSrc={work.previewSrc}
              mode="always"
            />
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold">Meet the designer</h2>
          <p className="mt-4 text-sm text-[var(--muted)]">
            I turn existing artwork into clean, premium motion loops for Steam &
            Discord. Clear communication, fast iterations, and formats ready for
            profile use.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90"
              style={{ background: "var(--gold)", color: "var(--bg)" }}
            >
              About me
            </Link>
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--border)] px-6 py-3 text-sm font-medium transition hover:bg-white/5"
            >
              Order
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
