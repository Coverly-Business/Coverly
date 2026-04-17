# COVERLY - Premium Mobile Covers Ecommerce

Full-stack production-ready ecommerce application for "COVERLY".

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React, TypeScript
- Tailwind CSS, Shadcn UI
- Redux Toolkit, RTK Query

**Backend:**
- Node.js, Express, TypeScript
- MongoDB (Mongoose)
- Redis, Cloudinary
- JWT Authentication (Access + Refresh)

## Setup Instructions

### Backend
1. Navigate to `backend` folder `cd backend`.
2. Install dependencies: `npm install`.
3. Configure `.env` file (copy example provided).
4. Run in dev mode: `npm run dev` (uses nodemon).
5. Build: `npm run build` then `npm start`.

### Frontend
1. Navigate to `frontend` folder `cd frontend`.
2. Install dependencies: `npm install`.
3. Configure `.env.local` or edit `next.config.ts` domains.
4. Run: `npm run dev`.

## Features
- **Auth**: Complete flow (Register, Login, Protected Routes).
- **Products**: Admin can Create, Update, Delete, Upload Photos.
- **Store**: Redux State checks local storage for persistence.
- **UI**: Modern, responsive layout with Shadcn components.
- **Checkout**: Razorpay integrated stub on `/checkout`.

## API Documentation
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET `/api/v1/products`
- POST `/api/v1/products` (Admin, Auth Required)
- PUT `/api/v1/products/:id/photo` (Admin, Multipart Form Data)
