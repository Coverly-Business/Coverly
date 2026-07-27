import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/api';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
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
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
        googleLogin: builder.mutation({
            query: (credential) => ({
                url: '/auth/google',
                method: 'POST',
                body: { credential }
            }),
            invalidatesTags: ['User']
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            }),
            invalidatesTags: ['User']
        }),
    })
});

export const { useGetProductsQuery, useGetProductQuery, useCreateOrderMutation, useLoginMutation, useRegisterMutation, useGoogleLoginMutation } = apiSlice;
