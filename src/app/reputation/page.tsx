"use client";

import { useEffect, useState } from "react";
import { proofReviews } from "@/data/proofReviews";

type Review = {
  id: string;
  created_at: string;
  nickname: string;
  body: string;
  status: "pending" | "approved" | "rejected";
};

type FormState = "idle" | "submitting" | "success" | "error";

export default function ReputationPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [body, setBody] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data: { reviews?: Review[] }) => {
        if (!isMounted) return;
        setReviews(data.reviews ?? []);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const scriptId = "turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const interval = window.setInterval(() => {
      const turnstile = (
        window as unknown as {
          turnstile?: {
            render: (el: HTMLElement, opts: Record<string, unknown>) => string;
            reset: (widgetId?: string) => void;
          };
        }
      ).turnstile;
      const container = document.getElementById("turnstile-container");
      if (turnstile && container && container.childElementCount === 0) {
        const widgetId = turnstile.render(container, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
          "error-callback": () => setTurnstileToken(null),
          "expired-callback": () => setTurnstileToken(null),
        });
        setTurnstileWidgetId(widgetId);
        window.clearInterval(interval);
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!nickname.trim() || !body.trim()) {
      setError("Nickname and comment are required.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    setFormState("submitting");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname,
        body,
        token: turnstileToken,
      }),
    });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "Failed to submit review.");
      }

      setFormState("success");
      setNickname("");
      setBody("");
      setTurnstileToken(null);
      const turnstile = (
        window as unknown as {
          turnstile?: { reset: (widgetId?: string) => void };
        }
      ).turnstile;
      if (turnstile) {
        turnstile.reset(turnstileWidgetId ?? undefined);
      }
    } catch (err) {
      setFormState("error");
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message || "Something went wrong. Please try again.");
      setTurnstileToken(null);
      const turnstile = (
        window as unknown as {
          turnstile?: { reset: (widgetId?: string) => void };
        }
      ).turnstile;
      if (turnstile) {
        turnstile.reset(turnstileWidgetId ?? undefined);
      }
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Reputation</h1>
          <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]/80">
            Selected feedback from clients across different platforms. A
            concise snapshot of experience, quality, and trust.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-black/10 p-5"
            >
              <div className="flex items-start justify-between gap-3 text-xs text-[var(--muted)]">
                <span className="text-[var(--text)]">
                  {review.name} • {review.platform} • {review.date}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text)]">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-black/15 p-5 text-center">
          <p className="text-sm text-[var(--muted)]">
            Want to see more feedback? You can find additional reviews and full
            conversations on my social platforms.
          </p>
          <div className="mt-3 flex flex-col items-center gap-2">
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] px-5 py-2 text-xs font-medium text-[var(--muted)] transition hover:border-white/30 hover:text-[var(--text)] hover:bg-white/5 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]"
            >
              More reviews &amp; proof →
            </a>
            <span className="text-[11px] text-[var(--muted)]">
              Includes screenshots, full conversations, and external platforms
            </span>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold">Reviews from this site</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Approved reviews submitted directly on this website.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-sm text-[var(--muted)]">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              No approved reviews yet.
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-black/10 p-5"
              >
                <div className="flex items-start justify-between gap-3 text-xs text-[var(--muted)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[var(--text)]">{review.nickname}</span>
                  </div>
                  {review.created_at ? (
                    <span className="text-[10px] text-[var(--muted)]">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text)]">
                  {review.body}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 rounded-3xl border border-[var(--border)] bg-black/10 p-6">
          <h3 className="text-xl font-semibold">Leave a review</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Your review will appear after approval.
          </p>

          {formState === "success" ? (
            <div className="mt-6 text-sm text-[var(--gold)]">
              Thanks! Your review will appear after approval.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <label className="flex flex-col gap-2 text-sm">
                Nickname
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="rounded-2xl border border-[var(--border)] bg-black/20 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
                  maxLength={40}
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                Comment
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="rounded-2xl border border-[var(--border)] bg-black/20 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
                  rows={4}
                  maxLength={500}
                  required
                />
              </label>

              <div id="turnstile-container" className="mt-2" />

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition hover:opacity-90"
                style={{ background: "var(--gold)", color: "var(--bg)" }}
              >
                {formState === "submitting" ? "Sending..." : "Submit review"}
              </button>

              {formState === "error" && error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : null}
            </form>
          )}
        </div>
      </section>

    </main>
  );
}
