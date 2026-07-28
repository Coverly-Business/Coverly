"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config/api";
import { toast } from "sonner";

interface VariantInput {
    phoneBrand: string;
    phoneModel: string;
    caseType: string;
    color: string;
    stock: number;
    sku: string;
}

export default function NewProductPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [category, setCategory] = useState("Mobile Phone Covers");
    const [material, setMaterial] = useState("");
    const [discount, setDiscount] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [variants, setVariants] = useState<VariantInput[]>([
        { phoneBrand: "", phoneModel: "", caseType: "", color: "", stock: 0, sku: "" },
    ]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const addVariantRow = () => {
        setVariants([...variants, { phoneBrand: "", phoneModel: "", caseType: "", color: "", stock: 0, sku: "" }]);
    };

    const removeVariantRow = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index: number, field: keyof VariantInput, value: string | number) => {
        const updated = [...variants];
        (updated[index] as any)[field] = value;
        setVariants(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const token = localStorage.getItem("admin_token");
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

        try {
            // Step 1: Pehle product create karo (bina image ke)
            const res = await fetch(`${API_BASE_URL}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    slug,
                    description,
                    basePrice: Number(basePrice),
                    category,
                    material,
                    discount: discount ? Number(discount) : undefined,
                    images: [],
                    variants,
                }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error || "Failed to create product");
                setLoading(false);
                return;
            }

            const newProductId = data.data._id;

            // Step 2: Agar image select ki hai, usse upload karo
            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach((file) => formData.append("images", file));

                const uploadRes = await fetch(`${API_BASE_URL}/products/${newProductId}/photo`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                const uploadData = await uploadRes.json();
                if (!uploadData.success) {
                    setError("Product created, but image upload failed.");
                    setLoading(false);
                    return;
                }
            }

            router.push("/admin/products");
        } catch (err) {
            setError("Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-3xl py-10 px-4">
            <h1 className="text-3xl font-black uppercase italic mb-8">Add New Product</h1>

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

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-bold">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold">Material</label>
                        <input
                            type="text"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold">Product Images (up to 4)</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={(e) => {
                            const files = e.target.files ? Array.from(e.target.files) : [];
                            if (files.length > 4) {
                                toast.warning("Maximum 4 images allowed. Only the first 4 will be used.");
                                setImageFiles(files.slice(0, 4));
                            } else {
                                setImageFiles(files);
                            }
                        }}
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        First image will be the main display image. Max 4 images, JPEG/PNG/WebP, 5MB each.
                    </p>
                    {imageFiles.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">{imageFiles.length} image(s) selected</p>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold">Variants (Phone Models + Stock)</label>
                        <Button type="button" variant="outline" size="sm" onClick={addVariantRow}>
                            + Add Variant
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {variants.map((v, i) => (
                            <div key={i} className="grid grid-cols-6 gap-2 items-center border p-3 rounded-lg">
                                <input
                                    placeholder="Brand"
                                    value={v.phoneBrand}
                                    onChange={(e) => updateVariant(i, "phoneBrand", e.target.value)}
                                    className="col-span-1 px-2 py-1.5 border rounded text-sm"
                                    required
                                />
                                <input
                                    placeholder="Model"
                                    value={v.phoneModel}
                                    onChange={(e) => updateVariant(i, "phoneModel", e.target.value)}
                                    className="col-span-1 px-2 py-1.5 border rounded text-sm"
                                    required
                                />
                                <input
                                    placeholder="Case Type"
                                    value={v.caseType}
                                    onChange={(e) => updateVariant(i, "caseType", e.target.value)}
                                    className="col-span-1 px-2 py-1.5 border rounded text-sm"
                                    required
                                />
                                <input
                                    placeholder="Color"
                                    value={v.color}
                                    onChange={(e) => updateVariant(i, "color", e.target.value)}
                                    className="col-span-1 px-2 py-1.5 border rounded text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={v.stock}
                                    onChange={(e) => updateVariant(i, "stock", Number(e.target.value))}
                                    className="col-span-1 px-2 py-1.5 border rounded text-sm"
                                    required
                                />
                                <div className="col-span-1 flex gap-1">
                                    <input
                                        placeholder="SKU"
                                        value={v.sku}
                                        onChange={(e) => updateVariant(i, "sku", e.target.value)}
                                        className="flex-1 px-2 py-1.5 border rounded text-sm"
                                        required
                                    />
                                    {variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVariantRow(i)}
                                            className="text-red-500 text-xs font-bold px-1"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit" className="w-full h-12 font-bold" disabled={loading}>
                    {loading ? "Creating..." : "Create Product"}
                </Button>
            </form>
        </div>
    );
}