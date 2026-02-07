export type Testimonial = {
  id: string;
  author: string;
  source?: string;
  text: string;
  date?: string;
  screenshotSrc?: string;
};

// TODO: place screenshots into public/reviews/
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "flaresta",
    source: "Fiverr",
    text:
      "Working with Rose was an absolute pleasure. Her responses were impressively fast, and the workshop showcase she delivered exceeded all of my expectations, it looks stunning. I'll definitely be purchasing from her again without hesitation.",
    date: "2024-10-03",
    screenshotSrc: "/reviews/review-1.png",
  },
  {
    id: "t2",
    author: "Kira",
    source: "Steam",
    text:
      "Fast delivery and great communication. The banner motion is exactly the vibe I wanted.",
    date: "2024-11-12",
    screenshotSrc: "/reviews/review-2.png",
  },
  {
    id: "t3",
    author: "Rex",
    source: "Discord",
    text:
      "Very clean work. Subtle movement that still looks alive without being distracting.",
    date: "2025-01-07",
  },
  {
    id: "t4",
    author: "Lyra",
    source: "Steam",
    text:
      "Loved the attention to detail. The glow and timing feel polished and professional.",
    date: "2025-02-19",
    screenshotSrc: "/reviews/review-3.png",
  },
  {
    id: "t5",
    author: "Mint",
    source: "Discord",
    text:
      "Got a beautiful loop and quick revisions. Super easy to work with.",
    date: "2025-03-28",
  },
  {
    id: "t6",
    author: "Violet",
    source: "Steam",
    text:
      "Great eye for motion. Everything feels balanced and smooth.",
    date: "2025-04-14",
    screenshotSrc: "/reviews/review-4.png",
  },
  // {
  //   id: "t7",
  //   author: "Echo",
  //   source: "Discord",
  //   text:
  //     "Perfect loop for my profile. Clean, modern, and very responsive support.",
  //   date: "2025-05-22",
  // },
  // {
  //   id: "t8",
  //   author: "Rin",
  //   source: "Steam",
  //   text:
  //     "The animation elevates the artwork a lot. Will order again for sure.",
  //   date: "2025-06-08",
  //   screenshotSrc: "/reviews/review-5.png",
  // },
];
