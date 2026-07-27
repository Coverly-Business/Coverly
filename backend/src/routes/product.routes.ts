import express from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadProductImage, deleteProductImage } from '../controllers/product.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { uploadMultiple } from '../middlewares/upload.middleware';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, authorize('admin'), createProduct);

router.route('/:id').get(getProduct);

router.route('/:id')
    .put(protect, authorize('admin'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct);

router.route('/:id/photo')
    .put(protect, authorize('admin'), uploadMultiple.array('images', 4), uploadProductImage);

router.route('/:id/photo/:imageId')
    .delete(protect, authorize('admin'), deleteProductImage);

export default router;