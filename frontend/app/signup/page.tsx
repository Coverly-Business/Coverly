"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/PasswordInput";

export default function SignupPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await register({ name, email, password }).unwrap();

            // Signup successful — ab login page pe bhejo, auto-login nahi karna
            router.push("/login?signup=success");
        } catch (err: any) {
            setError(err?.data?.error || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 py-20">
            <form
                onSubmit={handleSubmit}
                className="bg-background p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-black uppercase italic text-center mb-6">
                    Create Account
                </h1>

                {error && (
                    <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
                )}

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
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-bold">Password</label>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
                </div>

                <Button type="submit" className="w-full h-12 font-bold" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}