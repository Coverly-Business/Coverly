import mongoose from 'mongoose';
import Product from './models/product.model';
import dotenv from 'dotenv';

dotenv.config();

const products = [
    {
        name: "Midnight Silk Glass Case",
        slug: "midnight-silk-glass-case",
        description: "A premium glass case with a silky smooth finish. Provides excellent protection and a luxurious feel.",
        basePrice: 999,
        images: ["https://images.unsplash.com/photo-1603313011101-31c73ad7d8e2?q=80&w=800&auto=format&fit=crop"],
        category: "Mobile Phone Covers",
        variants: [
            { phoneBrand: "Apple", phoneModel: "iPhone 15 Pro", caseType: "Glass", color: "Midnight Black", stock: 50, sku: "MSG-IP15P-BLK" },
            { phoneBrand: "Apple", phoneModel: "iPhone 15", caseType: "Glass", color: "Midnight Black", stock: 50, sku: "MSG-IP15-BLK" },
            { phoneBrand: "Samsung", phoneModel: "Galaxy S24 Ultra", caseType: "Glass", color: "Midnight Black", stock: 50, sku: "MSG-S24U-BLK" }
        ]
    },
    {
        name: "Oceanic Blue Liquid Silicone",
        slug: "oceanic-blue-liquid-silicone",
        description: "Soft-touch liquid silicone case with microfiber lining. Anti-fingerprint and shockproof.",
        basePrice: 699,
        images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop"],
        category: "Mobile Phone Covers",
        variants: [
            { phoneBrand: "Apple", phoneModel: "iPhone 14", caseType: "Silicone", color: "Oceanic Blue", stock: 100, sku: "OBS-IP14-BLU" },
            { phoneBrand: "OnePlus", phoneModel: "OnePlus 12", caseType: "Silicone", color: "Oceanic Blue", stock: 40, sku: "OBS-OP12-BLU" }
        ]
    },
    {
        name: "Carbon Fiber Rugged Armor",
        slug: "carbon-fiber-rugged-armor",
        description: "Heavy-duty protection with carbon fiber accents. Engineered for extreme durability.",
        basePrice: 1299,
        images: ["https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=800&auto=format&fit=crop"],
        category: "Mobile Phone Covers",
        variants: [
            { phoneBrand: "Google Pixel", phoneModel: "Pixel 8 Pro", caseType: "Rugged", color: "Stealth Black", stock: 30, sku: "CFA-GP8P-BLK" },
            { phoneBrand: "Nothing", phoneModel: "Nothing Phone (2)", caseType: "Rugged", color: "Stealth Black", stock: 25, sku: "CFA-NP2-BLK" }
        ]
    },
    {
        name: "Clear Crystal MagSafe Case",
        slug: "clear-crystal-magsafe-case",
        description: "Show off your phone's original design while keeping it protected. Built-in magnets for MagSafe compatibility.",
        basePrice: 849,
        images: ["https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=800&auto=format&fit=crop"],
        category: "Mobile Phone Covers",
        variants: [
            { phoneBrand: "Apple", phoneModel: "iPhone 15 Pro Max", caseType: "Clear", color: "Crystal Clear", stock: 75, sku: "CMC-IP15PM-CLR" },
            { phoneBrand: "Apple", phoneModel: "iPhone 13", caseType: "Clear", color: "Crystal Clear", stock: 60, sku: "CMC-IP13-CLR" }
        ]
    },
    {
        name: "Sunset Gradient Tough Case",
        slug: "sunset-gradient-tough-case",
        description: "Vibrant sunset colors with a dual-layer tough construction. Beautiful and protective.",
        basePrice: 799,
        images: ["https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop"],
        category: "Mobile Phone Covers",
        variants: [
            { phoneBrand: "Vivo", phoneModel: "Vivo V29", caseType: "Tough", color: "Sunset", stock: 45, sku: "SGT-V29-SUN" },
            { phoneBrand: "Realme", phoneModel: "Realme 11 Pro", caseType: "Tough", color: "Sunset", stock: 40, sku: "SGT-R11P-SUN" }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB Connected for seeding...');

        // Clear existing products
        await Product.deleteMany();
        console.log('Existing products cleared.');

        // Insert new products
        console.log('Inserting products...');
        const createdProducts = await Product.insertMany(products);
        console.log(`Data seeded successfully! Inserted ${createdProducts.length} products.`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

console.log('Starting seed process...');
seedDB();
