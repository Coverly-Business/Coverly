import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import ErrorResponse from '../utils/errorResponse';
import cloudinary from '../config/cloudinary';

// @desc    Get logged-in user's profile
// @route   GET /api/v1/users/me
// @access  Private
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { addresses: true }
        });

        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }

        const userResponse = { ...user, _id: user.id };
        delete (userResponse as any).password;

        res.status(200).json({ success: true, data: userResponse });
    } catch (err) {
        next(err);
    }
};

// @desc    Update profile (name, phone)
// @route   PUT /api/v1/users/me
// @access  Private
export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        const { name, phone } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, phone },
            include: { addresses: true }
        });

        const userResponse = { ...updatedUser, _id: updatedUser.id };
        delete (userResponse as any).password;

        res.status(200).json({ success: true, data: userResponse });
    } catch (err) {
        next(err);
    }
};

// @desc    Upload/update profile photo
// @route   PUT /api/v1/users/me/avatar
// @access  Private
export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;

        if (!req.file) {
            return next(new ErrorResponse('Please upload a file', 400));
        }

        const uploadResponse = await cloudinary.uploader.upload(req.file.path);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { avatar: uploadResponse.secure_url }
        });

        res.status(200).json({ success: true, data: updatedUser.avatar });
    } catch (err) {
        next(err);
    }
};

// @desc    Add a new address
// @route   POST /api/v1/users/me/addresses
// @access  Private
export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        const { label, name, phone, address, city, pincode, isDefault } = req.body;

        // Agar isDefault true hai, baaki sab addresses ko false karo
        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId },
                data: { isDefault: false }
            });
        }

        const newAddress = await prisma.address.create({
            data: { label, name, phone, address, city, pincode, isDefault: !!isDefault, userId }
        });

        res.status(201).json({ success: true, data: newAddress });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete an address
// @route   DELETE /api/v1/users/me/addresses/:addressId
// @access  Private
export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        const address = await prisma.address.findUnique({
            where: { id: req.params.addressId as string }
        });

        if (!address || address.userId !== userId) {
            return next(new ErrorResponse('Address not found', 404));
        }

        await prisma.address.delete({ where: { id: req.params.addressId as string } });

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// @desc    Change password
// @route   PUT /api/v1/users/me/password
// @access  Private
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bcrypt = require('bcryptjs');
        const userId = (req as any).user?.id;
        const { currentPassword, newPassword } = req.body;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        res.status(200).json({ success: true, data: 'Password updated successfully' });
    } catch (err) {
        next(err);
    }
};