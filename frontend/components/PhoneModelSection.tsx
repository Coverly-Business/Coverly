'use client';

import { PHONE_MODELS } from "@/lib/phone-models";
import { motion } from "framer-motion";

// Helper to map brand names to standard SimpleIcons slugs
const getBrandSlug = (brandName: string) => {
    const map: Record<string, string> = {
        "Apple": "apple/foreground",
        "Samsung": "samsung/foreground",
        "OnePlus": "oneplus/foreground",
        "Xiaomi / Redmi": "xiaomi/foreground",
        "Realme": "realme/foreground",
        "Vivo": "vivo/foreground",
        "Oppo": "oppo/foreground",
        "Motorola": "motorola/foreground",
        "Nothing": "nothing/foreground",
        "Google Pixel": "google/foreground",
        // iQOO and Lava are less common on simpleicons, fallback to their names
        "iQOO": "iqoo/foreground",
        "Lava / Micromax": "android/foreground" 
    };
    return map[brandName] || "android/foreground";
};

export function PhoneModelSection() {
    // Duplicate for seamless infinite scrolling
    const brands = [...PHONE_MODELS, ...PHONE_MODELS];

    return (
        <section className="bg-background py-16 border-y border-border/50 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="mb-8 text-center px-4 relative z-20">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    Engineered For
                </p>
                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
                    100+ Premium <span className="text-primary">Devices</span>
                </h2>
            </div>

            <div className="w-full relative flex overflow-x-hidden group">
                <motion.div
                    className="flex space-x-16 px-6 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 35 
                    }}
                >
                    {brands.map((brand, idx) => (
                        <div 
                            key={`${brand.brand}-${idx}`} 
                            className="flex flex-col items-center justify-center gap-3 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default min-w-[120px]"
                        >
                            <img 
                                src={`https://cdn.simpleicons.org/${getBrandSlug(brand.brand)}`} 
                                alt={brand.brand}
                                className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-md"
                            />
                            <span className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-foreground/80 mt-1">
                                {brand.brand}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}


