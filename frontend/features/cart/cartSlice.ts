import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: string; // SKU or combined key
    productId: string;
    sku: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    phoneModel: string;
    phoneBrand: string;
    caseType: string;
    color: string;
}

interface CartState {
    items: CartItem[];
}

// Initial state function to safely handle SSR
const getInitialState = (): CartState => {
    if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        return {
            items: savedCart ? JSON.parse(savedCart) : [],
        };
    }
    return { items: [] };
};

const initialState: CartState = getInitialState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                }
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
        }
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: any) => state.cart.items;
export const selectCartTotal = (state: any) => 
    state.cart.items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
export const selectCartCount = (state: any) => 
    state.cart.items.reduce((count: number, item: CartItem) => count + item.quantity, 0);
