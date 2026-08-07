import { Request, Response, NextFunction } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// @desc    Create a Razorpay order (before payment)
// @route   POST /api/v1/payment/create-order
// @access  Public
export const createRazorpayOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, error: 'Invalid amount' });
        }

        const options = {
            amount: Math.round(amount * 100), // Razorpay paise mein leta hai, rupees mein nahi
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

// @desc    Verify payment signature (security check)
// @route   POST /api/v1/payment/verify
// @access  Public
export const verifyRazorpayPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        const isValid = generatedSignature === razorpay_signature;

        if (!isValid) {
            return res.status(400).json({ success: false, error: 'Payment verification failed' });
        }

        res.status(200).json({ success: true, message: 'Payment verified' });
    } catch (err) {
        next(err);
    }
};