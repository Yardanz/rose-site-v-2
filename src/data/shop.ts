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
  {
    slug: "glow-avatar-kit",
    title: "Glow Avatar Kit",
    price: "$9",
    description: "Clean glow animation with subtle motion accents.",
    category: "avatars",
    platform: "discord",
    tags: ["Avatar", "Glow", "Minimal"],
    thumbnail: "/shop/preview-2.jpg",
    previewVideo: "/shop/preview-2.mp4",
    gumroadUrl: "https://gumroad.com/l/glow-avatar-kit",
  },
  {
    slug: "banner-motion-set",
    title: "Banner Motion Set",
    price: "$15",
    description: "Animated banner pack with multiple color variants.",
    category: "banners",
    platform: "steam",
    steamType: "workshop",
    tags: ["Banner", "Motion", "Pack"],
    thumbnail: "/shop/preview-3.jpg",
    previewVideo: "/shop/preview-3.mp4",
    gumroadUrl: "https://gumroad.com/l/banner-motion-set",
  },
  {
    slug: "retro-loop-bundle",
    title: "Retro Loop Bundle",
    price: "$18",
    description: "Retro-inspired loops tailored for profile use.",
    category: "packs",
    platform: "steam",
    steamType: "artwork",
    artworkType: "couple",
    tags: ["Retro", "Loop", "Bundle"],
    thumbnail: "/shop/preview-4.jpg",
    previewVideo: "/shop/preview-4.mp4",
    gumroadUrl: "https://gumroad.com/l/retro-loop-bundle",
  },
  {
    slug: "soft-particles-pack",
    title: "Soft Particles Pack",
    price: "$10",
    description: "Subtle particles and glow motion for avatars.",
    category: "avatars",
    platform: "discord",
    tags: ["Particles", "Soft", "Loop"],
    thumbnail: "/shop/preview-5.jpg",
    previewVideo: "/shop/preview-5.mp4",
    gumroadUrl: "https://gumroad.com/l/soft-particles-pack",
  },
  {
    slug: "cyber-banner-lite",
    title: "Cyber Banner Lite",
    price: "$11",
    description: "Lightweight cyber banner animation for profiles.",
    category: "banners",
    platform: "steam",
    steamType: "artwork",
    artworkType: "woman",
    tags: ["Cyber", "Banner", "Lite"],
    thumbnail: "/shop/preview-6.jpg",
    previewVideo: "/shop/preview-6.mp4",
    gumroadUrl: "https://gumroad.com/l/cyber-banner-lite",
  },
];
