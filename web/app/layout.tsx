import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AssistantWidget from '@/components/assistant/AssistantWidget';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CivicMind AI | Smart Civic Reporting",
  description: "Smart civic reporting for modern cities. Powered by AI to ensure the right departments get the right information instantly.",
  openGraph: {
    title: "CivicMind AI",
    description: "Smart civic reporting for modern cities.",
    url: "https://civicmind-ai.com",
    siteName: "CivicMind AI",
    images: [
      {
        url: "https://civicmind-ai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CivicMind AI Preview",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicMind AI",
    description: "Smart civic reporting for modern cities.",
    images: ["https://civicmind-ai.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://civicmind-ai.com",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
