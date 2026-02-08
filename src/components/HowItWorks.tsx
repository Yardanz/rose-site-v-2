"use client";

import { useEffect, useState } from "react";

// TODO: place GIFs into public/howitworks/
const examples = [
  "/howitworks/profile-1.gif",
  "/howitworks/profile-2.gif",
  "/howitworks/profile-3.gif",
  "/howitworks/profile-4.gif",
  "/howitworks/profile-5.gif",
];

const steps = [
  "Send your image + notes",
  "We confirm the idea and details",
  "I animate and show a preview",
  "You approve — I deliver WebM/MP4",
];

export default function HowItWorks() {
  const [index, setIndex] = useState(0);
  const [openGif, setOpenGif] = useState<string | null>(null);

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  };

  const goNext = () => {
    setIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!openGif) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGif(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openGif]);

  return (
    <section className="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">How it works</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              You send your image — I turn it into a clean, premium loop for
              Steam/Discord. We confirm details, I animate, you review, then I
              deliver the final files.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-[var(--muted)]">
            {steps.map((step) => (
              <li
                key={step}
                className="rounded-2xl border border-[var(--border)] bg-black/10 px-4 py-3"
              >
                {step}
              </li>
            ))}
          </ul>

          <div className="flex justify-center sm:justify-start">
            <a
              href="/order"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90"
              style={{ background: "var(--gold)", color: "var(--bg)" }}
            >
              Order animation
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20">
            <div className="aspect-video w-full">
              <img
                src={examples[index]}
                alt={`Example ${index + 1}`}
                className="h-full w-full cursor-zoom-in object-cover transition"
                onClick={() => setOpenGif(examples[index])}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs text-[var(--muted)] transition hover:border-white/20 hover:text-[var(--text)]"
            >
              Prev
            </button>
            <div className="flex items-center gap-2">
              {examples.map((_, i) => (
                <span
                  key={`dot-${i}`}
                  className={`h-2 w-2 rounded-full ${
                    i === index ? "bg-[var(--gold)]" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs text-[var(--muted)] transition hover:border-white/20 hover:text-[var(--text)]"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {openGif ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur"
          onClick={() => setOpenGif(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <span className="text-xs text-[var(--muted)]">Preview</span>
              <button
                type="button"
                onClick={() => setOpenGif(null)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)] transition hover:border-white/20 hover:text-[var(--text)]"
              >
                Close
              </button>
            </div>
            <div className="aspect-video w-full bg-black/20">
              <img
                src={openGif}
                alt="GIF preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
