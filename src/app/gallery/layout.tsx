import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Animated Avatars & Motion Design",
  description: "Browse examples of animated avatars and motion design projects.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
