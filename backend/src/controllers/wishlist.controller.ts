import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

// @desc    Get logged-in user's wishlist (with product details)
// @route   GET /api/v1/wishlist
// @access  Private
export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;

        const wishlistItems = await prisma.wishlist.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        // Har wishlist entry ke liye product ki poori details fetch karo
        const productIds = wishlistItems.map((item) => item.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            include: { images: true, variants: true }
        });

        const formattedProducts = products.map((p: any) => ({
            ...p,
            _id: p.id,
            images: p.images.map((img: any) => img.url)
        }));

        res.status(200).json({ success: true, count: formattedProducts.length, data: formattedProducts });
    } catch (err) {
        next(err);
    }
};

// @desc    Get just the product IDs in wishlist (lightweight, for heart icon state)
// @route   GET /api/v1/wishlist/ids
// @access  Private
export const getWishlistIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;

        const wishlistItems = await prisma.wishlist.findMany({
            where: { userId },
            select: { productId: true }
        });

        res.status(200).json({ success: true, data: wishlistItems.map((item) => item.productId) });
    } catch (err) {
        next(err);
    }
};

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Private
export const addToWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, error: 'productId is required' });
        }

        // Agar already exist karta hai, dobara add mat karo
        const existing = await prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } }
        });

        if (existing) {
            return res.status(200).json({ success: true, data: existing });
        }

        const newItem = await prisma.wishlist.create({
            data: { userId, productId }
        });

        res.status(201).json({ success: true, data: newItem });
    } catch (err) {
        next(err);
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/v1/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        const { productId } = req.params;

        await prisma.wishlist.deleteMany({
            where: { userId, productId: productId as string }
        });

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};