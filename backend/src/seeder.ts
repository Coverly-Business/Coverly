import prisma from './config/prisma';
import dotenv from 'dotenv';

dotenv.config();

const products = [
    {
        name: "Midnight Silk Glass Case",
        slug: "midnight-silk-glass-case",
        description: "A premium glass case with a silky smooth finish. Provides excellent protection and a luxurious feel.",
        basePrice: 999,
        material: "Tempered Glass",
        discount: 10,
        averageRating: 4.8,
        images: ["/images/products/glass_case.png"],
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
        material: "Liquid Silicone",
        discount: 15,
        averageRating: 4.6,
        images: ["/images/products/silicone_case.png"],
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
        material: "Carbon Fiber + TPU",
        discount: 5,
        averageRating: 4.9,
        images: ["/images/products/carbon_fiber_case.png"],
        category: "Phone Covers",
        variants: [
            { phoneBrand: "Apple", phoneModel: "iPhone 15 Pro", caseType: "Rugged", color: "Stealth Black", stock: 30, sku: "CFA-IP15P-BLK" },
            { phoneBrand: "Samsung", phoneModel: "Galaxy S24 Ultra", caseType: "Rugged", color: "Stealth Black", stock: 25, sku: "CFA-S24U-BLK" }
        ]
    },
    {
        name: "Liquid MagSafe Charger",
        slug: "liquid-magsafe-charger",
        description: "A sleek, minimalist MagSafe wireless charger with fast charging support. Minimal clutter, maximum power.",
        basePrice: 2499,
        material: "Aluminum + PC",
        discount: 10,
        averageRating: 4.7,
        images: ["/images/products/magsafe_charger.png"],
        category: "Chargers",
        variants: [
            { phoneBrand: "Universal", phoneModel: "MagSafe Compatible", caseType: "Charger", color: "Arctic White", stock: 100, sku: "CHG-MG-WHT" }
        ]
    },
    {
        name: "Vintage Leather AirPods Case",
        slug: "vintage-leather-airpods-case",
        description: "Handcrafted top-grain leather case for your AirPods. Patinas beautifully over time.",
        basePrice: 1499,
        material: "Genuine Leather",
        discount: 5,
        averageRating: 4.9,
        images: ["/images/products/airpods_leather_case.png"],
        category: "Audio Accessories",
        variants: [
            { phoneBrand: "Apple", phoneModel: "AirPods Pro 2", caseType: "Leather", color: "Cognac Brown", stock: 50, sku: "APC-APP2-BRN" },
            { phoneBrand: "Apple", phoneModel: "AirPods 3", caseType: "Leather", color: "Cognac Brown", stock: 50, sku: "APC-AP3-BRN" }
        ]
    }
];

const seedDB = async () => {
    try {
        console.log('Seeding SQLite database with Prisma...');

        // Clear existing data
        await prisma.variant.deleteMany();
        await prisma.image.deleteMany();
        await prisma.product.deleteMany();
        console.log('Existing data cleared.');

        // Insert new products
        console.log('Inserting products...');
        
        for (const p of products) {
            const { variants, images, ...productData } = p;
            await prisma.product.create({
                data: {
                    ...productData,
                    variants: {
                        create: variants
                    },
                    images: {
                        create: images.map(url => ({ url }))
                    }
                }
            });
        }

        console.log(`Data seeded successfully! Inserted ${products.length} products.`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

console.log('Starting seed process...');
seedDB();
