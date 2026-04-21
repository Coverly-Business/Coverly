'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Check, ShieldCheck, Truck, ShoppingCart, ArrowRight, Star, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { addItem, CartItem } from '@/features/cart/cartSlice';
import { useRouter } from 'next/navigation';

interface Variant {
    phoneBrand: string;
    phoneModel: string;
    caseType: string;
    color: string;
    price?: number;
    stock: number;
    sku: string;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    basePrice: number;
    images: string[];
    variants: Variant[];
    category: string;
    material?: string;
    averageRating?: number;
    discount?: number;
}

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedModel, setSelectedModel] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!product) return null;

    const selectedVariant = product.variants.find(v => v.phoneModel === selectedModel) || product.variants[0];
    const selectedColor = selectedVariant?.color || '';
    const selectedCaseType = selectedVariant?.caseType || '';

    const handleAddToCart = () => {
        if (!product) return;
        
        const cartItem: CartItem = {
            id: `${selectedVariant.sku || product._id}-${selectedModel}-${selectedColor}-${selectedCaseType}`,
            productId: product._id,
            sku: selectedVariant.sku,
            name: product.name,
            image: product.images[0],
            price: product.basePrice,
            quantity: 1,
            phoneModel: selectedModel || product.variants[0].phoneModel,
            phoneBrand: selectedVariant?.phoneBrand || '',
            caseType: selectedCaseType,
            color: selectedColor,
        };

        setAdding(true);
        setTimeout(() => {
            dispatch(addItem(cartItem));
            setAdding(false);
        }, 500);
    };

    const handleBuyNow = () => {
        if (!product) return;
        
        const cartItem: CartItem = {
            id: `${selectedVariant.sku || product._id}-${selectedModel}-${selectedColor}-${selectedCaseType}`,
            productId: product._id,
            sku: selectedVariant.sku,
            name: product.name,
            image: product.images[0],
            price: product.basePrice,
            quantity: 1,
            phoneModel: selectedModel || product.variants[0].phoneModel,
            phoneBrand: selectedVariant?.phoneBrand || '',
            caseType: selectedCaseType,
            color: selectedColor,
        };

        dispatch(addItem(cartItem));
        router.push('/checkout');
        onClose();
    };

    const uniqueModels = Array.from(new Set(product.variants.map(v => v.phoneModel)));

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-[40px] shadow-2xl scrollbar-hide"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 p-3 rounded-full glass hover:bg-primary hover:text-white transition-all shadow-xl group"
                        >
                            <X className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 p-6 md:p-12">
                            {/* Left: Premium Image Gallery */}
                            <div className="space-y-6">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-muted shadow-inner">
                                    {product.images[0] ? (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground italic font-medium">
                                            Awaiting Visuals...
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <div className="glass px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                            {product.material || 'Authentic'}
                                        </div>
                                    </div>
                                    <button className="absolute bottom-6 right-6 p-4 rounded-full glass text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl">
                                        <Heart className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square rounded-2xl bg-muted border-2 border-transparent hover:border-primary transition-all cursor-pointer overflow-hidden">
                                            <Image src={product.images[0]} alt="thumb" width={100} height={100} className="object-cover opacity-50 hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Detailed Info */}
                            <div className="flex flex-col pt-8 md:pt-0">
                                <div className="space-y-2 mb-8">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                                        <Star className="h-3 w-3 fill-current" /> {product.averageRating || '4.8'} / 5.0 (200+ Reviews)
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">{product.name}</h2>
                                    <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-sm">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mb-10">
                                    <span className="text-4xl font-black italic tracking-tighter">₹{product.basePrice}</span>
                                    {product.discount && (
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground line-through italic">₹{(product.basePrice * 1.3).toFixed(0)}</span>
                                            <span className="text-[10px] font-black text-green-500 uppercase">Save {product.discount}% Today</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 block underline decoration-primary/30 underline-offset-4">
                                            {product.category === 'Phone Covers' ? 'Select Device Model' : 'Select Version'}
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide">
                                            {uniqueModels.map((model) => (
                                                <button
                                                    key={model}
                                                    onClick={() => setSelectedModel(model)}
                                                    className={cn(
                                                        "flex items-center justify-center px-4 py-3 text-[10px] font-bold uppercase rounded-2xl border-2 transition-all",
                                                        selectedModel === model
                                                            ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10'
                                                            : 'border-muted hover:border-primary/40 hover:bg-muted/50'
                                                    )}
                                                >
                                                    {model}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button 
                                            size="lg" 
                                            className="flex-1 h-16 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2" 
                                            disabled={!selectedModel || adding}
                                            onClick={handleAddToCart}
                                        >
                                            {adding ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                                    <Star className="h-4 w-4 fill-white" />
                                                </motion.div>
                                            ) : (
                                                <ShoppingCart className="h-4 w-4" />
                                            )}
                                            {adding ? "Adding..." : "Add to Cart"}
                                        </Button>
                                        <Button 
                                            size="lg" 
                                            variant="secondary" 
                                            className="flex-1 h-16 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all hover:bg-muted active:scale-95"
                                            onClick={handleBuyNow}
                                        >
                                            Fast Checkout
                                        </Button>
                                    </div>
                                </div>

                                {/* Trust Section */}
                                <div className="mt-auto pt-10 grid grid-cols-3 gap-6 border-t border-dashed mt-12">
                                    <div className="flex flex-col items-center gap-3 group">
                                        <div className="bg-primary/5 p-3 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                            <ShieldCheck className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-center">Certified Durability</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 group">
                                        <div className="bg-primary/5 p-3 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                            <Truck className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-center">Priority Shipping</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 group">
                                        <div className="bg-primary/5 p-3 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                            <Zap className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-center">Seamless Return</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
