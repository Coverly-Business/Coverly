'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Package, Truck, CheckCircle2, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

interface OrderItem {
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

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const cleanId = orderId.trim().replace('#', '').toLowerCase();
            const res = await fetch(`${API_BASE_URL}/orders/${cleanId}`);
            const data = await res.json();

            if (!data.success) {
                setError('Order not found. Please check your Order ID.');
                setLoading(false);
                return;
            }

            setOrder(data.data);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Order status ko steps mein map karna
    const getStepStatus = (step: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED') => {
        if (!order) return false;
        const statusOrder = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'];
        const currentIndex = statusOrder.indexOf(order.status);
        const stepIndex = statusOrder.indexOf(step);
        return currentIndex >= stepIndex;
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
                <p className="text-muted-foreground">Enter your order ID to see the status of your shipment.</p>
            </div>

            <div className="bg-background border rounded-xl shadow-lg p-6 md:p-8 space-y-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Paste your Order ID here"
                        className="flex h-12 w-full rounded-md border border-input bg-transparent px-4 py-2 text-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                    <Button type="submit" size="icon" className="h-12 w-12 shrink-0" disabled={loading}>
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                    </Button>
                </form>

                {error && (
                    <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
                )}

                {order && (
                    <div className="pt-6 border-t space-y-8">
                        <div className="relative flex justify-between">
                            <div className="absolute top-5 left-0 w-full h-0.5 bg-muted z-0"></div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getStepStatus('PENDING') ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border-2'}`}>
                                    <Package className="h-5 w-5" />
                                </div>
                                <span className="mt-2 text-xs font-medium">Order Placed</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getStepStatus('SHIPPED') ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border-2'}`}>
                                    <Truck className="h-5 w-5" />
                                </div>
                                <span className="mt-2 text-xs font-medium">Shipped</span>
                            </div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getStepStatus('DELIVERED') ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border-2'}`}>
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <span className="mt-2 text-xs font-medium">Delivered</span>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <p className="font-semibold text-lg text-primary">{order.status}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Payment Method</p>
                                    <p className="font-semibold text-lg">{order.paymentMethod}</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span className="font-medium">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-3 mt-3 border-t font-bold">
                                <span>Total</span>
                                <span>₹{order.totalAmount}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
