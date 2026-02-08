export type ShopItem = {
  slug: string;
  title: string;
  price: string;
  description: string;
  category: "avatars" | "banners" | "loops" | "packs";
  platform: "steam" | "discord";
  steamType?: "artwork" | "workshop";
  artworkType?: "man" | "woman" | "couple";
  tags: string[];
  thumbnail: string;
  previewVideo?: string;
  gumroadUrl?: string;
};

export const shopItems: ShopItem[] = [
  {
    slug: "neon-loop-pack",
    title: "Neon Loop Pack",
    price: "$12",
    description: "Ready-to-use neon loop for Steam/Discord profiles.",
    category: "loops",
    platform: "steam",
    steamType: "artwork",
    artworkType: "man",
    tags: ["Loop", "Neon", "Profile"],
    thumbnail: "/shop/preview-1.jpg",
    previewVideo: "/shop/preview-1.mp4",
    gumroadUrl: "https://gumroad.com/l/neon-loop-pack",
  },
];
