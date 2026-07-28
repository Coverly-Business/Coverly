"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { selectCurrentUser, selectCurrentToken } from "@/features/auth/authSlice";
import { API_BASE_URL } from "@/config/api";
import { Package } from "lucide-react";

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    status: string;
    totalAmount: number;
    paymentMethod: string;
    createdAt: string;
    items: OrderItem[];
}

export default function MyOrdersPage() {
    const router = useRouter();
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !token) {
            router.push("/login");
            return;
        }

        const fetchMyOrders = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (data.success) {
                    setOrders(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, [user, token, router]);

    const statusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "PAID":
                return "bg-blue-100 text-blue-700";
            case "SHIPPED":
                return "bg-purple-100 text-purple-700";
            case "DELIVERED":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return <div className="container mx-auto max-w-4xl py-20 px-4">Loading your orders...</div>;
    }

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4">
            <h2 className="text-xl font-bold mb-6">Order History</h2>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-muted/30 rounded-3xl text-center">
                    <Package className="h-16 w-16 text-muted-foreground opacity-30 mb-6" />
                    <h2 className="text-xl font-bold">No orders yet</h2>
                    <p className="text-muted-foreground mt-2 mb-6">
                        You haven&apos;t placed any orders with this account.
                    </p>
                    <Link
                        href="/products"
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-sm"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded-2xl p-6 bg-background space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                                <span
                                    className={`text-[10px] font-bold px-3 py-1 rounded-full ${statusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="border-t pt-3 space-y-1">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span className="font-medium">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center border-t pt-3">
                                <span className="text-xs font-bold text-muted-foreground uppercase">
                                    {order.paymentMethod}
                                </span>
                                <span className="font-black text-lg">₹{order.totalAmount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}