'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Check, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

interface Variant {
    phoneBrand: string;
    phoneModel: string;
    caseType: string;
    color: string;
    price?: number;
    stock: number;
    sku: string;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    basePrice: number;
    images: string[];
    variants: Variant[];
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/products/${id}`);
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                const data = await res.json();
                setProduct(data.data);
            } catch (err: any) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4">
                <p className="text-xl text-destructive font-semibold">Error: {error || 'Product not found'}</p>
                <Link href="/products">
                    <Button>Back to Products</Button>
                </Link>
            </div>
        );
    }

    const uniqueModels = Array.from(new Set(product.variants.map(v => v.phoneModel)));

    return (
        <div className="container py-8 px-4 md:px-6">
            <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Covers
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-2xl border bg-muted">
                        {product.images[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                        {product.name}
                    </h1>

                    <div className="mt-4 flex items-center gap-4">
                        <span className="text-3xl font-bold text-primary">₹ {product.basePrice}</span>
                        <span className="text-sm text-muted-foreground line-through">₹ 999</span>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">50% OFF</span>
                    </div>

                    <p className="mt-6 text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-8 space-y-6 pt-6 border-t font-premium">
                        <div>
                            <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 block">
                                Select Your Phone Model
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                {uniqueModels.map((model) => (
                                    <button
                                        key={model}
                                        onClick={() => setSelectedModel(model)}
                                        className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${selectedModel === model
                                                ? 'border-primary bg-primary/5 ring-1 ring-primary font-medium'
                                                : 'border-input hover:border-primary/50 bg-background'
                                            }`}
                                    >
                                        <span className="truncate">{model}</span>
                                        {selectedModel === model && <Check className="h-4 w-4 text-primary shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="flex-1 h-12 text-base font-bold" disabled={!selectedModel}>
                                Add to Cart
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1 h-12 text-base font-bold">
                                Buy Now
                            </Button>
                        </div>
                    </div>

                    {/* Features/Trust badges */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold">Premium Quality</p>
                                <p className="text-muted-foreground text-xs">High-grade silicone</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                                <Truck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold">Fast Shipping</p>
                                <p className="text-muted-foreground text-xs">Ships in 24 hours</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                            </div>
                            <div>
                                <p className="font-bold">Easy Returns</p>
                                <p className="text-muted-foreground text-xs">7-day replacement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
