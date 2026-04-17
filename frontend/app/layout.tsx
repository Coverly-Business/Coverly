import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coverly | Premium Mobile Covers',
  description: 'Shop the best mobile covers in India',
};

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">COVERLY</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">All Covers</Link>
          <Link href="/track-order" className="transition-colors hover:text-foreground/80 text-foreground/60">Track Order</Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/cart">
            <Button size="sm">Cart</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen bg-background font-sans antialiased')}>
        <StoreProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="py-6 md:px-8 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  &copy; 2024 Coverly. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
