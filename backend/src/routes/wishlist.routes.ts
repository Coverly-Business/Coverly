import express from 'express';
import {
    getWishlist,
    getWishlistIds,
    addToWishlist,
    removeFromWishlist
} from '../controllers/wishlist.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', protect, getWishlist);
router.get('/ids', protect, getWishlistIds);
router.post('/', protect, addToWishlist);
router.delete('/:productId', protect, removeFromWishlist);

export default router;