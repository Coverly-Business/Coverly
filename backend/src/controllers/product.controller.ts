import { Request, Response, NextFunction } from 'express';
import Product from '../models/product.model';
import ErrorResponse from '../utils/errorResponse';
import cloudinary from '../config/cloudinary';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Add user to req,body if needed
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        await product.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// Upload photo for product
export const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
        }

        if (!req.file) {
            return next(new ErrorResponse(`Please upload a file`, 400));
        }

        // Use cloudinary to upload
        const fileStr = req.file.path;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'coverly_products'
        });

        // Add to images array
        product.images.push(uploadResponse.secure_url);
        await product.save();

        res.status(200).json({
            success: true,
            data: product.images
        });
    } catch (err) {
        next(err);
    }
};
