'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Script from 'next/script';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Checkout() {
    const [loading, setLoading] = useState(false);

    const displayRazorpay = async () => {
        setLoading(true);
        // Call backend to create order - STUBBED
        // const res = await fetch('http://localhost:5000/api/v1/orders/checkout', { method: 'POST' });
        // const data = await res.json();
        const data = { currency: 'INR', amount: 49900, id: 'order_test_123' }; // Stub

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_1234567890',
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id, // Only required if integrating backend order creation
            name: 'Coverly',
            description: 'Premium Mobile Cover Transaction',
            handler: function (response: any) {
                alert('Payment Success: ' + response.razorpay_payment_id);
                // Verify payment on backend
            },
            prefill: {
                name: 'User Name',
                email: 'user@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#000000'
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setLoading(false);
    };

    return (
        <div className="container flex flex-col items-center justify-center min-h-[60vh] py-10 gap-6">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <h1 className="text-3xl font-bold">Checkout</h1>
            <div className="p-6 border rounded-lg shadow-sm w-full max-w-md bg-white">
                <div className="flex justify-between mb-4">
                    <span>Subtotal</span>
                    <span>₹ 499.00</span>
                </div>
                <div className="flex justify-between font-bold mb-6">
                    <span>Total</span>
                    <span>₹ 499.00</span>
                </div>
                <Button className="w-full" size="lg" onClick={displayRazorpay} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay with Razorpay'}
                </Button>
            </div>
        </div>
    );
}
