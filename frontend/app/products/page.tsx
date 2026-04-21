'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, ArrowLeft, ArrowRight, Zap, ShoppingBag, Loader2, Filter, Phone, ChevronDown, Star, Package, Check, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';
import { PHONE_MODELS } from '@/lib/phone-models';
import ProductDetailModal from '@/components/ProductDetailModal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Product {
    _id: string;
    name: string;
    description: string;
    basePrice: number;
    material?: string;
    averageRating?: number;
    discount?: number;
    images: string[];
    variants: {
        phoneBrand: string;
        phoneModel: string;
        caseType: string;
        color: string;
        price?: number;
        stock: number;
        sku: string;
    }[];
}

const PRICE_RANGES = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: 'Over ₹1000', min: 1000, max: 10000 },
];

const RATINGS = [4, 3, 2];
const MATERIALS = ['Tempered Glass', 'Liquid Silicone', 'Carbon Fiber + TPU', 'Polycarbonate', 'Hard Plastic + TPU'];

function ProductsContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';
    const initialBrand = searchParams.get('brand') || '';
    const initialCategory = searchParams.get('category') || '';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    
    // Advanced Filters State
    const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<{min: number, max: number}[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number | null>(null);
    
    // UI State
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/products`);
                if (!res.ok) throw new Error('Failed to fetch products');
                const data = await res.json();
                setProducts(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product: any) => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesBrand = selectedBrands.length === 0 || product.variants.some((v: any) => selectedBrands.includes(v.phoneBrand));
            const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => 
                product.basePrice >= range.min && product.basePrice <= range.max
            );
            const matchesMaterial = selectedMaterials.length === 0 || (product.material && selectedMaterials.includes(product.material));
            const matchesRating = !minRating || (product.averageRating && product.averageRating >= minRating);
            const matchesSearch = searchQuery === '' ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.variants.some((v: any) => v.phoneModel.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesBrand && matchesPrice && matchesMaterial && matchesRating && matchesSearch;
        });
    }, [products, selectedCategories, selectedBrands, selectedPriceRanges, selectedMaterials, minRating, searchQuery]);

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    if (loading) return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-primary animate-pulse" />
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest italic animate-pulse">Curating your collection...</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                        Premium Store
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
                        {selectedCategories.length === 1 ? selectedCategories[0] : 'All'} <span className="text-primary italic">Collections</span>
                    </h1>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by model..."
                            className="h-12 w-full glass rounded-full pl-11 pr-4 text-sm font-medium focus:ring-4 ring-primary/10 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button 
                        variant="secondary" 
                        className="h-12 w-12 md:hidden rounded-full p-0"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-12">
                {/* Sidebar Filters */}
                <aside className={cn(
                    "space-y-10 lg:block",
                    isSidebarOpen ? "block" : "hidden"
                )}>
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black uppercase italic tracking-widest flex items-center gap-2">
                                <Filter className="h-4 w-4 text-primary" /> Filters
                            </h3>
                            <button 
                                onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedMaterials([]); setMinRating(null); }}
                                className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="mb-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 bg-muted/50 p-2 rounded-lg">Categories</h4>
                            <div className="flex flex-col gap-2">
                                {['Phone Covers', 'Chargers', 'Audio Accessories'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all",
                                            selectedCategories.includes(cat) 
                                                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/10" 
                                                : "bg-background hover:bg-muted"
                                        )}
                                    >
                                        {cat}
                                        {selectedCategories.includes(cat) && <Check className="h-3 w-3" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="mb-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 bg-muted/50 p-2 rounded-lg">Brands</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {PHONE_MODELS.map(brand => (
                                    <button
                                        key={brand.brand}
                                        onClick={() => setSelectedBrands(prev => prev.includes(brand.brand) ? prev.filter(b => b !== brand.brand) : [...prev, brand.brand])}
                                        className={cn(
                                            "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all",
                                            selectedBrands.includes(brand.brand) 
                                                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                                                : "bg-background hover:bg-muted"
                                        )}
                                    >
                                        {brand.brand}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 bg-muted/50 p-2 rounded-lg">Price</h4>
                            <div className="space-y-3">
                                {PRICE_RANGES.map(range => (
                                    <label key={range.label} className="flex items-center gap-3 group cursor-pointer">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                className="peer h-5 w-5 appearance-none rounded-lg border-2 border-muted checked:bg-primary checked:border-primary transition-all"
                                                checked={selectedPriceRanges.some(r => r.min === range.min)}
                                                onChange={() => setSelectedPriceRanges(prev => prev.some(r => r.min === range.min) ? prev.filter(r => r.min !== range.min) : [...prev, range])}
                                            />
                                            <Check className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-1" />
                                        </div>
                                        <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">{range.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Materials */}
                        <div className="mb-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 bg-muted/50 p-2 rounded-lg">Materials</h4>
                            <div className="flex flex-wrap gap-2">
                                {MATERIALS.map(mat => (
                                    <button
                                        key={mat}
                                        onClick={() => setSelectedMaterials(prev => prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat])}
                                        className={cn(
                                            "px-3 py-1.5 text-[9px] font-bold uppercase rounded-lg border transition-all",
                                            selectedMaterials.includes(mat) ? "bg-secondary text-primary border-primary/20" : "hover:bg-muted"
                                        )}
                                    >
                                        {mat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ratings */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 bg-muted/50 p-2 rounded-lg">Avg. Rating</h4>
                            <div className="space-y-3">
                                {RATINGS.map(rate => (
                                    <button
                                        key={rate}
                                        onClick={() => setMinRating(rate)}
                                        className={cn(
                                            "w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-[10px] font-bold transition-all",
                                            minRating === rate ? "border-primary bg-primary/5 text-primary" : "hover:bg-muted text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={cn("h-3 w-3", i < rate ? "fill-current" : "fill-none opacity-20")} />
                                            ))}
                                        </div>
                                        & Up
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </aside>

                {/* Grid */}
                <div>
                    <AnimatePresence mode="wait">
                        {filteredProducts.length > 0 ? (
                            <motion.div 
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                            >
                                {filteredProducts.map((p, idx) => (
                                    <motion.div
                                        key={p._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group glass-card rounded-[32px] overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer flex flex-col"
                                        onClick={() => handleOpenModal(p)}
                                    >
                                        <div className="aspect-[4/5] relative bg-muted group-hover:bg-muted/80 transition-colors">
                                            <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute top-4 left-4">
                                                <div className="glass px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {p.material?.split(' ')[0] || 'Premium'}
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                <Button variant="secondary" className="rounded-full font-black uppercase text-[10px] tracking-tight py-6 px-10 scale-90 group-hover:scale-100 transition-transform shadow-2xl">Quick Look</Button>
                                            </div>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h3 className="font-black text-lg uppercase italic leading-tight line-clamp-1 group-hover:text-primary transition-colors">{p.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={cn("h-2.5 w-2.5", i < (p.averageRating || 4) ? "fill-primary text-primary" : "text-muted-foreground opacity-30")} />
                                                        ))}
                                                    </div>
                                                    <span className="text-[10px] font-black text-muted-foreground">{p.averageRating || '4.5'}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-2 border-t border-dashed">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-black italic">₹{p.basePrice}</span>
                                                    {p.discount && <span className="text-xs text-muted-foreground line-through italic">₹{(p.basePrice * 1.3).toFixed(0)}</span>}
                                                </div>
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                    <ShoppingBag className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-40 glass-card rounded-[40px] text-center"
                            >
                                <div className="bg-muted p-10 rounded-full mb-8">
                                    <Search className="h-16 w-16 text-muted-foreground opacity-30" />
                                </div>
                                <h2 className="text-3xl font-black uppercase italic italic">No Matches Found</h2>
                                <p className="text-muted-foreground mt-2 max-w-sm font-medium">Try relaxing your filters or searching for something else.</p>
                                <Button 
                                    className="mt-8 rounded-full px-10 h-14 font-black uppercase tracking-widest text-[11px]"
                                    onClick={() => { setSelectedBrands([]); setSelectedPriceRanges([]); setSelectedMaterials([]); setSearchQuery(''); }}
                                >
                                    Reset Discovery
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ProductDetailModal 
                product={selectedProduct} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <div className="min-h-screen">
            <Suspense fallback={
                <div className="flex h-[80vh] items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            }>
                <ProductsContent />
            </Suspense>
        </div>
    );
}
