import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import ErrorResponse from '../utils/errorResponse';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Public (Guest Friendly)
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { items, shippingAddress, totalAmount, paymentMethod, guestEmail } = req.body;

        if (!items || items.length === 0) {
            return next(new ErrorResponse('Please add items to your cart', 400));
        }

        // Create order and items in a transaction
        const order = await prisma.$transaction(async (tx) => {
            // 1. Create the Order
            const newOrder = await tx.order.create({
                data: {
                    guestEmail,
                    totalAmount,
                    shippingAddress: JSON.stringify(shippingAddress),
                    paymentMethod,
                    status: paymentMethod === 'COD' ? 'PENDING' : 'PAID', // Simulated payment
                    items: {
                        create: items.map((item: any) => ({
                            productId: item.productId,
                            sku: item.sku || item.id,
                            name: item.name,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                include: {
                    items: true
                }
            });

            // 2. We could update stock here if variants tracking is complete
            // For now, we trust the frontend/basic seeder stock

            return newOrder;
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Public (for demo)
export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id as string },
            include: { items: true }
        });

        if (!order) {
            return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        next(err);
    }
};
