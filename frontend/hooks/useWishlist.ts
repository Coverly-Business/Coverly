"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config/api";
import { selectCurrentUser, selectCurrentToken } from "@/features/auth/authSlice";
import {
  setWishlistIds,
  addToWishlistState,
  removeFromWishlistState,
  selectWishlistIds,
  selectWishlistLoaded,
} from "@/features/wishlist/wishlistSlice";

export function useWishlist() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const wishlistIds = useSelector(selectWishlistIds);
  const loaded = useSelector(selectWishlistLoaded);

  useEffect(() => {
    if (user && token && !loaded) {
      fetch(`${API_BASE_URL}/wishlist/ids`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(setWishlistIds(data.data));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [user, token, loaded, dispatch]);

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = async (productId: string, productName?: string) => {
    if (!user || !token) {
      toast.error("Please login to save items to your wishlist.");
      return;
    }

    const currentlyWishlisted = wishlistIds.includes(productId);

    // Optimistic update — turant UI badal do, backend baad mein confirm karega
    if (currentlyWishlisted) {
      dispatch(removeFromWishlistState(productId));
    } else {
      dispatch(addToWishlistState(productId));
    }

    try {
      if (currentlyWishlisted) {
        await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(`${productName || "Item"} removed from wishlist`);
      } else {
        await fetch(`${API_BASE_URL}/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
        toast.success(`${productName || "Item"} added to wishlist`);
      }
    } catch (err) {
      // Agar backend fail ho, UI ko wapas purani state pe le aao
      if (currentlyWishlisted) {
        dispatch(addToWishlistState(productId));
      } else {
        dispatch(removeFromWishlistState(productId));
      }
      toast.error("Something went wrong. Please try again.");
    }
  };

  return { isWishlisted, toggleWishlist };
}