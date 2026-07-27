"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config/api";

interface Variant {
    id: string;
    phoneBrand: string;
    phoneModel: string;
    caseType: string;
    color: string;
    stock: number;
    sku: string;
}

interface ExistingImage {
    id: string;
    url: string;
}

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [variants, setVariants] = useState<Variant[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
    const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products/${id}`);
                const data = await res.json();
                if (data.success) {
                    setName(data.data.name);
                    setDescription(data.data.description);
                    setBasePrice(String(data.data.basePrice));
                    setDiscount(data.data.discount ? String(data.data.discount) : "");
                    setVariants(data.data.variants);
                    setExistingImages(data.data.imageObjects || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const updateVariantStock = (index: number, stock: number) => {
        const updated = [...variants];
        updated[index].stock = stock;
        setVariants(updated);
    };

    const handleDeleteImage = async (imageId: string) => {
        const confirmed = window.confirm("Delete this image?");
        if (!confirmed) return;

        setDeletingImageId(imageId);
        const token = localStorage.getItem("admin_token");

        try {
            const res = await fetch(`${API_BASE_URL}/products/${id}/photo/${imageId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingImageId(null);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const availableSlots = 4 - existingImages.length;

        if (files.length > availableSlots) {
            alert(`You can only add ${availableSlots} more image(s).`);
            setImageFiles(files.slice(0, availableSlots));
        } else {
            setImageFiles(files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        const token = localStorage.getItem("admin_token");

        try {
            const res = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    basePrice: Number(basePrice),
                    discount: discount ? Number(discount) : undefined,
                    variants: variants.map((v) => ({
                        id: v.id,
                        stock: v.stock,
                        price: null,
                        color: v.color,
                    })),
                }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error || "Failed to update product");
                setSaving(false);
                return;
            }

            // Agar nayi images select ki hain, unhe upload karo
            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach((file) => formData.append("images", file));

                const uploadRes = await fetch(`${API_BASE_URL}/products/${id}/photo`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                const uploadData = await uploadRes.json();
                if (!uploadData.success) {
                    setError("Product updated, but image upload failed.");
                    setSaving(false);
                    return;
                }
            }

            router.push("/admin/products");
        } catch (err) {
            setError("Something went wrong.");
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10">Loading...</div>;

    return (
        <div className="container mx-auto max-w-3xl py-10 px-4">
            <h1 className="text-3xl font-black uppercase italic mb-8">Edit Product</h1>

            {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-sm font-bold">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-bold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                        rows={3}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-bold">Base Price (₹)</label>
                        <input
                            type="number"
                            value={basePrice}
                            onChange={(e) => setBasePrice(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold">Discount (%)</label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold">Product Images</label>

                    {existingImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-3 mt-2 mb-3">
                            {existingImages.map((img) => (
                                <div
                                    key={img.id}
                                    className="relative aspect-square rounded-lg overflow-hidden border group"
                                >
                                    <img
                                        src={img.url}
                                        alt="product"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        disabled={deletingImageId === img.id}
                                        onClick={() => handleDeleteImage(img.id)}
                                        className="absolute top-1 right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {existingImages.length < 4 && (
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            onChange={handleImageSelect}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                        />
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                        {existingImages.length}/4 images used.
                    </p>
                </div>

                <div>
                    <label className="text-sm font-bold mb-3 block">Stock / Quantity per Model</label>
                    <div className="space-y-2">
                        {variants.map((v, i) => (
                            <div key={v.id} className="flex items-center gap-4 border p-3 rounded-lg">
                                <span className="flex-1 text-sm font-medium">
                                    {v.phoneBrand} — {v.phoneModel} ({v.color})
                                </span>
                                <input
                                    type="number"
                                    value={v.stock}
                                    onChange={(e) => updateVariantStock(i, Number(e.target.value))}
                                    className="w-24 px-3 py-1.5 border rounded text-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit" className="w-full h-12 font-bold" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
}
