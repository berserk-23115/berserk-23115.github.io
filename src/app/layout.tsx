import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const url = "https://berserk-23115.github.io";
const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Anushk Kumar — Computational Matter",
  description:
    "Portfolio of Anushk Kumar: AI, usable security, systems, GPU computing, and open-source engineering at IIIT Delhi.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anushk Kumar — Computational Matter",
    description:
      "AI, systems, security, and GPU compute. Engineering where the details are the product.",
    url,
    siteName: "Anushk Kumar",
    type: "profile",
    images: [{ url: "/social.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anushk Kumar",
    description: "AI · Systems · Security · GPU Compute",
    images: ["/social.png"],
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={manrope.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
