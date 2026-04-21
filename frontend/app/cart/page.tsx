'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, ArrowRight, Minus, Plus, Package, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, removeItem, updateQuantity } from '@/features/cart/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CartPage() {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    const handleUpdateQuantity = (id: string, newQty: number) => {
        if (newQty < 1) return;
        dispatch(updateQuantity({ id, quantity: newQty }));
    };

    const handleRemove = (id: string) => {
        dispatch(removeItem(id));
    };

    return (
        <div className="min-h-screen bg-muted/30 py-12 md:py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 text-center md:text-left">
                    <div className="space-y-2 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                            Your <span className="text-primary italic">Selection</span>
                        </h1>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in Bag
                        </p>
                    </div>
                    <Link href="/products">
                        <Button variant="outline" className="rounded-full border-2 font-black uppercase text-[10px] tracking-widest px-8 h-12 hover:bg-primary hover:text-white transition-all">
                            Continue Browsing
                        </Button>
                    </Link>
                </div>

                <AnimatePresence mode="wait">
                    {cartItems.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center py-32 glass-card rounded-[40px] text-center"
                        >
                            <div className="bg-muted p-10 rounded-full mb-8">
                                <ShoppingCart className="h-16 w-16 text-muted-foreground opacity-30" />
                            </div>
                            <h2 className="text-3xl font-black uppercase italic italic">Your bag is empty</h2>
                            <p className="text-muted-foreground mt-2 max-w-sm font-medium">Looks like you haven&apos;t added any premium covers yet.</p>
                            <Link href="/products" className="mt-8">
                                <Button className="rounded-full px-10 h-14 font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/30">
                                    Discover Products
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
                            {/* Items List */}
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {cartItems.map((item: any) => (
                                        <motion.div 
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="group glass-card rounded-[32px] p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center transition-all hover:shadow-2xl hover:-translate-y-1"
                                        >
                                            <div className="h-32 w-32 md:h-40 md:w-40 bg-muted rounded-[24px] overflow-hidden relative shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            
                                            <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-6">
                                                <div className="space-y-2 text-center md:text-left">
                                                    <h3 className="font-black text-xl md:text-2xl uppercase italic tracking-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">{item.phoneModel}</span>
                                                        <span className="text-[10px] font-black uppercase tracking-widest bg-muted text-muted-foreground px-3 py-1 rounded-full">{item.caseType}</span>
                                                        <span className="text-[10px] font-black uppercase tracking-widest bg-muted text-muted-foreground px-3 py-1 rounded-full">{item.color}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-center md:items-end justify-between gap-4">
                                                    <div className="text-2xl font-black italic">₹{item.price * item.quantity}</div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-3 bg-muted/50 rounded-full p-1 border-2 border-transparent focus-within:border-primary/20 transition-all">
                                                            <Button 
                                                                size="icon" 
                                                                variant="ghost" 
                                                                className="h-8 w-8 rounded-full hover:bg-primary hover:text-white"
                                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                                                            <Button 
                                                                size="icon" 
                                                                variant="ghost" 
                                                                className="h-8 w-8 rounded-full hover:bg-primary hover:text-white"
                                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-10 w-10 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                                            onClick={() => handleRemove(item.id)}
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-8">
                                <div className="glass-card rounded-[40px] p-8 md:p-10 sticky top-24 border-primary/10 shadow-2xl shadow-primary/5">
                                    <h2 className="text-2xl font-black uppercase italic mb-8">Summary</h2>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                            <span>Subtotal</span>
                                            <span className="text-foreground">₹{total}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                            <span>Shipping Fee</span>
                                            <span className="text-green-500 italic">FREE</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                            <span>Tax (GST)</span>
                                            <span className="text-foreground">Included</span>
                                        </div>
                                        <div className="h-px bg-dashed bg-muted-foreground/20 w-full my-6" />
                                        <div className="flex justify-between items-end mb-8">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Payable</span>
                                                <span className="text-4xl font-black italic tracking-tighter">₹{total}</span>
                                            </div>
                                        </div>
                                        
                                        <Link href="/checkout" className="block w-full">
                                            <Button className="w-full h-16 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] italic shadow-2xl shadow-primary/30 group">
                                                Finalize Order <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>

                                        <div className="pt-8 space-y-4">
                                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                                <ShieldCheck className="h-4 w-4 text-primary" /> 256-bit Secure Checkout
                                            </div>
                                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                                                <Truck className="h-4 w-4 text-primary" /> Fastest Insured Delivery
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
