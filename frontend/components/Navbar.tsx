'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Sparkles, Phone, Zap, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { selectCartCount } from '@/features/cart/cartSlice';

export default function Navbar() {
    const cartCount = useSelector(selectCartCount);
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { label: 'All Covers', href: '/products' },
        { label: 'Featured', href: '/#featured' },
        { label: 'Track Order', href: '/track-order' },
    ];

    return (
        <header 
            className={cn(
                "sticky top-0 z-[100] w-full transition-all duration-300 border-b",
                isScrolled 
                    ? "bg-background/80 backdrop-blur-xl border-border shadow-sm py-2" 
                    : "bg-background border-transparent py-4"
            )}
        >
            <div className="container mx-auto max-w-7xl px-4 md:px-6 flex items-center gap-4 md:gap-8">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center space-x-2 group shrink-0">
                    <div className="bg-primary p-1.5 rounded-xl rotate-0 group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                        <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-black text-xl tracking-tighter text-foreground italic uppercase">
                        Cover<span className="text-primary">ly</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className={cn(
                                "px-4 py-2 text-sm font-bold transition-all rounded-full hover:bg-muted",
                                pathname === link.href ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    
                    {/* Categories Dropdown */}
                    <div className="relative group px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-all rounded-full hover:bg-muted cursor-pointer flex items-center gap-1">
                        Categories <ChevronDown className="h-4 w-4" />
                        <div className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 overflow-hidden z-[110]">
                            <Link href="/products?category=Phone Covers" className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-xl transition-colors">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>Phone Covers</span>
                            </Link>
                            <Link href="/products?category=Chargers" className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-xl transition-colors">
                                <Zap className="h-4 w-4 text-primary" />
                                <span>Fast Chargers</span>
                            </Link>
                            <Link href="/products?category=Audio Accessories" className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-xl transition-colors">
                                <Headphones className="h-4 w-4 text-primary" />
                                <span>Audio Accessories</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Global Search */}
                <form 
                    onSubmit={handleSearch}
                    className="hidden lg:flex flex-1 max-w-sm relative group items-center"
                >
                    <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search for models..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-muted/50 border-transparent focus:bg-background focus:border-primary/30 h-10 pl-10 pr-4 rounded-full text-sm outline-none transition-all ring-primary/10 focus:ring-4"
                    />
                </form>

                {/* Action Icons */}
                <div className="ml-auto flex items-center space-x-2 md:space-x-4">
                    <Link href="/login" className="hidden sm:flex">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="rounded-full relative">
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-[10px] font-black text-primary-foreground h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </Link>
                    
                    {/* Mobile Menu Toggle */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden rounded-full"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-t overflow-hidden"
                    >
                        <div className="container px-4 py-6 space-y-4">
                            <form 
                                onSubmit={handleSearch}
                                className="relative group flex items-center"
                            >
                                <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
                                <input 
                                    type="text" 
                                    placeholder="Search models..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-muted h-12 pl-10 pr-4 rounded-2xl text-sm outline-none border-transparent focus:border-primary/30 transition-all"
                                />
                            </form>
                            <div className="flex flex-col space-y-2">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.href} 
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="px-4 py-3 text-lg font-bold text-muted-foreground hover:text-primary transition-colors hover:bg-muted rounded-2xl"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="px-4 py-3 text-lg font-bold text-muted-foreground">
                                    Categories
                                    <div className="flex flex-col space-y-2 mt-2 ml-4">
                                        <Link href="/products?category=Phone Covers" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-primary">Phone Covers</Link>
                                        <Link href="/products?category=Chargers" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-primary">Fast Chargers</Link>
                                        <Link href="/products?category=Audio Accessories" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-primary">Audio Accessories</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
