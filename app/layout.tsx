import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.pocketnotes.in"),
  title: {
    default: "Pocket Notes — Small Books, Big Ideas",
    template: "%s — Pocket Notes",
  },
  description:
    "Pocket Notes makes A6 notebooks for people who think in fragments and write before they forget.",
  openGraph: {
    type: "website",
    siteName: "Pocket Notes",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
