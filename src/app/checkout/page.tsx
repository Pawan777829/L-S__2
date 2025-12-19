
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthenticatedRouteGuard from '@/components/auth/authenticated-route-guard';
import { useCart } from '@/lib/cart-context';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Home, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddressForm, AddressSchema, addressSchema } from '@/components/shared/address-form';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface Address {
    id: string;
    fullName: string;
    mobile: string;
    addressLine1: string; // House No, etc.
    addressLine2: string; // Street, Area
    landmark?: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
}

function CheckoutLoader() {
  return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 font-headline">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                           <Skeleton className="h-16 w-full rounded-lg" />
                           <Skeleton className="h-12 w-48 rounded-lg" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Separator />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

function CheckoutPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const { cartItems, cartTotal, cartCount, isLoading: isCartLoading } = useCart();
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [isAddressDialogOpen, setAddressDialogOpen] = useState(false);
    const { toast } = useToast();

    const addressesCollectionRef = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, 'users', user.uid, 'addresses');
    }, [user, firestore]);

    const { data: addresses, isLoading: isAddressesLoading } = useCollection<Address>(addressesCollectionRef);

    const handleAddAddress = async (values: AddressSchema) => {
        if (!addressesCollectionRef) return;
        try {
            await addDoc(addressesCollectionRef, values);
            toast({ title: "Success", description: "New address has been saved." });
            setAddressDialogOpen(false);
        } catch (error: any) {
            toast({ variant: 'destructive', title: "Error", description: error.message });
        }
    };
    
    if (isCartLoading || isAddressesLoading) {
        return <CheckoutLoader />;
    }

    return (
        <AuthenticatedRouteGuard>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 font-headline">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Shipping Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Address</CardTitle>
                                <CardDescription>Select or add a new shipping address.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={selectedAddressId || undefined} onValueChange={setSelectedAddressId} className="space-y-4">
                                    {addresses && addresses.map(address => (
                                        <Label key={address.id} htmlFor={address.id} className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer ${selectedAddressId === address.id ? 'border-primary ring-2 ring-primary' : ''}`}>
                                            <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                                            <div className="text-sm">
                                                <p className="font-semibold">{address.fullName}</p>
                                                <p className="text-muted-foreground">{address.addressLine1}, {address.addressLine2}</p>
                                                <p className="text-muted-foreground">{address.city}, {address.state} - {address.pincode}</p>
                                                <p className="text-muted-foreground">Mobile: <span className="font-medium">{address.mobile}</span></p>
                                            </div>
                                        </Label>
                                    ))}
                                </RadioGroup>

                                <Dialog open={isAddressDialogOpen} onOpenChange={setAddressDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="mt-6">
                                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] flex flex-col">
                                        <DialogHeader>
                                            <DialogTitle>Add a new address</DialogTitle>
                                        </DialogHeader>
                                         <div className="flex-grow overflow-hidden">
                                            <ScrollArea className="h-full pr-6 -mr-6">
                                                <AddressForm onSubmit={handleAddAddress} />
                                            </ScrollArea>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                 {!addresses || addresses.length === 0 && (
                                     <div className="text-center py-8 text-muted-foreground">
                                        <Home className="mx-auto h-12 w-12" />
                                        <p className="mt-4">You have no saved addresses.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
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
                                    <Separator />
                                    <div className="flex justify-between font-medium">
                                        <span>Subtotal ({cartCount} items)</span>
                                        <span>₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                     <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <Separator />
                                     <div className="flex justify-between font-bold text-lg">
                                        <span>To Pay</span>
                                        <span>₹{cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                         <Button size="lg" className="w-full mt-6" disabled={!selectedAddressId || cartCount === 0}>
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedRouteGuard>
    );
}

export default CheckoutPage;
