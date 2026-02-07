import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | R.A. Design",
  description:
    "Answers to common questions about animation orders, delivery time, and pricing.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
