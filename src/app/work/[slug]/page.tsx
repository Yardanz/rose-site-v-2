import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/data/works";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);

  if (!work) {
    return {
      title: "Work Not Found | R.A. Design",
      description: "This work could not be found.",
    };
  }

  return {
    title: `${work.title} | Animated Motion Design`,
    description: work.description,
    openGraph: work.previewSrc
      ? {
          images: [
            {
              url: work.previewSrc,
              width: 1200,
              height: 630,
              alt: work.title,
            },
          ],
        }
      : undefined,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;

  const work = works.find((w) => w.slug === slug);
  if (!work) return notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-8">
        <Link
          href="/gallery"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-black/20 px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
        >
          ← Back to gallery
        </Link>
      </div>

      <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-10">
          <div className="relative flex max-h-[70vh] items-center justify-center rounded-2xl border border-[var(--border)] bg-black/30 p-4">
            <div className="aspect-[9/16] w-full max-h-[70vh] max-w-[520px] overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20">
              {work.previewSrc ? (
                <video
                  className="h-full w-full object-contain object-center"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay
                >
                  <source src={work.previewSrc} />
                </video>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:sticky md:top-24 md:self-start">
            <div>
              <p className="text-sm text-[var(--muted)]">{work.type}</p>
              <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                {work.title}
              </h1>
              <p className="mt-4 whitespace-pre-line text-[var(--muted)]">
                {work.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {work.formats.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {f}
                </span>
              ))}
              {work.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div>
              <Link
                href="/order"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90"
                style={{ background: "var(--gold)", color: "var(--bg)" }}
              >
                Order similar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
