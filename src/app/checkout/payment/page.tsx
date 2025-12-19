'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AuthenticatedRouteGuard from '@/components/auth/authenticated-route-guard';
import { useCart } from '@/lib/cart-context';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CheckoutStepper } from '@/components/shared/checkout-stepper';
import { ArrowLeft, CreditCard, Landmark, Wallet, Percent, Truck, Loader2 } from 'lucide-react';

function PaymentPageContent() {
    const { user } = useUser();
    const firestore = useFirestore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { cartItems, cartTotal, cartCount, clearCart, isLoading: isCartLoading } = useCart();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const { toast } = useToast();

    const addressId = searchParams.get('addressId');

    const handlePlaceOrder = async () => {
        if (!user || !addressId || cartCount === 0 || !selectedPaymentMethod) {
             toast({
                variant: 'destructive',
                title: "Error",
                description: "Please select a payment method.",
            });
            return;
        }
        
        setIsPlacingOrder(true);

        const orderData = {
            userId: user.uid,
            addressId: addressId,
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
            paymentMethod: selectedPaymentMethod,
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

    return (
        <AuthenticatedRouteGuard>
            <div className="container mx-auto px-4 py-12 max-w-2xl">
                 <CheckoutStepper currentStep="payment" />
                 <div className="mt-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Choose Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full" onValueChange={setSelectedPaymentMethod}>
                                <AccordionItem value="upi">
                                    <AccordionTrigger className="font-semibold"><Wallet className="mr-2" /> UPI</AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-4">
                                        <p className="text-sm font-semibold">Enter your UPI ID</p>
                                        <Input placeholder="yourname@bank" />
                                         <Button className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                                             {isPlacingOrder ? <Loader2 className="animate-spin" /> : `Pay ₹${cartTotal.toFixed(2)}`}
                                        </Button>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="card">
                                    <AccordionTrigger className="font-semibold"><CreditCard className="mr-2" /> Credit/Debit Card</AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-4">
                                        <Input placeholder="Card Number" />
                                        <div className="flex gap-4">
                                            <Input placeholder="MM/YY" />
                                            <Input placeholder="CVV" />
                                        </div>
                                        <Input placeholder="Name on Card" />
                                         <Button className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                                             {isPlacingOrder ? <Loader2 className="animate-spin" /> : `Pay ₹${cartTotal.toFixed(2)}`}
                                        </Button>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="netbanking">
                                    <AccordionTrigger className="font-semibold"><Landmark className="mr-2" /> Net Banking</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-sm text-muted-foreground">This feature is coming soon.</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="emi">
                                    <AccordionTrigger className="font-semibold"><Percent className="mr-2" /> EMI</AccordionTrigger>
                                     <AccordionContent>
                                        <p className="text-sm text-muted-foreground">This feature is coming soon.</p>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="cod">
                                    <AccordionTrigger className="font-semibold"><Truck className="mr-2" /> Cash on Delivery</AccordionTrigger>
                                    <AccordionContent className="pt-4">
                                         <Button className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                                             {isPlacingOrder ? <Loader2 className="animate-spin" /> : `Place Order (COD)`}
                                        </Button>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                     </Card>
                 </div>
            </div>
             {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex items-center justify-between md:hidden">
                 <div>
                    <p className="text-lg font-bold">₹{cartTotal.toFixed(2)}</p>
                    <p className="text-xs text-primary underline cursor-pointer">View price details</p>
                 </div>
                 <Button size="lg" disabled={!selectedPaymentMethod || cartCount === 0 || isPlacingOrder} onClick={handlePlaceOrder}>
                    {isPlacingOrder ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Placing...</> : 'Place Order'}
                </Button>
            </div>
        </AuthenticatedRouteGuard>
    )
}

export default function PaymentPage() {
    return (
        <Suspense>
            <PaymentPageContent />
        </Suspense>
    )
}
