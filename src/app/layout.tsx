import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Toolix – Free Online Tools", template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  verification: { google: "eZbwHANI-HYBCeaBv0GHGVQF_PDaDwvyZvAgU8jEfXE" },
  keywords: ["free online tools", "image compressor", "word counter", "PDF tools", "online calculators", "SEO tools"],
  icons: { icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] },
  manifest: "/site.webmanifest",
  openGraph: { type: "website", siteName: siteConfig.name, title: "Toolix – Free Online Tools", description: siteConfig.description, url: siteConfig.url, locale: "en", images: [{ url: "/toolix-logo.png", alt: "Toolix — Smart tools. Simpler work." }] },
  twitter: { card: "summary", title: "Toolix – Free Online Tools", description: siteConfig.description, images: ["/toolix-logo.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  alternates: { canonical: siteConfig.url }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f1f3d" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
