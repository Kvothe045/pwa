import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My PWA Landing Page',
  description: 'A beautiful PWA landing page that works offline',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'pwa', 'landing page'],
  authors: [{ name: 'Your Name' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="MyPWA" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}