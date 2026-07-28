'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store'
import { setCredentials } from '../features/auth/authSlice'

function AuthRehydrator({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                store.dispatch(setCredentials({ user, token }));
            } catch (err) {
                console.error('Failed to rehydrate auth state:', err);
            }
        }
    }, []);

    return <>{children}</>;
}

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            <AuthRehydrator>{children}</AuthRehydrator>
        </Provider>
    )
}