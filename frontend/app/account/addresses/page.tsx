"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { API_BASE_URL } from "@/config/api";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2, Plus } from "lucide-react";
import { ShimmerBox, ShimmerText } from "@/components/Shimmer";

interface Address {
    id: string;
    label: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    isDefault: boolean;
}

export default function SavedAddressesPage() {
    const token = useSelector(selectCurrentToken);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        label: "Home",
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        isDefault: false,
    });

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setAddresses(data.data.addresses || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProfile();
    }, [token]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            const res = await fetch(`${API_BASE_URL}/users/me/addresses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.success) {
                setError("Failed to add address.");
                setSaving(false);
                return;
            }

            setFormData({
                label: "Home",
                name: "",
                phone: "",
                address: "",
                city: "",
                pincode: "",
                isDefault: false,
            });
            setShowForm(false);
            fetchProfile();
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (addressId: string) => {
        const confirmed = window.confirm("Delete this address?");
        if (!confirmed) return;

        try {
            const res = await fetch(`${API_BASE_URL}/users/me/addresses/${addressId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setAddresses((prev) => prev.filter((a) => a.id !== addressId));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                    <ShimmerText className="w-40 h-6" />
                    <ShimmerBox className="w-24 h-9" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ShimmerBox className="h-32" />
                    <ShimmerBox className="h-32" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-center flex-1">Saved Addresses</h2>
                <Button
                    size="sm"
                    className="font-bold"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Plus className="h-4 w-4 mr-1" /> Add New
                </Button>
            </div>

            {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}

            {showForm && (
                <form
                    onSubmit={handleAddAddress}
                    className="border rounded-2xl p-6 space-y-4 bg-muted/30"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-bold">Label</label>
                            <select
                                name="label"
                                value={formData.label}
                                onChange={handleInputChange as any}
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                            >
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-bold">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange as any}
                            rows={2}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-bold">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleInputChange}
                        />
                        Set as default address
                    </label>

                    <Button type="submit" className="font-bold" disabled={saving}>
                        {saving ? "Saving..." : "Save Address"}
                    </Button>
                </form>
            )}

            {addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-2xl text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                    <p className="text-muted-foreground">No saved addresses yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                        <div key={addr.id} className="border rounded-2xl p-5 relative">
                            {addr.isDefault && (
                                <span className="absolute top-4 right-4 text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    DEFAULT
                                </span>
                            )}
                            <p className="text-xs font-bold text-primary uppercase mb-2">{addr.label}</p>
                            <p className="font-bold text-sm">{addr.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                {addr.address}, {addr.city} — {addr.pincode}
                            </p>
                            <p className="text-sm text-muted-foreground">{addr.phone}</p>
                            <button
                                onClick={() => handleDelete(addr.id)}
                                className="mt-3 flex items-center gap-1 text-xs text-red-500 hover:underline"
                            >
                                <Trash2 className="h-3 w-3" /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}