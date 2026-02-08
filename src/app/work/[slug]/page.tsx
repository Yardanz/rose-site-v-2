import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/data/works";
import WorkPreviewClient from "@/components/WorkPreviewClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const GALLERY_DESCRIPTION =
  "The following range of paid services is included in the premium animation pack:\n- basic loop\n- background movement\n- personal static decoration\n- particles\n- body movement\n- eye blinking movement\n- 3D elements\n- static element effects\n- personalized text animation\n- nickname animation\n- personalized user ID (your personal right to use this animation)\n\nThe animator (me) reserves the right to identify themselves as the author and present your animation on my work platforms.  \nThe authorship of the original art is always indicated whenever possible.";

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

  const parseDescription = (description: string) => {
    const lines = description.split("\n");
    const overviewLines: string[] = [];
    const included: string[] = [];
    const notes: string[] = [];
    let inList = false;
    let listEnded = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        if (inList) listEnded = true;
        continue;
      }
      if (trimmed.startsWith("-")) {
        inList = true;
        included.push(trimmed.replace(/^-+\s*/, ""));
        continue;
      }
      if (!inList && !listEnded) {
        overviewLines.push(trimmed);
      } else {
        notes.push(trimmed);
      }
    }

    return {
      overview: overviewLines.join(" "),
      included,
      notes,
    };
  };

  const { overview, included, notes } = parseDescription(GALLERY_DESCRIPTION);

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
          <WorkPreviewClient title={work.title} previewSrc={work.previewSrc} />

          <div className="flex flex-col gap-6 md:sticky md:top-24 md:self-start">
            <div>
              <p className="text-sm text-[var(--muted)]">{work.type}</p>
              <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                {work.title}
              </h1>
              <p className="mt-4 text-[var(--muted)]">
                {overview || work.description}
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

            {included.length > 0 ? (
              <div className="rounded-2xl border border-[var(--border)] bg-black/10 p-4">
                <h2 className="text-sm font-semibold">What&apos;s included</h2>
                <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                  {included.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]/70"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {notes.length > 0 ? (
              <div className="rounded-2xl border border-[var(--border)] bg-black/10 p-4">
                <h2 className="text-sm font-semibold">License / Notes</h2>
                <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                  {notes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/order"
                className="inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90 sm:w-auto"
                style={{ background: "var(--gold)", color: "var(--bg)" }}
              >
                Order similar
              </Link>
              <Link
                href="/gallery"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--border)] px-6 py-3 text-sm font-medium transition hover:bg-white/5 sm:w-auto"
              >
                Back to gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
