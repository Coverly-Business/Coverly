'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Package, Truck, CheckCircle2 } from 'lucide-react';

export default function TrackOrderPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
                <p className="text-muted-foreground">Enter your order ID or tracking number to see the status of your shipment.</p>
            </div>

            <div className="bg-background border rounded-xl shadow-lg p-6 md:p-8 space-y-6">
                <div className="flex gap-2">
                    <input
                        placeholder="Order ID (e.g. CV-12345)"
                        className="flex h-12 w-full rounded-md border border-input bg-transparent px-4 py-2 text-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                    <Button size="icon" className="h-12 w-12 shrink-0">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>

                {/* Dummy Tracking Steps - Only shown when searched */}
                <div className="pt-6 border-t space-y-8">
                    <div className="relative flex justify-between">
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-muted z-0"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Package className="h-5 w-5" />
                            </div>
                            <span className="mt-2 text-xs font-medium">Order Placed</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Truck className="h-5 w-5" />
                            </div>
                            <span className="mt-2 text-xs font-medium">Shipped</span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center border-2">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <span className="mt-2 text-xs font-medium">Delivered</span>
                        </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <p className="font-semibold text-lg text-primary">In Transit</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Expected Delivery</p>
                                <p className="font-semibold text-lg">Tomorrow, 4:00 PM</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-1 bg-primary rounded-full"></div>
                                <div>
                                    <p className="font-medium">Left Sorting Facility</p>
                                    <p className="text-xs text-muted-foreground">Today, 10:30 AM • Mumbai Hub</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1 bg-muted-foreground rounded-full"></div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Order Picked Up</p>
                                    <p className="text-xs text-muted-foreground">Yesterday, 02:15 PM • Bengaluru</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
