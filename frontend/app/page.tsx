'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PhoneModelSection } from '@/components/PhoneModelSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, Star } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

interface Product {
    _id: string;
    name: string;
    basePrice: number;
    images: string[];
    category: string;
    averageRating?: number;
    discount?: number;
}

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products`);
                const data = await res.json();
                setFeaturedProducts(data.data.slice(0, 3));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const categories = [
        { name: 'iPhone Covers', brand: 'Apple', image: '/images/products/glass_case.png' },
        { name: 'Samsung Covers', brand: 'Samsung', image: '/images/products/carbon_fiber_case.png' },
        { name: 'OnePlus Covers', brand: 'OnePlus', image: '/images/products/silicone_case.png' },
        { name: 'Pixel Covers', brand: 'Google', image: '/images/products/lifestyle_setup.png' },
    ];

    return (
        <div className="flex flex-col overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-background" />
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left"
                        >
                            <div className="inline-flex max-w-fit items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
                                <Zap className="h-3 w-3 fill-current" /> New Collection 2026
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                                Protect Your <br />
                                <span className="text-gradient italic">Digital Vibe.</span>
                            </h1>
                            <p className="max-w-[500px] text-lg text-muted-foreground font-medium leading-relaxed">
                                Premium mobile covers that blend high-fashion with extreme durability. Engineered in India, delivered worldwide.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full">
                                <Link href="/products">
                                    <Button size="lg" className="h-14 px-8 rounded-2xl text-base font-bold shadow-2xl shadow-primary/30 group">
                                        Explore Collection <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/#featured">
                                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-base font-bold border-2">
                                        Best Sellers
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                                            <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" width={40} height={40} />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-muted-foreground">
                                    <span className="text-foreground">10k+</span> Happy Customers
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ y: y2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 aspect-[4/5] w-[450px] mx-auto overflow-hidden rounded-[40px] glass-card p-4">
                                <Image 
                                    src="/images/products/hero_lifestyle.png" 
                                    alt="Premium Lifestyle Collection"
                                    fill
                                    className="object-cover rounded-[32px]"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 glass-card p-6 rounded-3xl animate-bounce-slow">
                                <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Price Drop</p>
                                <p className="text-2xl font-bold">₹ 599</p>
                            </div>
                            <div className="absolute -top-10 -left-10 glass-card p-4 rounded-3xl">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-widest">In Stock</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 text-center md:text-left">
                        <div className="space-y-2 flex flex-col items-center md:items-start">
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic">Shop by <span className="text-primary italic">Brands</span></h2>
                            <p className="text-muted-foreground font-medium">Find the perfect fit for your specific device.</p>
                        </div>
                        <Link href="/products">
                            <Button variant="ghost" className="font-bold gap-2">View All <ArrowRight className="h-4 w-4" /></Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, idx) => (
                            <motion.div 
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link 
                                    href={`/products?brand=${cat.brand}`}
                                    className="group relative block aspect-square overflow-hidden rounded-3xl bg-background border transition-all hover:shadow-2xl hover:-translate-y-2"
                                >
                                    <Image src={cat.image} alt={cat.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-white font-black text-xl leading-tight uppercase italic">{cat.name}</h3>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Explore Collections</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Elite Accessories Section */}
            <section className="py-24 bg-muted/30 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-16 text-center md:text-left">
                        <div className="space-y-2 flex flex-col items-center md:items-start">
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic">Elite <span className="text-primary italic">Accessories</span></h2>
                            <p className="text-muted-foreground font-medium">Precision engineered for the modern ecosystem.</p>
                        </div>
                        <Link href="/products">
                            <Button variant="ghost" className="rounded-full group font-black uppercase text-[10px] tracking-widest hover:text-primary">
                                View Selection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="group relative h-[450px] rounded-[40px] overflow-hidden glass-card shadow-2xl"
                        >
                            <Image 
                                src="/images/products/magsafe_charger.png" 
                                alt="MagSafe Chargers" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                                <div className="space-y-3">
                                    <div className="bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-primary w-fit">New Category</div>
                                    <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Fast Chargers</h3>
                                    <p className="text-white/70 text-sm font-medium mb-6 max-w-xs">Universal MagSafe compatible charging solutions with premium aluminum finish.</p>
                                    <Link href="/products?category=Chargers">
                                        <Button className="rounded-full h-12 font-black uppercase text-[11px] tracking-widest px-10 shadow-2xl shadow-primary/30">Shop Chargers</Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="group relative h-[450px] rounded-[40px] overflow-hidden glass-card shadow-2xl"
                        >
                            <Image 
                                src="/images/products/airpods_leather_case.png" 
                                alt="Audio Accessories" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                                <div className="space-y-3">
                                    <div className="bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-400 w-fit">Tech Essentials</div>
                                    <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Audio Armor</h3>
                                    <p className="text-white/70 text-sm font-medium mb-6 max-w-xs">Handcrafted top-grain leather cases designed specifically for your AirPods.</p>
                                    <Link href="/products?category=Audio Accessories">
                                        <Button className="rounded-full h-12 font-black uppercase text-[11px] tracking-widest px-10 shadow-2xl shadow-indigo-500/30">Explore Audio</Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Best Sellers */}
            <section id="featured" className="py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-4 mb-16">
                        <div className="h-1 w-20 bg-primary rounded-full" />
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic">Trending <span className="text-primary">Now</span></h2>
                        <p className="max-w-[600px] text-muted-foreground font-medium">Out-of-stock items returning soon. Check out our latest best sellers.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="h-[450px] rounded-3xl bg-muted animate-pulse" />
                            ))
                        ) : (
                            featuredProducts.map((p, idx) => (
                                <motion.div 
                                    key={p._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group glass-card overflow-hidden rounded-3xl transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col"
                                >
                                    <div className="aspect-[4/5] relative bg-muted overflow-hidden">
                                        <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                                            {p.discount && (
                                                <div className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">
                                                    -{p.discount}%
                                                </div>
                                            )}
                                            <div className="bg-background/80 backdrop-blur-md text-foreground text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1">
                                                <Star className="h-2 w-2 fill-primary text-primary" /> {p.averageRating || '4.5'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-black text-xl mb-2 line-clamp-1 group-hover:text-primary transition-colors uppercase italic">{p.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-black">₹{p.basePrice}</span>
                                                {p.discount && <span className="text-xs text-muted-foreground line-through italic">₹{(p.basePrice * 1.2).toFixed(0)}</span>}
                                            </div>
                                            <Link href="/products">
                                                <Button size="sm" className="rounded-xl font-bold uppercase tracking-widest text-[10px] px-4">Buy</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Features Banner */}
            <section className="py-16 border-t border-b bg-primary/5">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-4 rounded-2xl">
                                <ShieldCheck className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase italic tracking-tight">Premium Quality</h4>
                                <p className="text-sm text-muted-foreground">Certified impact protection.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-4 rounded-2xl">
                                <ShoppingBag className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase italic tracking-tight">Fast Shipping</h4>
                                <p className="text-sm text-muted-foreground">2-day delivery in metro cities.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-4 rounded-2xl">
                                <Zap className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase italic tracking-tight">7-Day Returns</h4>
                                <p className="text-sm text-muted-foreground">Easy, no-questions-asked refunds.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PhoneModelSection />
        </div>
    );
}
