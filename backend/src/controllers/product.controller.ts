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
            images: product.images.map((img: any) => img.url),
            imageObjects: product.images.map((img: any) => ({ id: img.id, url: img.url }))
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
// Upload photo(s) for product
export const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id as string },
            include: { images: true }
        });

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            return next(new ErrorResponse(`Please upload at least one file`, 400));
        }

        const existingCount = product.images.length;
        const totalAfterUpload = existingCount + files.length;

        if (totalAfterUpload > 4) {
            return next(new ErrorResponse(`Maximum 4 images allowed per product. You already have ${existingCount}, and tried to add ${files.length}.`, 400));
        }

        // Har file ko Cloudinary pe upload karo, ek-ek karke
        const uploadedImages = [];
        for (const file of files) {
            const uploadResponse = await cloudinary.uploader.upload(file.path);
            const newImage = await prisma.image.create({
                data: {
                    url: uploadResponse.secure_url,
                    productId: req.params.id as string
                }
            });
            uploadedImages.push(newImage.url);
        }

        res.status(200).json({
            success: true,
            data: uploadedImages
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a specific image from a product
// @route   DELETE /api/v1/products/:id/photo/:imageId
// @access  Private/Admin
export const deleteProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = await prisma.image.findUnique({
            where: { id: req.params.imageId as string }
        });

        if (!image || image.productId !== req.params.id) {
            return next(new ErrorResponse(`Image not found`, 404));
        }

        await prisma.image.delete({
            where: { id: req.params.imageId as string }
        });

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};