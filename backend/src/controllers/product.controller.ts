import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import ErrorResponse from '../utils/errorResponse';
import cloudinary from '../config/cloudinary';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                variants: true,
                images: true
            }
        });

        // Map images to array of strings for frontend compatibility
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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id as string },
            include: {
                variants: true,
                images: true
            }
        });

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        const formattedProduct = {
            ...product,
            _id: product.id,
            images: product.images.map((img: any) => img.url)
        };

        res.status(200).json({ success: true, data: formattedProduct });
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { variants, images, ...productData } = req.body;

        const product = await prisma.product.create({
            data: {
                ...productData,
                variants: variants ? {
                    create: variants
                } : undefined,
                images: images ? {
                    create: images.map((url: string) => ({ url }))
                } : undefined
            },
            include: {
                variants: true,
                images: true
            }
        });

        res.status(201).json({ success: true, data: { ...product, _id: product.id } });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { variants, images, ...productData } = req.body;

        let product = await prisma.product.findUnique({
            where: { id: req.params.id as string }
        });

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        // Agar variants (stock/quantity) update karne ko bheje gaye hain
        if (variants) {
            for (const variant of variants) {
                if (variant.id) {
                    // Existing variant hai, usko update karo
                    await prisma.variant.update({
                        where: { id: variant.id },
                        data: {
                            stock: variant.stock,
                            price: variant.price,
                            color: variant.color,
                        }
                    });
                }
            }
        }

        const updatedProduct = await prisma.product.update({
            where: { id: req.params.id as string },
            data: productData,
            include: {
                variants: true,
                images: true
            }
        });

        res.status(200).json({ success: true, data: { ...updatedProduct, _id: updatedProduct.id } });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id as string }
        });

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        await prisma.product.delete({
            where: { id: req.params.id as string }
        });

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// Upload photo for product
export const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id as string }
        });

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        if (!req.file) {
            return next(new ErrorResponse(`Please upload a file`, 400));
        }

        // Use cloudinary to upload
        const fileStr = req.file.path;
        const uploadResponse = await cloudinary.uploader.upload(fileStr);
        // Add to images table
        const newImage = await prisma.image.create({
            data: {
                url: uploadResponse.secure_url,
                productId: req.params.id as string
            }
        });

        res.status(200).json({
            success: true,
            data: newImage.url
        });
    } catch (err) {
        console.log("IMAGE UPLOAD ERROR:", err);
        next(err);
    }
};
