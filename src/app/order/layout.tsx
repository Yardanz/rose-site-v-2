import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Animation | R.A. Design",
  description: "Send your image and order a custom animated avatar or banner.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
