"use client";

import { useState } from "react";
import { Button } from "@/components/Buttons";

type FaqItem = {
  question: string;
  answer: string;
};

const items: FaqItem[] = [
  {
    question: "How long does an order take?",
    answer:
      "It depends on the current queue. Usually 3–10 days. I’ll keep you updated on the stages of work.",
  },
  {
    question: "What does the price depend on?",
    answer:
      "On the requirements, image complexity, and the number of characters/elements.",
  },
  {
    question: "Are you an artist? Can you draw me an artwork?",
    answer: "No — I don’t draw from scratch. I animate your existing image/artwork.",
  },
  {
    question: "Can I buy an animation I saw in the gallery?",
    answer:
      "No. Gallery works are individual commissions made for specific clients. If you want something in a similar style, place an order and attach your image.",
  },
  {
    question: "Can I pay in advance (half or a part of the cost)?",
    answer: "Yes, it can be discussed individually.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">FAQ</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Quick answers before you order.
          </p>
        </header>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <button
                key={item.question}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full rounded-2xl border border-[var(--border)] bg-black/10 p-5 text-left transition hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-medium">{item.question}</span>
                  <span className="text-sm text-[var(--muted)]">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
                {isOpen ? (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {item.answer}
                  </p>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-[var(--border)] bg-black/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--muted)]">
            Still have questions? Send your image and I’ll reply on Discord.
          </p>
          <Button asChild className="w-full text-center sm:w-auto">
            <a href="/order">Order</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
