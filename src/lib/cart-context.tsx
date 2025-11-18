'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from './placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { 
  addDocumentNonBlocking, 
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking
} from '@/firebase/non-blocking-updates';
import { useCollection } from '@/firebase/firestore/use-collection';


export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const cartCollectionRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/cart`);
  }, [firestore, user]);

  const { data: firestoreCartItems, isLoading: isCartLoading } = useCollection<CartItem>(cartCollectionRef);

  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  
  const cartItems = user ? (firestoreCartItems || []) : localCartItems;
  const isLoading = isUserLoading || (user && isCartLoading);
  
  // Merge local cart to firestore cart on login
  useEffect(() => {
    if (user && localCartItems.length > 0) {
      const batch = writeBatch(firestore);
      const userCartRef = collection(firestore, 'users', user.uid, 'cart');

      getDocs(userCartRef).then(snapshot => {
        const firestoreItems = snapshot.docs.map(d => ({...d.data(), id: d.id})) as CartItem[];

        localCartItems.forEach(localItem => {
          const existingItem = firestoreItems.find(item => item.product.id === localItem.product.id);
          if (existingItem) {
            const docRef = doc(userCartRef, existingItem.id);
            batch.update(docRef, { quantity: existingItem.quantity + localItem.quantity });
          } else {
            const docRef = doc(userCartRef);
            batch.set(docRef, { product: localItem.product, quantity: localItem.quantity });
          }
        });
        
        batch.commit().then(() => {
          setLocalCartItems([]);
        });
      });
    }
  }, [user, firestore, localCartItems]);


  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if (user && cartCollectionRef) {
      if (existingItem) {
        const docRef = doc(cartCollectionRef, existingItem.id);
        updateDocumentNonBlocking(docRef, { quantity: existingItem.quantity + quantity });
      } else {
        addDocumentNonBlocking(cartCollectionRef, { product, quantity });
      }
    } else {
      setLocalCartItems(prevItems => {
        if (existingItem) {
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        // Firestore will add the id, for local we just use product id
        return [...prevItems, { id: product.id, product, quantity }];
      });
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cartItems.find(item => item.product.id === productId);
    if (!itemToRemove) return;
    
    if (user && cartCollectionRef) {
        const docRef = doc(cartCollectionRef, itemToRemove.id);
        deleteDocumentNonBlocking(docRef);
    } else {
        setLocalCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const itemToUpdate = cartItems.find(item => item.product.id === productId);
    if (!itemToUpdate) return;
    
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (user && cartCollectionRef) {
        const docRef = doc(cartCollectionRef, itemToUpdate.id);
        updateDocumentNonBlocking(docRef, { quantity });
    } else {
        setLocalCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }
  };

  const clearCart = () => {
    if (user && cartCollectionRef) {
      const batch = writeBatch(firestore);
      cartItems.forEach(item => {
        const docRef = doc(cartCollectionRef, item.id);
        batch.delete(docRef);
      });
      batch.commit();
    } else {
      setLocalCartItems([]);
    }
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
