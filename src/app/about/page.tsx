"use client";

import Image from "next/image";

const socialLinks = [
  {
    src: "/about/social-1.webp",
    label: "Open social link 1",
    href: "https://www.artstation.com/roseagnes",
  },
  {
    src: "/about/social-2.webp",
    label: "Open social link 2",
    href: "https://example.com",
  },
  {
    src: "/about/social-3.webp",
    label: "Open social link 3",
    href: "https://example.com",
  },
  {
    src: "/about/social-4.webp",
    label: "Open social link 4",
    href: "https://www.youtube.com/channel/UCb_DujveDEglvix42vYlGRw",
  },
  {
    src: "/about/social-5.webp",
    label: "Open social link 5",
    href: "https://steamcommunity.com/groups/roseagnes",
  },
  {
    src: "/about/social-6.webp",
    label: "Open social link 6",
    href: "https://example.com",
  },
];

// TODO: place images into public/about/ (logo, social icons, steam/discord buttons)
export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20 sm:h-24 sm:w-24">
                {/* animated webp */}
                <Image
                  src="/about/logo.webp"
                  alt="R.A. Design logo"
                  width={120}
                  height={120}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  R.A. Design
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-wide text-[var(--gold)]/90">
                  About me
                </h1>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/80 md:text-base md:leading-relaxed">
              I&apos;m a motion designer focused on animated avatars and banners
              for Steam & Discord. I work with your existing artwork and turn it
              into clean, premium loops. Clear communication, fast iterations,
              and formats ready for profile use.
            </p>

            <div className="rounded-2xl border border-white/15 bg-black/15 p-5 shadow-[inset_0_0_12px_rgba(216,179,86,0.08)]">
              <h2 className="text-sm font-semibold">What I do</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--gold)]/80" />
                  <span>Animated avatars and banners with smooth loops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--gold)]/80" />
                  <span>Style-matched motion that respects your artwork.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--gold)]/80" />
                  <span>Exported formats ready for Steam & Discord profiles.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-black/10 p-5">
              <h2 className="text-sm font-semibold">Social media</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {socialLinks.map((item, index) => (
                  <a
                    key={item.src}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="group flex items-center justify-center rounded-2xl border border-[var(--border)] bg-black/20 p-2 shadow-[inset_0_0_12px_rgba(0,0,0,0.35)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] cursor-pointer"
                  >
                    {/* animated webp */}
                    <Image
                      src={item.src}
                      alt={`Social icon ${index + 1}`}
                      width={80}
                      height={80}
                      unoptimized
                      className="h-16 w-16 object-contain sm:h-[68px] sm:w-[68px]"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <div className="mb-6 h-px w-full bg-white/5" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <a
            href="https://steamcommunity.com/id/roseagnes/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full min-h-[120px] items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            {/* animated webp */}
            <Image
              src="/about/btn-steam.webp"
              alt="Steam button"
              width={498}
              height={133}
              unoptimized
              className="block h-auto w-full max-w-[520px] object-contain"
            />
          </a>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full min-h-[120px] items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            {/* animated webp */}
            <Image
              src="/about/btn-discord.webp"
              alt="Discord button"
              width={498}
              height={133}
              unoptimized
              className="block h-auto w-full max-w-[520px] object-contain"
            />
          </a>
        </div>
        <p className="mt-4 text-center text-sm text-[var(--muted)]">
          Prefer direct contact? Add me on Steam or message me on Discord.
        </p>
      </section>
    </main>
  );
}
