'use client';

import { useUser } from '@/firebase/auth/use-user';
import { useCollection } from './use-collection';
import { collection } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { useMemo } from 'react';

// A placeholder for what a cart item might look like
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

/**
 * A hook to fetch the current user's shopping cart from Firestore.
 * 
 * @returns The user's cart items, loading state, and any errors.
 */
export function useCart() {
  const { user } = useUser();
  const firestore = useFirestore();

  // Create a memoized reference to the user's cart collection.
  // This is crucial to prevent re-renders and infinite loops.
  // The query will be null if there is no user, and the useCollection hook
  // will correctly handle this by not fetching any data.
  const cartCollectionRef = useMemo(() => {
    if (!user) return null; // No user, no cart query
    return collection(firestore, 'users', user.uid, 'cart');
  }, [user, firestore]);

  // Use the useCollection hook to subscribe to cart updates
  const { data: cartItems, isLoading, error } = useCollection<CartItem>(cartCollectionRef);

  return { cartItems, isLoading, error };
}
