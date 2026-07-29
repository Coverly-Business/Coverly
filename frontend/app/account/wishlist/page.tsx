"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { API_BASE_URL } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { ShimmerBox } from "@/components/Shimmer";

interface Product {
    _id: string;
    name: string;
    basePrice: number;
    images: string[];
}

export default function MyWishlistPage() {
    const token = useSelector(selectCurrentToken);
    const { toggleWishlist } = useWishlist();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setProducts(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchWishlist();
    }, [token]);

    const handleRemove = async (productId: string, name: string) => {
        await toggleWishlist(productId, name);
        setProducts((prev) => prev.filter((p) => p._id !== productId));
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ShimmerBox className="h-64" />
                <ShimmerBox className="h-64" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-center">My Wishlist</h2>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-2xl text-center">
                    <Heart className="h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                    <p className="text-muted-foreground mb-6">Your wishlist is empty.</p>
                    <Link href="/products">
                        <Button className="font-bold">Browse Products</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="border rounded-2xl overflow-hidden group">
                            <div className="aspect-square relative bg-muted">
                                {product.images[0] && (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleRemove(product._id, product.name)}
                                    className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-md cursor-pointer"
                                >
                                    <Heart className="h-4 w-4 fill-current" />
                                </button>
                            </div>
                            <div className="p-4 space-y-2">
                                <h3 className="font-bold text-sm truncate">{product.name}</h3>
                                <p className="text-lg font-black">₹{product.basePrice}</p>
                                <Link href={`/products/${product._id}`}>
                                    <Button size="sm" className="w-full font-bold">
                                        <ShoppingBag className="h-4 w-4 mr-2" /> View Product
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}