"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config/api";
import AdminNav from "@/components/AdminNav";

interface Variant {
    id: string;
    phoneModel: string;
    stock: number;
}

interface Product {
    _id: string;
    name: string;
    basePrice: number;
    images: string[];
    variants: Variant[];
}

export default function AdminProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            router.push("/admin/login");
            return;
        }

        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products`);
                const data = await res.json();
                setProducts(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [router]);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        const token = localStorage.getItem("admin_token");
        try {
            const res = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setProducts((prev) => prev.filter((p) => p._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="p-10">Loading...</div>;

    return (
        <>
            <AdminNav />
            <div className="container mx-auto max-w-6xl py-10 px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black uppercase italic">Admin — Products</h1>
                    <Link href="/admin/products/new">
                        <Button className="font-bold">+ Add New Product</Button>
                    </Link>
                </div>

                <div className="space-y-4">
                    {products.map((p) => (
                        <div
                            key={p._id}
                            className="flex items-center gap-4 border rounded-xl p-4 bg-background"
                        >
                            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                                {p.images[0] && (
                                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold">{p.name}</h3>
                                <p className="text-sm text-muted-foreground">₹{p.basePrice}</p>
                                <div className="flex gap-2 mt-1 flex-wrap">
                                    {p.variants.map((v) => (
                                        <span
                                            key={v.id}
                                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${v.stock > 0
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {v.phoneModel}: {v.stock} in stock
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link href={`/admin/products/${p._id}/edit`}>
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(p._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}