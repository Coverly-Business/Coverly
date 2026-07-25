import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import ErrorResponse from '../utils/errorResponse';
import { sendOrderConfirmationEmail } from '../utils/sendEmail';

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

            return newOrder;
        });

        // Order confirmation email bhejo (agar email fail bhi ho, order block nahi hoga)
        if (guestEmail) {
            const customerName = shippingAddress?.name || 'Customer';
            sendOrderConfirmationEmail({
                to: guestEmail,
                customerName,
                orderId: order.id,
                items: order.items,
                totalAmount: order.totalAmount,
                paymentMethod: order.paymentMethod,
            });
        }

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

// @desc    Get all orders (Admin only)
// @route   GET /api/v1/orders
// @access  Private/Admin
export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await prisma.order.findMany({
            include: { items: true },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;

        const validStatuses = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'];
        if (!validStatuses.includes(status)) {
            return next(new ErrorResponse('Invalid status value', 400));
        }

        const order = await prisma.order.findUnique({
            where: { id: req.params.id as string }
        });

        if (!order) {
            return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
        }

        const updatedOrder = await prisma.order.update({
            where: { id: req.params.id as string },
            data: { status },
            include: { items: true }
        });

        res.status(200).json({
            success: true,
            data: updatedOrder
        });
    } catch (err) {
        next(err);
    }
};
