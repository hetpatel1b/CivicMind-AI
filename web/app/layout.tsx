import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
};

export const metadata: Metadata = {
  title: "CivicMind AI",
  description: "AI-Powered Civic Intelligence Platform",
  openGraph: {
    title: "CivicMind AI",
    description: "AI-Powered Civic Intelligence Platform",
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
    description: "AI-Powered Civic Intelligence Platform",
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

import { ThemeProvider } from "@/design-system/theme";
import { MotionProvider } from "@/design-system/motion";
import { AppShell } from "@/design-system/layout";
import { AmbientCanvas } from "@/design-system/canvas";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth overscroll-none`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__NEXT_PUBLIC_SUPABASE_URL = ${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL || '')};
              window.__NEXT_PUBLIC_SUPABASE_ANON_KEY = ${JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')};
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <MotionProvider>
            <AppShell>
              <AmbientCanvas />
              {children}
            </AppShell>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
