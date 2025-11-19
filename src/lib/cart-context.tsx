
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product, Course, ProductVariant } from './placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { 
  addDocumentNonBlocking, 
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking
} from '@/firebase/non-blocking-updates';
import { useCollection } from '@/firebase/firestore/use-collection';

// The item that gets stored in the cart context and Firestore
export type CartItemBase = {
  id: string; // Firestore document ID
  itemId: string; // Product or Course ID
  variantId?: string; // ProductVariant ID
  type: 'product' | 'course';
  quantity: number;
}

// The item that's used throughout the app UI, with full object details
export type CartItem = {
  id: string; // Firestore document ID
  item: (Product | Course) & { price: number; image: {src: string, alt: string}};
  type: 'product' | 'course';
  quantity: number;
};


type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product | Course, type: 'product' | 'course', quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
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

  // This hook now fetches the raw CartItemBase objects from Firestore
  const { data: firestoreCartItems, isLoading: isCartLoading } = useCollection<CartItemBase>(cartCollectionRef);

  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  
  // Here we would transform firestoreCartItems into the rich CartItem shape
  // For this placeholder, we'll assume the `item` is stored denormalized.
  // In a real app, you would fetch product/course details here based on itemId.
  const cartItems: CartItem[] = user ? (firestoreCartItems as any[] || []) : localCart;

  const isLoading = isUserLoading || (user && isCartLoading);
  
  // Logic to merge local cart to firestore cart on login
  useEffect(() => {
    if (user && firestore && localCart.length > 0 && !isCartLoading) {
        const userCartRef = collection(firestore, 'users', user.uid, 'cart');
        const batch = writeBatch(firestore);

        localCart.forEach(localItem => {
            const existingItem = firestoreCartItems?.find(item => item.itemId === localItem.item.id && ('variantId' in item ? item.variantId === (localItem.item as any).variantId : true));
            
            if (existingItem && existingItem.id) {
                const docRef = doc(userCartRef, existingItem.id);
                batch.update(docRef, { quantity: existingItem.quantity + localItem.quantity });
            } else {
                const docRef = doc(userCartRef);
                const newCartItem: Omit<CartItemBase, 'id'> = {
                    itemId: localItem.item.id,
                    type: localItem.type,
                    quantity: localItem.quantity,
                    ...(localItem.type === 'product' && { variantId: (localItem.item as any).id })
                };
                 // Storing the full item is denormalization. This is simpler for the prototype
                 // but in a real app you might just store IDs.
                batch.set(docRef, { ...newCartItem, item: JSON.parse(JSON.stringify(localItem.item)) });
            }
        });
        
        batch.commit().then(() => {
            setLocalCart([]);
        });
    }
  }, [user, firestore, localCart, firestoreCartItems, isCartLoading]);


  const addToCart = (itemToAdd: Product | Course, type: 'product' | 'course', quantity: number = 1, variant?: ProductVariant) => {
    
    // Use variant details if it's a product
    const itemWithDetails = {
        ...itemToAdd,
        id: type === 'product' ? (variant ? variant.id : (itemToAdd as Product).variants[0].id) : itemToAdd.id,
        price: type === 'product' ? (variant ? variant.price : (itemToAdd as Product).variants[0].price) : itemToAdd.price,
        image: type === 'product' ? (variant ? variant.images[0] : (itemToAdd as Product).variants[0].images[0]) : itemToAdd.image,
    };

    const uniqueIdInCart = itemWithDetails.id; // e.g. 'prod-1-black' or 'course-1'
    
    const existingItem = cartItems.find(item => item.item.id === uniqueIdInCart);

    if (user && cartCollectionRef) {
      if (existingItem) {
        const docRef = doc(cartCollectionRef, existingItem.id);
        updateDocumentNonBlocking(docRef, { quantity: existingItem.quantity + quantity });
      } else {
        const plainItem = JSON.parse(JSON.stringify(itemWithDetails));
        addDocumentNonBlocking(cartCollectionRef, { item: plainItem, type, quantity });
      }
    } else {
      setLocalCart(prevItems => {
        const existingLocalItem = prevItems.find(item => item.item.id === uniqueIdInCart);
        if (existingLocalItem) {
          return prevItems.map(item =>
            item.item.id === uniqueIdInCart
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { id: uniqueIdInCart, item: itemWithDetails, type, quantity }];
      });
    }

    toast({
      title: "Added to cart",
      description: `${itemToAdd.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (cartDocId: string) => {
    if (user && cartCollectionRef) {
        const docRef = doc(cartCollectionRef, cartDocId);
        deleteDocumentNonBlocking(docRef);
    } else {
        // For local cart, we don't have a firestore doc ID. We'll use the item's unique id.
        setLocalCart(prevItems => prevItems.filter(item => item.id !== cartDocId));
    }
  };

  const updateQuantity = (cartDocId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartDocId);
      return;
    }
    
    if (user && cartCollectionRef) {
        const docRef = doc(cartCollectionRef, cartDocId);
        updateDocumentNonBlocking(docRef, { quantity });
    } else {
        setLocalCart(prevItems =>
            prevItems.map(item =>
                item.id === cartDocId ? { ...item, quantity } : item
            )
        );
    }
  };

  const clearCart = () => {
    if (user && cartCollectionRef && firestore) {
      const batch = writeBatch(firestore);
      cartItems.forEach(item => {
        const docRef = doc(cartCollectionRef, item.id);
        batch.delete(docRef);
      });
      batch.commit();
    } else {
      setLocalCart([]);
    }
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0);

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
