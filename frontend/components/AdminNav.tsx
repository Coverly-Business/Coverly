"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

export default function AdminNav() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
    };

    const links = [
        { href: "/admin/products", label: "Products" },
        { href: "/admin/orders", label: "Orders" },
    ];

    return (
        <div className="border-b bg-background">
            <div className="container mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
                <div className="flex items-center gap-6">
                    <span className="font-black uppercase italic text-sm">
                        Coverly Admin
                    </span>
                    <nav className="flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 text-xs font-bold uppercase rounded-lg transition-colors",
                                    pathname === link.href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground hover:text-red-500 transition-colors"
                >
                    <LogOut className="h-4 w-4" /> Logout
                </button>
            </div>
        </div>
    );
}