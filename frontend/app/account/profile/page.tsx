"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, selectCurrentToken, setCredentials } from "@/features/auth/authSlice";
import { API_BASE_URL } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";

export default function MyProfilePage() {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (data.success) {
                    setName(data.data.name || "");
                    setPhone(data.data.phone || "");
                    setAvatar(data.data.avatar || "");
                    setEmail(data.data.email || "");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchProfile();
    }, [token]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            const res = await fetch(`${API_BASE_URL}/users/me`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, phone }),
            });

            const data = await res.json();

            if (!data.success) {
                setError("Failed to update profile.");
                setSaving(false);
                return;
            }

            // Redux state (Navbar mein naam) bhi update kar do
            dispatch(setCredentials({ user: data.data, token: token! }));
            setSuccess("Profile updated successfully!");
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setSaving(false);
        }
    };

    const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingPhoto(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const res = await fetch(`${API_BASE_URL}/users/me/avatar`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setAvatar(data.data);
                // Redux state bhi update karo taaki Navbar pe bhi naya photo dikhe (agar wahan use ho raha ho)
                dispatch(setCredentials({ user: { ...currentUser, avatar: data.data }, token: token! }));
            } else {
                setError("Failed to upload photo.");
            }
        } catch (err) {
            setError("Something went wrong uploading photo.");
        } finally {
            setUploadingPhoto(false);
        }
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <div className="space-y-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-center">My Profile</h2>

            {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
            {success && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{success}</p>}

            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-3">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-muted overflow-hidden border-2 border-primary/20 flex items-center justify-center">
                        {avatar ? (
                            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-black text-muted-foreground">
                                {name.charAt(0).toUpperCase() || "U"}
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingPhoto}
                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                    >
                        {uploadingPhoto ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Camera className="h-4 w-4" />
                        )}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handlePhotoSelect}
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold">Profile Photo</p>
                    <p className="text-xs text-muted-foreground">JPEG, PNG or WebP. Max 5MB.</p>
                </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                <div>
                    <label className="text-sm font-bold">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-bold">Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full mt-1 px-4 py-2 border rounded-lg bg-muted text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                </div>

                <div>
                    <label className="text-sm font-bold">Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                    />
                </div>

                <Button type="submit" className="font-bold" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
}