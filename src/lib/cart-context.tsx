
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product, Course, ProductVariant } from './placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, getDocs, writeBatch, query, where, getDoc } from 'firebase/firestore';
import { 
  addDocumentNonBlocking, 
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking,
  setDocumentNonBlocking
} from '@/firebase/non-blocking-updates';
import { useCollection } from '@/firebase/firestore/use-collection';
import { getProductById, getCourseById } from './placeholder-data';


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
  item: {
    id: string;
    name: string;
    price: number;
    image: { src: string; alt: string, aiHint?: string };
    type: 'product' | 'course';
    originalId: string; // The base product or course ID
    variantId?: string;
  };
  quantity: number;
  type: 'product' | 'course';
};


type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Product | Course, type: 'product' | 'course', quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  hasOnlyDigitalItems: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [combinedCart, setCombinedCart] = useState<CartItem[]>([]);

  const cartCollectionRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/cart`);
  }, [firestore, user]);

  const { data: firestoreCartItems, isLoading: isCartLoading } = useCollection<CartItemBase>(cartCollectionRef);
  
  useEffect(() => {
    async function resolveCartItems() {
      if (!firestoreCartItems) {
        setCombinedCart([]);
        return;
      };

      const resolvedItems: CartItem[] = [];
      for (const cartItem of firestoreCartItems) {
        let itemDetails: any = null;
        if (cartItem.type === 'product') {
          const product = getProductById(cartItem.itemId);
          if (product) {
            const variant = product.variants.find(v => v.id === cartItem.variantId) || product.variants[0];
            itemDetails = {
              id: variant.id,
              name: product.name,
              price: variant.price,
              image: variant.images[0],
              type: 'product',
              originalId: product.id,
              variantId: variant.id,
            };
          }
        } else { // course
          const course = getCourseById(cartItem.itemId);
          if (course) {
            itemDetails = {
              id: course.id,
              name: course.name,
              price: course.price,
              image: course.image,
              type: 'course',
              originalId: course.id
            };
          }
        }

        if (itemDetails) {
          resolvedItems.push({
            id: cartItem.id, // This is the doc ID from Firestore
            item: itemDetails,
            type: cartItem.type,
            quantity: cartItem.quantity
          });
        }
      }
      setCombinedCart(resolvedItems);
    }

    if(user) {
        resolveCartItems();
    } else {
        setCombinedCart(localCart);
    }
  }, [firestoreCartItems, user, localCart]);


  // Logic to merge local cart to firestore cart on login
  useEffect(() => {
    async function mergeCarts() {
        if (user && firestore && localCart.length > 0 && !isCartLoading) {
            const userCartRef = collection(firestore, 'users', user.uid, 'cart');
            const batch = writeBatch(firestore);

            for (const localItem of localCart) {
                const q = query(userCartRef, 
                    where("itemId", "==", localItem.item.originalId), 
                    where("variantId", "==", localItem.item.variantId || null)
                );
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    // Item exists, update quantity
                    const firestoreDoc = querySnapshot.docs[0];
                    const newQuantity = firestoreDoc.data().quantity + localItem.quantity;
                    batch.update(firestoreDoc.ref, { quantity: newQuantity });
                } else {
                    // Item does not exist, add it
                    const newDocRef = doc(userCartRef);
                    const newCartItem = {
                        itemId: localItem.item.originalId,
                        variantId: localItem.item.variantId || null,
                        type: localItem.type,
                        quantity: localItem.quantity,
                    };
                    batch.set(newDocRef, newCartItem);
                }
            }
            
            await batch.commit();
            setLocalCart([]); // Clear local cart after merging
        }
    }
    mergeCarts();
  }, [user, firestore, localCart, isCartLoading]);


  const addToCart = (itemToAdd: Product | Course, type: 'product' | 'course', quantity: number = 1, variant?: ProductVariant) => {
    const isProduct = type === 'product';
    const product = isProduct ? (itemToAdd as Product) : null;
    const selectedVariant = isProduct ? (variant || product!.variants[0]) : null;

    const cartItemData = {
        id: isProduct ? selectedVariant!.id : itemToAdd.id,
        name: itemToAdd.name,
        price: isProduct ? selectedVariant!.price : itemToAdd.price,
        image: isProduct ? selectedVariant!.images[0] : itemToAdd.image,
        type: type,
        originalId: itemToAdd.id,
        ...(isProduct && { variantId: selectedVariant!.id }),
    };
    
    const existingItem = combinedCart.find(item => item.item.id === cartItemData.id);

    if (user && cartCollectionRef) {
      if (existingItem) {
        const docRef = doc(cartCollectionRef, existingItem.id);
        const newQuantity = existingItem.quantity + quantity;
        updateDocumentNonBlocking(docRef, { quantity: newQuantity });
      } else {
        const newCartItem = {
          itemId: itemToAdd.id,
          variantId: selectedVariant?.id || null,
          type: type,
          quantity: quantity,
        };
        addDocumentNonBlocking(cartCollectionRef, newCartItem);
      }
    } else {
      // Local cart logic
      setLocalCart(prevItems => {
        const existingLocalItem = prevItems.find(item => item.item.id === cartItemData.id);
        if (existingLocalItem) {
          return prevItems.map(item =>
            item.item.id === cartItemData.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        // For local cart, the 'id' of the cart item is the unique item id (variant or course)
        return [...prevItems, { id: cartItemData.id, item: cartItemData, type, quantity }];
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
        // For local cart, cartDocId is the item's unique id (variant or course id)
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

  const clearCart = async () => {
    if (user && cartCollectionRef && firestore) {
      const batch = writeBatch(firestore);
      const querySnapshot = await getDocs(cartCollectionRef);
      querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
      });
      await batch.commit();
    } else {
      setLocalCart([]);
    }
  };

  const hasOnlyDigitalItems = combinedCart.length > 0 && combinedCart.every(item => item.type === 'course');
  const cartCount = combinedCart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = combinedCart.reduce((total, item) => total + item.item.price * item.quantity, 0);

  const value = {
    cartItems: combinedCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isLoading: isUserLoading || (user && isCartLoading),
    hasOnlyDigitalItems,
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
