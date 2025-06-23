import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/theme-context";
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
  title: "Wuhr AI VRAM Insight - Professional GPU Memory Calculator",
  description: "Professional AI model VRAM calculator supporting training, inference & fine-tuning modes with precise formulas based on latest engineering practices",
  keywords: ["AI", "GPU", "VRAM", "Memory Calculator", "Deep Learning", "Machine Learning", "Training", "Inference", "Fine-tuning"],
  authors: [{ name: "Wuhr AI Team", url: "https://wuhrai.com" }],
  creator: "Wuhr AI",
  publisher: "Wuhr AI",
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
  openGraph: {
    title: "Wuhr AI VRAM Insight",
    description: "Professional GPU memory calculator for AI models",
    url: "https://vram.wuhrai.com",
    siteName: "Wuhr AI VRAM Insight",
    images: [
      {
        url: "https://vram.wuhrai.com/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Wuhr AI VRAM Insight Preview",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wuhr AI VRAM Insight",
    description: "Professional GPU memory calculator for AI models",
    images: ["https://vram.wuhrai.com/icon-512x512.png"],
    creator: "@wuhr_ai",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
