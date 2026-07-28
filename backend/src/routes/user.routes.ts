import express from 'express';
import {
    getMe,
    updateMe,
    uploadAvatar,
    addAddress,
    deleteAddress,
    changePassword
} from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.put('/me/avatar', protect, upload.single('avatar'), uploadAvatar);
router.post('/me/addresses', protect, addAddress);
router.delete('/me/addresses/:addressId', protect, deleteAddress);
router.put('/me/password', protect, changePassword);

export default router;