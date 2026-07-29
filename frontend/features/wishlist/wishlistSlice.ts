import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
    productIds: string[];
    loaded: boolean;
}

const initialState: WishlistState = {
    productIds: [],
    loaded: false,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistIds: (state, action: PayloadAction<string[]>) => {
            state.productIds = action.payload;
            state.loaded = true;
        },
        addToWishlistState: (state, action: PayloadAction<string>) => {
            if (!state.productIds.includes(action.payload)) {
                state.productIds.push(action.payload);
            }
        },
        removeFromWishlistState: (state, action: PayloadAction<string>) => {
            state.productIds = state.productIds.filter((id) => id !== action.payload);
        },
        clearWishlist: (state) => {
            state.productIds = [];
            state.loaded = false;
        },
    },
});

export const { setWishlistIds, addToWishlistState, removeFromWishlistState, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistIds = (state: any) => state.wishlist.productIds;
export const selectIsWishlisted = (productId: string) => (state: any) =>
    state.wishlist.productIds.includes(productId);
export const selectWishlistLoaded = (state: any) => state.wishlist.loaded;