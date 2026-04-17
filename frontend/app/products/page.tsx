'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Search, Filter, Phone } from 'lucide-react';
import { PHONE_MODELS } from '@/lib/phone-models';

interface Product {
    _id: string;
    name: string;
    basePrice: number;
    images: string[];
    variants: {
        phoneBrand: string;
        phoneModel: string;
        caseType: string;
        color: string;
    }[];
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data.data);
            } catch (err: any) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesBrand = selectedBrand === 'All' || product.variants.some(v => v.phoneBrand === selectedBrand);
            const matchesSearch = searchQuery === '' ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.variants.some(v => v.phoneModel.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesBrand && matchesSearch;
        });
    }, [products, selectedBrand, searchQuery]);

    if (loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4">
                <p className="text-xl text-destructive font-semibold">Error: {error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    return (
        <div className="container py-8 md:py-12 px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                        All Covers
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Browse our premium collection for all major phone brands.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search models (e.g. iPhone 15)..."
                            className="h-10 w-full sm:w-[300px] rounded-md border border-input bg-background pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:w-64 flex-shrink-0 space-y-6">
                    <div>
                        <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                            <Filter className="h-4 w-4" /> Brands
                        </h3>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                            <button
                                onClick={() => setSelectedBrand('All')}
                                className={`px-3 py-1.5 rounded-md text-sm text-left transition-colors ${selectedBrand === 'All'
                                        ? 'bg-primary text-primary-foreground font-medium'
                                        : 'hover:bg-muted text-muted-foreground'
                                    }`}
                            >
                                All Brands
                            </button>
                            {PHONE_MODELS.map(brand => (
                                <button
                                    key={brand.brand}
                                    onClick={() => setSelectedBrand(brand.brand)}
                                    className={`px-3 py-1.5 rounded-md text-sm text-left transition-colors ${selectedBrand === brand.brand
                                            ? 'bg-primary text-primary-foreground font-medium'
                                            : 'hover:bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {brand.brand}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="flex-grow">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                                    <Link href={`/products/${product._id}`} className="block">
                                        <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                                            {product.images[0] ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                                                ₹ {product.basePrice}
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="flex flex-col flex-1 p-5">
                                        <div className="flex-1">
                                            <Link href={`/products/${product._id}`}>
                                                <h3 className="font-bold text-xl mb-2 hover:text-primary transition-colors">{product.name}</h3>
                                            </Link>

                                            <div className="mb-4">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                                                    <Phone className="h-3 w-3" /> Compatible with:
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin">
                                                    {Array.from(new Set(product.variants.map(v => v.phoneModel))).map((model) => (
                                                        <span key={model} className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10">
                                                            {model}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t flex items-center gap-3">
                                            <Link href={`/products/${product._id}`} className="flex-1">
                                                <Button className="w-full">Choose Model</Button>
                                            </Link>
                                            <Button variant="outline" size="icon" title="Add to Wishlist">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="bg-muted p-6 rounded-full mb-4">
                                <Search className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold">No covers found</h3>
                            <p className="text-muted-foreground mt-2 max-w-xs">
                                We couldn't find any products matching your current filters. Try changing your search or brand.
                            </p>
                            <Button
                                variant="link"
                                onClick={() => { setSearchQuery(''); setSelectedBrand('All'); }}
                                className="mt-4"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
