import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('ERROR:', err);

    const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

    res.status(statusCode).json({
        success: false,
        error: err.message || 'Something went wrong',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};