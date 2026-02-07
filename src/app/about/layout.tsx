import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | R.A. Design",
  description:
    "Motion designer creating animated avatars and banners for Steam & Discord.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
