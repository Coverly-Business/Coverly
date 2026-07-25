import { Router } from 'express';
import { createOrder, getOrder, getOrders, updateOrderStatus } from '../controllers/order.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.route('/')
    .post(createOrder)
    .get(protect, authorize('admin'), getOrders);

router.route('/:id')
    .get(getOrder);

router.route('/:id/status')
    .put(protect, authorize('admin'), updateOrderStatus);

export default router;