
'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/layout/logo';
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState, Suspense } from 'react';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

const learnerSchema = z.object({
  role: z.literal('learner'),
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const vendorSchema = z.object({
    role: z.literal('vendor'),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
    businessName: z.string().min(2, "Business name is required"),
    mobile: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
    gst: z.string().min(15, "GSTIN must be 15 characters").max(15),
    pan: z.string().min(10, "PAN must be 10 characters").max(10),
    bankDetails: z.string().min(10, "Please enter valid bank details"),
    pickupAddress: z.string().min(10, "Pickup address is required"),
});

const formSchema = z.discriminatedUnion("role", [learnerSchema, vendorSchema]);
type FormSchemaType = z.infer<typeof formSchema>;


function SignupFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user: authUser, isUserLoading } = useUser();
  
  const roleFromUrl = searchParams.get('role') === 'vendor' ? 'vendor' : 'learner';

  const userDocRef = useMemoFirebase(() => {
    if (!authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [authUser, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: roleFromUrl,
      email: '',
      password: '',
      ...(roleFromUrl === 'learner' ? { firstName: '', lastName: '' } : { 
        businessName: '', 
        mobile: '',
        gst: '',
        pan: '',
        bankDetails: '',
        pickupAddress: '',
      }),
    },
  });

  useEffect(() => {
    if (!isUserLoading && !isProfileLoading && authUser && userProfile) {
      const redirectTo = userProfile.role === 'vendor' ? '/vendor/dashboard' : '/account';
      router.push(redirectTo);
    }
  }, [authUser, userProfile, isUserLoading, isProfileLoading, router]);

  const onSubmit = async (values: FormSchemaType) => {
    if (!auth || !firestore) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const newUser = userCredential.user;
      
      const batch = writeBatch(firestore);

      if (values.role === 'learner') {
        const displayName = `${values.firstName} ${values.lastName}`.trim();
        await updateProfile(newUser, { displayName });

        const userRef = doc(firestore, 'users', newUser.uid);
        batch.set(userRef, {
            id: newUser.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            registrationDate: new Date().toISOString(),
            role: 'learner',
        });
      } else if (values.role === 'vendor') {
         await updateProfile(newUser, { displayName: values.businessName });

         const userRef = doc(firestore, 'users', newUser.uid);
         batch.set(userRef, {
            id: newUser.uid,
            firstName: values.businessName.split(' ')[0],
            lastName: values.businessName.split(' ').slice(1).join(' '),
            email: values.email,
            registrationDate: new Date().toISOString(),
            role: 'vendor',
            vendorId: newUser.uid, // Linking user to vendor document
         });
         
         const vendorRef = doc(firestore, 'vendors', newUser.uid);
         batch.set(vendorRef, {
            id: newUser.uid,
            name: values.businessName,
            contactEmail: values.email,
            mobile: values.mobile,
            gstin: values.gst,
            pan: values.pan,
            bankDetails: values.bankDetails,
            pickupAddress: values.pickupAddress,
            description: `Official store for ${values.businessName}`,
         });
      }

      await batch.commit();

      toast({
        title: 'Account Created',
        description: "You've been successfully signed up!",
      });

      // After commit, the redirect useEffect will handle navigation
      // But we can give it a nudge if needed, though it might be redundant.
      const redirectTo = values.role === 'vendor' ? '/vendor/dashboard' : '/account';
      router.push(redirectTo);


    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  if (isUserLoading || authUser) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center bg-background py-12">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Create Your Account</CardTitle>
          <CardDescription>
            {roleFromUrl === 'vendor' ? 'Create a vendor account to start selling' : 'Join Learn & Shop today!'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {roleFromUrl === 'learner' && (
                <>
                    <div className="flex gap-4">
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </>
              )}
              
              {roleFromUrl === 'vendor' && (
                <>
                    <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl><Input placeholder="Your Company LLC" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl><Input placeholder="9876543210" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gst"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>GSTIN</FormLabel>
                                    <FormControl><Input placeholder="15-digit GSTIN" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                     </div>
                      <FormField
                        control={form.control}
                        name="pan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PAN Number</FormLabel>
                                <FormControl><Input placeholder="10-digit PAN" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="bankDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Account Details</FormLabel>
                                <FormControl><Input placeholder="Account number, IFSC code" {...field} /></FormControl>
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
                                <FormControl><Textarea placeholder="Full address for product pickups" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
              )}


              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                 {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupFormComponent />
        </Suspense>
    )
}
