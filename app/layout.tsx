import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ormania.ca"),
  title: {
    default: "Ormania — Fine Jewelry, Custom Pieces & Repairs in Laval",
    template: "%s — Bijouterie Ormania, Laval",
  },
  description:
    "Bijouterie Ormania is a Laval jewelry boutique specializing in fine jewelry, custom pieces, engagement rings, watches, and jewelry repair.",
  icons: { icon: "/brand/ormania-favicon.png", apple: "/brand/ormania-favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0A0908",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col has-action-bar">{children}</body>
    </html>
  );
}
