import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadProductImage } from '../controllers/product.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, authorize('admin'), createProduct);

router.route('/:id')
    .put(protect, authorize('admin'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct);

router.route('/:id/photo')
    .put(protect, authorize('admin'), upload.single('image'), uploadProductImage);

export default router;
