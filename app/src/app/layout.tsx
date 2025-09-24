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
  metadataBase: new URL("https://youstillmatter.org"),
  title: {
    default: "YouStillMatter | Compassionate Mental Health Support",
    template: "%s | YouStillMatter",
  },
  description:
    "YouStillMatter is a compassionate hub with mental health resources, grounding tools, and community stories designed to remind you that you are never alone.",
  keywords: [
    "mental health",
    "anxiety",
    "depression",
    "youth mental health",
    "resilience",
    "wellness resources",
  ],
  openGraph: {
    title: "YouStillMatter | Compassionate Mental Health Support",
    description:
      "Discover grounded mental health resources, hope-filled stories, and practical classroom supports crafted for every step of your wellness journey.",
    url: "https://youstillmatter.org",
    siteName: "YouStillMatter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouStillMatter | Compassionate Mental Health Support",
    description:
      "A community-built space with resources, coping tools, and crisis support so you always know you still matter.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
