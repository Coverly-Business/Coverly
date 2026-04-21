'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '@/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/config/api';
import { 
    ChevronLeft, 
    CreditCard, 
    Truck, 
    ShieldCheck, 
    ArrowRight, 
    ShoppingBag, 
    Lock,
    MapPin,
    Phone,
    Mail,
    User
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'UPI'>('CARD');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
    });

    if (cartItems.length === 0) {
        if (typeof window !== 'undefined') {
            router.push('/products');
        }
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems,
                    totalAmount: total,
                    shippingAddress: formData,
                    paymentMethod,
                    guestEmail: formData.email
                }),
            });

            const data = await res.json();

            if (data.success) {
                dispatch(clearCart());
                router.push(`/order-success?id=${data.data.id}`);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 pb-20">
            {/* Header */}
            <div className="bg-background border-b py-6 sticky top-0 z-[50] backdrop-blur-xl bg-background/80">
                <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
                    <Link href="/cart" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Bag
                    </Link>
                    <div className="font-black text-xl tracking-tighter italic uppercase">
                        Secure <span className="text-primary italic">Checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500">
                        <Lock className="h-3 w-3" /> Encrypted
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-12">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                    {/* Left Column: Details */}
                    <div className="space-y-10">
                        {/* Section 1: contact */}
                        <section className="glass-card rounded-[40px] p-8 md:p-10 space-y-8 shadow-2xl shadow-primary/5">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <User className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Personal Details</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name</label>
                                    <input 
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Aniket Gupta"
                                        className="w-full h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/30 outline-none px-6 text-sm font-bold transition-all ring-primary/5 focus:ring-4"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
                                    <input 
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="hello@example.com"
                                        className="w-full h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/30 outline-none px-6 text-sm font-bold transition-all ring-primary/5 focus:ring-4"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Shipping */}
                        <section className="glass-card rounded-[40px] p-8 md:p-10 space-y-8 shadow-2xl shadow-primary/5">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Shipping Information</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Street Address</label>
                                    <textarea 
                                        required
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="House No, Street, Landmark..."
                                        className="w-full rounded-2xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/30 outline-none p-6 text-sm font-bold transition-all ring-primary/5 focus:ring-4 resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">City</label>
                                        <input 
                                            required
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Mumbai"
                                            className="w-full h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/30 outline-none px-6 text-sm font-bold transition-all ring-primary/5 focus:ring-4"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Pincode</label>
                                        <input 
                                            required
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            placeholder="400001"
                                            className="w-full h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/30 outline-none px-6 text-sm font-bold transition-all ring-primary/5 focus:ring-4"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Phone Number</label>
                                    <input 
                                        required
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/30 outline-none px-6 text-sm font-bold transition-all ring-primary/5 focus:ring-4"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Payment */}
                        <section className="glass-card rounded-[40px] p-8 md:p-10 space-y-8 shadow-2xl shadow-primary/5">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Payment Method</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('CARD')}
                                    className={cn(
                                        "p-6 rounded-3xl border-2 transition-all text-center space-y-3",
                                        paymentMethod === 'CARD' ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-muted hover:border-primary/20"
                                    )}
                                >
                                    <CreditCard className={cn("mx-auto h-6 w-6", paymentMethod === 'CARD' ? "text-primary" : "text-muted-foreground")} />
                                    <div className="text-[10px] font-black uppercase tracking-widest">Card</div>
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('UPI')}
                                    className={cn(
                                        "p-6 rounded-3xl border-2 transition-all text-center space-y-3",
                                        paymentMethod === 'UPI' ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-muted hover:border-primary/20"
                                    )}
                                >
                                    <ArrowRight className={cn("mx-auto h-6 w-6", paymentMethod === 'UPI' ? "text-primary" : "text-muted-foreground")} />
                                    <div className="text-[10px] font-black uppercase tracking-widest">UPI</div>
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('COD')}
                                    className={cn(
                                        "p-6 rounded-3xl border-2 transition-all text-center space-y-3",
                                        paymentMethod === 'COD' ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-muted hover:border-primary/20"
                                    )}
                                >
                                    <Truck className={cn("mx-auto h-6 w-6", paymentMethod === 'COD' ? "text-primary" : "text-muted-foreground")} />
                                    <div className="text-[10px] font-black uppercase tracking-widest">COD</div>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:sticky lg:top-[120px] h-fit">
                        <div className="glass-card rounded-[40px] p-8 space-y-8 shadow-2xl">
                            <h2 className="text-2xl font-black uppercase italic">Order Summary</h2>
                            
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item: any) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="h-16 w-16 bg-muted rounded-2xl overflow-hidden relative shrink-0 shadow-inner">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-black uppercase italic truncate">{item.name}</div>
                                            <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                                                Qty: {item.quantity} • {item.phoneModel || 'Universal'}
                                            </div>
                                        </div>
                                        <div className="text-sm font-black italic">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-muted-foreground/10 w-full" />

                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-green-500 italic">FREE</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Payable</span>
                                        <span className="text-4xl font-black italic tracking-tighter">₹{total}</span>
                                    </div>
                                </div>
                            </div>

                            <Button 
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] italic shadow-2xl shadow-primary/30 group"
                            >
                                {loading ? "Processing..." : (
                                    <span className="flex items-center gap-2">
                                        Complete Purchase <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                )}
                            </Button>

                            <div className="pt-4 flex flex-col items-center gap-4">
                                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 text-primary" /> Verified Secure Gateway
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
