
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  mobile: z.string().regex(/^\d{10}$/, "Must be a valid 10-digit mobile number"),
  pincode: z.string().regex(/^\d{6}$/, "Must be a valid 6-digit pincode"),
  addressLine1: z.string().min(5, "House/Flat No. is required"),
  addressLine2: z.string().min(5, "Address is required"),
  landmark: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required").default("India"),
  alternateMobile: z.string().optional(),
});

export type AddressSchema = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (values: AddressSchema) => void;
  defaultValues?: Partial<AddressSchema>;
}

export function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || '',
      mobile: defaultValues?.mobile || '',
      pincode: defaultValues?.pincode || '',
      addressLine1: defaultValues?.addressLine1 || '',
      addressLine2: defaultValues?.addressLine2 || '',
      landmark: defaultValues?.landmark || '',
      city: defaultValues?.city || '',
      state: defaultValues?.state || '',
      country: defaultValues?.country || "India",
      alternateMobile: defaultValues?.alternateMobile || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl><Input placeholder="10-digit mobile number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House No., Building Name</FormLabel>
              <FormControl><Input placeholder="e.g. 123, Stark Tower" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Road Name, Area, Colony</FormLabel>
              <FormControl><Input placeholder="e.g. Main Street, Koramangala" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
            <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
                <FormItem className='flex-1'>
                <FormLabel>Pincode</FormLabel>
                <FormControl><Input placeholder="e.g. 560034" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
                <FormItem className='flex-1'>
                <FormLabel>City</FormLabel>
                <FormControl><Input placeholder="e.g. Bengaluru" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="flex gap-4">
            <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
                <FormItem className='flex-1'>
                <FormLabel>State</FormLabel>
                <FormControl><Input placeholder="e.g. Karnataka" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
                <FormItem className='flex-1'>
                <FormLabel>Country</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark (Optional)</FormLabel>
              <FormControl><Input placeholder="e.g. Near City Park" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="alternateMobile"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Alternate Mobile (Optional)</FormLabel>
                <FormControl><Input placeholder="Alternate 10-digit number" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <DialogFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Address'}
            </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

    