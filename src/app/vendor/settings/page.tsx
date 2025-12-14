
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const vendorSettingsSchema = z.object({
    name: z.string().min(2, "Business name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    contactEmail: z.string().email(),
    mobile: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
    gstin: z.string().min(15, "GSTIN must be 15 characters").max(15),
    pan: z.string().min(10, "PAN must be 10 characters").max(10),
    bankDetails: z.string().min(10, "Please enter valid bank details"),
    pickupAddress: z.string().min(10, "Pickup address is required"),
});

type VendorSettingsFormValues = z.infer<typeof vendorSettingsSchema>;

interface VendorProfile {
    id: string;
    name: string;
    description: string;
    contactEmail: string;
    mobile: string;
    gstin: string;
    pan: string;
    bankDetails: string;
    pickupAddress: string;
}

function SettingsLoader() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-20 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
        </div>
    )
}

export default function VendorSettingsPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    const vendorDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'vendors', user.uid);
    }, [user, firestore]);

    const { data: vendorProfile, isLoading: isProfileLoading } = useDoc<VendorProfile>(vendorDocRef);

    const form = useForm<VendorSettingsFormValues>({
        resolver: zodResolver(vendorSettingsSchema),
        defaultValues: {
            name: '',
            description: '',
            contactEmail: '',
            mobile: '',
            gstin: '',
            pan: '',
            bankDetails: '',
            pickupAddress: '',
        },
    });

    useEffect(() => {
        if (vendorProfile) {
            form.reset(vendorProfile);
        }
    }, [vendorProfile, form]);

    const onSubmit = async (values: VendorSettingsFormValues) => {
        if (!vendorDocRef) return;

        try {
            await setDoc(vendorDocRef, values, { merge: true });
            toast({
                title: "Profile Updated",
                description: "Your store profile has been successfully updated.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: error.message || "Could not update your store profile.",
            });
        }
    };

    const isLoading = isUserLoading || isProfileLoading;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 font-headline">Store Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Profile & Information</CardTitle>
                    <CardDescription>
                        Manage your store settings, including business details, bank information, and addresses.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? <SettingsLoader /> : (
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Name</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Description</FormLabel>
                                            <FormControl><Textarea {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="contactEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Email</FormLabel>
                                                <FormControl><Input type="email" {...field} disabled /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mobile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mobile</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="gstin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>GSTIN</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>PAN</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="bankDetails"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bank Account Details</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pickupAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pickup Address</FormLabel>
                                            <FormControl><Textarea {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
