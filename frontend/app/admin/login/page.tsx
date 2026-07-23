"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config/api";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error || "Login failed");
                setLoading(false);
                return;
            }

            if (data.data.role !== "admin") {
                setError("You are not authorized as admin.");
                setLoading(false);
                return;
            }

            // Token ko browser mein save karo
            localStorage.setItem("admin_token", data.token);
            router.push("/admin/products");
        } catch (err) {
            setError("Something went wrong. Try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
            <form
                onSubmit={handleLogin}
                className="bg-background p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-black uppercase italic text-center mb-6">
                    Admin Login
                </h1>

                {error && (
                    <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
                )}

                <div>
                    <label className="text-sm font-bold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-bold">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <Button type="submit" className="w-full h-12 font-bold" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
}