import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "R.A. Design";
const siteDescription =
  "Custom animated avatars and banners for Steam and Discord. Clean loops, premium motion design, clear communication.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | R.A. Design",
  },
  description: siteDescription,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    url: "https://example.com",
    images: [
      {
        // TODO: replace placeholder with 1200x630 OG image
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "R.A. Design - animated avatars and banners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

// To change the favicon, replace src/app/favicon.ico

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
