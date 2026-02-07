import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reputation & Reviews | R.A. Design",
  description: "Client feedback and reviews from previous animation commissions.",
};

export default function ReputationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
