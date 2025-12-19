'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthenticatedRouteGuard from '@/components/auth/authenticated-route-guard';
import { useCart } from '@/lib/cart-context';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { collection, doc, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import type { Address } from '@/app/checkout/page';
import { CheckoutStepper } from '@/components/shared/checkout-stepper';

function SummaryPageLoader() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-8 w-full max-w-md mx-auto" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

function OrderSummaryContent() {
    const { user } = useUser();
    const firestore = useFirestore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { cartItems, cartTotal, cartCount, clearCart, isLoading: isCartLoading } = useCart();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const { toast } = useToast();

    const addressId = searchParams.get('addressId');

    const addressDocRef = useMemoFirebase(() => {
        if (!user || !addressId) return null;
        return doc(firestore, 'users', user.uid, 'addresses', addressId);
    }, [user, firestore, addressId]);

    const { data: selectedAddress, isLoading: isAddressLoading } = useDoc<Address>(addressDocRef);
    
    useEffect(() => {
        if(!isAddressLoading && !selectedAddress) {
             toast({ variant: 'destructive', title: "Error", description: "Selected address not found." });
             router.push('/checkout');
        }
    }, [isAddressLoading, selectedAddress, router, toast])


    const handlePlaceOrder = async () => {
        if (!user || !selectedAddress || cartCount === 0) return;
        
        setIsPlacingOrder(true);

        const orderData = {
            userId: user.uid,
            shippingAddress: selectedAddress,
            items: cartItems.map(item => ({ 
                itemId: item.item.originalId,
                variantId: item.item.variantId,
                name: item.item.name,
                price: item.item.price,
                quantity: item.quantity,
                type: item.type,
             })),
            total: cartTotal,
            status: 'Processing',
            date: new Date().toISOString(),
        };

        try {
            const ordersCollectionRef = collection(firestore, 'users', user.uid, 'orders');
            await addDoc(ordersCollectionRef, orderData);
            
            await clearCart();

            toast({
                title: "Order Placed!",
                description: "Thank you for your purchase.",
            });

            router.push('/account/orders');

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Order Failed",
                description: error.message || "Could not place your order.",
            });
             setIsPlacingOrder(false);
        }
    };
    
    const pageIsLoading = isCartLoading || isAddressLoading;

    if(pageIsLoading) {
        return <SummaryPageLoader />;
    }

    return (
        <AuthenticatedRouteGuard>
            <div className="container mx-auto px-4 py-12">
                <CheckoutStepper currentStep="summary" />
                <div className="space-y-6 mt-8">
                     {selectedAddress && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Deliver to:</CardTitle>
                                    <CardDescription className="font-semibold text-foreground">{selectedAddress.fullName}</CardDescription>
                                </div>
                                <Button variant="outline" onClick={() => router.push('/checkout')}>Change</Button>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {selectedAddress.addressLine1}, {selectedAddress.addressLine2}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                                </p>
                            </CardContent>
                        </Card>
                     )}
                     
                    <Card>
                        <CardHeader>
                            <CardTitle>Items ({cartCount})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 text-sm">
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                            <Image src={item.item.image.src} alt={item.item.image.alt} fill className="object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-medium truncate">{item.item.name}</p>
                                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">₹{(item.item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            {/* Bottom Continue Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex items-center justify-between">
                 <div>
                    <p className="text-lg font-bold">₹{cartTotal.toFixed(2)}</p>
                    <p className="text-xs text-primary underline cursor-pointer">View price details</p>
                 </div>
                 <Button size="lg" disabled={cartCount === 0 || isPlacingOrder} onClick={handlePlaceOrder}>
                    {isPlacingOrder ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Placing Order...</> : 'Continue to Payment'}
                </Button>
            </div>
        </AuthenticatedRouteGuard>
    )
}

export default function OrderSummaryPage() {
    return (
        <Suspense fallback={<SummaryPageLoader />}>
            <OrderSummaryContent />
        </Suspense>
    )
}
