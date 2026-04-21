'use client';

import Link from 'next/link';
import { Sparkles, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    <div className="space-y-4 col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 shrink-0">
                            <div className="bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="font-black text-xl tracking-tighter text-foreground italic uppercase">
                                Cover<span className="text-primary">ly</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Premium mobile covers designed in India. We combine protection with personal style.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/products" className="hover:text-primary transition-colors">All Covers</Link></li>
                            <li><Link href="/products?brand=Apple" className="hover:text-primary transition-colors">iPhone Covers</Link></li>
                            <li><Link href="/products?brand=Samsung" className="hover:text-primary transition-colors">Samsung Covers</Link></li>
                            <li><Link href="/products?brand=OnePlus" className="hover:text-primary transition-colors">OnePlus Covers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Return & Refund</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-sm text-muted-foreground">Subscribe to get special offers and first look at new designs.</p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-muted border-transparent focus:bg-background focus:border-primary/30 h-10 px-4 rounded-xl text-sm outline-none flex-1 transition-all"
                            />
                            <button className="bg-primary text-primary-foreground p-2 rounded-xl hover:opacity-90 transition-opacity">
                                <Mail className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p>&copy; 2026 Coverly Premium. All rights reserved.</p>
                        <span className="hidden md:inline-block h-1 w-1 rounded-full bg-border" />
                        <p className="flex items-center gap-1.5">
                            Crafted with <span className="text-red-500 animate-pulse">❤️</span> by <span className="text-primary italic">Aniket Gupta</span>
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
