'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
            <div className="max-w-xl w-full text-center space-y-10">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex justify-center"
                >
                    <div className="h-32 w-32 rounded-full bg-green-500/10 flex items-center justify-center relative">
                        <CheckCircle2 className="h-20 w-20 text-green-500" />
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 rounded-full bg-green-500/20"
                        />
                    </div>
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Order <span className="text-primary italic">Confirmed</span></h1>
                    <p className="text-muted-foreground font-medium">Thank you for choosing Coverly. Your luxury tech armor is being prepared.</p>
                </div>

                <div className="glass-card rounded-[32px] p-8 space-y-6 shadow-2xl">
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Order Reference</div>
                        <div className="text-xl font-mono font-black select-all bg-muted/50 px-4 py-2 rounded-xl border border-dashed text-primary">
                            #{orderId?.slice(-12).toUpperCase()}
                        </div>
                    </div>
                    
                    <div className="h-px bg-muted-foreground/10 w-full" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-left">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-[9px] font-black uppercase text-muted-foreground">Confirmation</div>
                                <div className="text-[10px] font-black uppercase">Sent to your email</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-left">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Package className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-[9px] font-black uppercase text-muted-foreground">Est. Delivery</div>
                                <div className="text-[10px] font-black uppercase">3-5 Business Days</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Link href="/products" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full h-14 rounded-full px-10 border-2 font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all">
                            Keep Shopping
                        </Button>
                    </Link>
                    <Link href={`/track-order?id=${orderId}`} className="w-full sm:w-auto">
                        <Button className="w-full h-14 rounded-full px-10 font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-primary/30 group">
                            Track Order <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
