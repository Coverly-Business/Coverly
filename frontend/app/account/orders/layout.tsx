"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { cn } from "@/lib/utils";
import { User, Package, MapPin, Lock } from "lucide-react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    const links = [
        { href: "/account/profile", label: "My Profile", icon: User },
        { href: "/account/orders", label: "My Orders", icon: Package },
        { href: "/account/addresses", label: "Saved Addresses", icon: MapPin },
        { href: "/account/password", label: "Change Password", icon: Lock },
    ];

    return (
        <div className="container mx-auto max-w-6xl py-12 px-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-8">
                My <span className="text-primary italic">Account</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Sidebar */}
                <aside className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        );
                    })}
                </aside>

                {/* Page Content */}
                <div>{children}</div>
            </div>
        </div>
    );
}