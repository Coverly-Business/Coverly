"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/config/api";
import AdminNav from "@/components/AdminNav";

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    guestEmail: string;
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    status: string;
    items: OrderItem[];
    createdAt: string;
}

export default function AdminOrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            router.push("/admin/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (!data.success) {
                    setError("Failed to load orders.");
                    setLoading(false);
                    return;
                }

                setOrders(data.data);
            } catch (err) {
                setError("Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [router]);

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;

        let address;
        try {
            address = JSON.parse(order.shippingAddress);
        } catch {
            address = null;
        }

        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            searchQuery === "" ||
            order.id.toLowerCase().includes(searchLower) ||
            order.guestEmail?.toLowerCase().includes(searchLower) ||
            address?.name?.toLowerCase().includes(searchLower) ||
            address?.phone?.includes(searchQuery);

        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setUpdatingId(orderId);
        const token = localStorage.getItem("admin_token");

        try {
            const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (data.success) {
                setOrders((prev) =>
                    prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    };

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

    if (loading) return <div className="p-10">Loading orders...</div>;
    if (error) return <div className="p-10 text-red-500">{error}</div>;

    return (
        <>
            <AdminNav />
            <div className="container mx-auto max-w-6xl py-10 px-4">
                <h1 className="text-3xl font-black uppercase italic mb-8">
                    Admin — Orders ({orders.length})
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or Order ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-3 border rounded-lg text-sm"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border rounded-lg text-sm font-bold"
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                    </select>
                </div>

                {filteredOrders.length === 0 ? (
                    <p className="text-muted-foreground">No orders match your search.</p>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => {
                            let address;
                            try {
                                address = JSON.parse(order.shippingAddress);
                            } catch {
                                address = null;
                            }

                            return (
                                <div
                                    key={order.id}
                                    className="border rounded-xl p-5 bg-background space-y-3"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <p className="text-xs text-muted-foreground font-mono">
                                                {order.id}
                                            </p>
                                            <p className="text-sm font-bold">
                                                {address?.name || "Guest"} — {order.guestEmail}
                                            </p>
                                        </div>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            disabled={updatingId === order.id}
                                            className={`text-[10px] font-bold px-3 py-1.5 rounded-full border-0 cursor-pointer ${statusColor(
                                                order.status
                                            )}`}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="PAID">PAID</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                        </select>
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        {address
                                            ? `${address.address}, ${address.city} — ${address.pincode} | ${address.phone}`
                                            : "No address"}
                                    </div>

                                    <div className="border-t pt-3 space-y-1">
                                        {order.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between text-sm"
                                            >
                                                <span>
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span className="font-medium">
                                                    ₹{item.price * item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center border-t pt-3">
                                        <span className="text-xs font-bold text-muted-foreground uppercase">
                                            {order.paymentMethod} •{" "}
                                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                        <span className="font-black text-lg">
                                            ₹{order.totalAmount}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}