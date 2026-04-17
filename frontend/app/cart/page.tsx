'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
    // Static placeholder for cart items
    const cartItems = [
        {
            id: 1,
            name: 'Midnight Glass Case',
            model: 'iPhone 15 Pro',
            price: 999,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1603313011101-31c73ad7d8e2?q=80&w=200&auto=format&fit=crop',
        },
    ];

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <ShoppingCart className="h-8 w-8" /> Your Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-lg">
                    <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
                    <Link href="/products">
                        <Button>Start Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-background border rounded-lg shadow-sm items-center">
                                <div className="h-24 w-24 bg-muted rounded overflow-hidden">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-muted-foreground text-sm">{item.model}</p>
                                    <p className="font-medium mt-1">₹{item.price}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center border rounded">
                                        <button className="px-2 py-1 hover:bg-muted">-</button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button className="px-2 py-1 hover:bg-muted">+</button>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-muted/30 p-6 rounded-lg h-fit space-y-6 border">
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-green-600 font-medium">FREE</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>
                        <Link href="/checkout">
                            <Button className="w-full py-6 text-lg font-bold group">
                                Checkout <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
