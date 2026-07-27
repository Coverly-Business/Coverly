"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useLoginMutation, useGoogleLoginMutation } from "@/features/api/apiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const [login, { isLoading }] = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const signupSuccess = searchParams.get("signup") === "success";
    const [googleLogin] = useGoogleLoginMutation();
    const googleButtonRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login({ email, password }).unwrap();

            dispatch(
                setCredentials({
                    user: result.data,
                    token: result.token,
                })
            );

            router.push("/products");
        } catch (err: any) {
            setError(err?.data?.error || "Invalid email or password.");
        }
    };

    const handleGoogleResponse = async (response: any) => {
        try {
            const result = await googleLogin(response.credential).unwrap();
            dispatch(
                setCredentials({
                    user: result.data,
                    token: result.token,
                })
            );
            router.push("/products");
        } catch (err: any) {
            setError("Google login failed. Please try again.");
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).google && googleButtonRef.current) {
            (window as any).google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleGoogleResponse,
            });
            (window as any).google.accounts.id.renderButton(googleButtonRef.current, {
                theme: "outline",
                size: "large",
                width: 320,
            });
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 py-20">
            <form
                onSubmit={handleSubmit}
                className="bg-background p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-black uppercase italic text-center mb-6">
                    Login
                </h1>

                {signupSuccess && (
                    <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
                        Account created successfully! Please login.
                    </p>
                )}

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

                <Button type="submit" className="w-full h-12 font-bold" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-muted" />
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="flex-1 h-px bg-muted" />
                </div>

                <div ref={googleButtonRef} className="flex justify-center" />

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-primary font-bold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}