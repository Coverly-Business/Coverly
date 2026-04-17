import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            } else if (typeof window !== 'undefined') {
                const localToken = localStorage.getItem('token');
                if (localToken) {
                    headers.set('authorization', `Bearer ${localToken}`);
                }
            }
            return headers;
        }
    }),
    tagTypes: ['User', 'Product', 'Order'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products',
            providesTags: ['Product']
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order']
        }),
    })
});

export const { useGetProductsQuery, useGetProductQuery, useCreateOrderMutation } = apiSlice;
