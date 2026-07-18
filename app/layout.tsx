import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyPix AI — Geospatial AI Platform",
  description: "Train custom AI models to detect, count, and monitor objects in satellite, aerial, and drone imagery.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "FlyPix AI — Geospatial AI Platform",
    description: "Detect, count, and monitor anything in satellite, aerial, and drone imagery.",
    type: "website",
    images: [{ url: "/social-preview.png", width: 1707, height: 907, alt: "A pale globe surrounded by geospatial detection signals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyPix AI — Geospatial AI Platform",
    description: "Detect, count, and monitor anything in satellite, aerial, and drone imagery.",
    images: ["/social-preview.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
