import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "The World's Shared Button | A Global Social Experiment",
  description:
    "Every person on Earth shares this button. What happens if humanity keeps clicking? Join the global social experiment and be part of history.",
  keywords: [
    "shared button",
    "global experiment",
    "social experiment",
    "click button",
    "worldwide",
  ],
  openGraph: {
    title: "The World's Shared Button",
    description: "Every person on Earth shares this button. What happens if humanity keeps clicking?",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The World's Shared Button",
    description: "Every person on Earth shares this button. What happens if humanity keeps clicking?",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The World's Shared Button",
  },
};

export const viewport = {
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
