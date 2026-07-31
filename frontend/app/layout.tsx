import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactLenis } from 'lenis/react';
import Script from 'next/script';
import { Toaster } from "sonner";
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://coverly-nine.vercel.app'),
  title: {
    default: 'Coverly | Premium Mobile Covers',
    template: '%s | Coverly',
  },
  description: 'Shop premium, precision-fit mobile covers for iPhone, Samsung, OnePlus, and more — designed in India, delivered worldwide.',
  openGraph: {
    title: 'Coverly | Premium Mobile Covers',
    description: 'Shop premium, precision-fit mobile covers designed in India.',
    url: 'https://coverly-nine.vercel.app',
    siteName: 'Coverly',
    locale: 'en_IN',
    type: 'website',
  },
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen bg-background font-sans antialiased selection:bg-primary/20')}>
        <StoreProvider>
          <ReactLenis root>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ReactLenis>
        </StoreProvider>
        <Toaster position="top-center" richColors />
        <GoogleAnalytics />
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
      </body>
    </html>
  );
}