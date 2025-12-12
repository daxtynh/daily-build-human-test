import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Human Test | Celebrate Your Beautiful Imperfections",
  description:
    "In a world of perfect AI, prove you're gloriously human. Take the test and celebrate your beautiful imperfections.",
  openGraph: {
    title: "The Human Test",
    description: "Prove you're gloriously, imperfectly human.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Human Test",
    description: "Prove you're gloriously, imperfectly human.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
