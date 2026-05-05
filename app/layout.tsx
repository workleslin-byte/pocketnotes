import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/site/Cursor";
import { RevealOnScroll } from "@/components/site/Reveal";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.pocketnotes.in"),
  title: {
    default: "Pocket Notes — Small Books, Big Ideas",
    template: "%s — Pocket Notes",
  },
  description:
    "Small grid notebooks for fast thinkers. A6, 64 pages, staple-bound, made in India. Open it, write what arrives.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Pocket Notes",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='8' y='4' width='18' height='24' rx='2' fill='%23FAF3E3' stroke='%231A1612' stroke-width='2.5'/%3E%3Crect x='6' y='4' width='4' height='24' fill='%23F5C13D' stroke='%231A1612' stroke-width='2.5'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}
    >
      <body>
        <Cursor />
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
