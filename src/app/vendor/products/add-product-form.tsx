'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  category: z.enum(['Office Furniture', 'Electronics', 'Accessories']),
  highlights: z.array(z.object({ value: z.string().min(1, 'Highlight cannot be empty.') })).min(1, 'At least one highlight is required.'),
  specifications: z.array(z.object({
    name: z.string().min(1, 'Spec name cannot be empty.'),
    value: z.string().min(1, 'Spec value cannot be empty.'),
  })).min(1),
  variants: z.array(z.object({
    color: z.string().min(1, 'Color is required.'),
    mrp: z.coerce.number().positive('MRP must be positive.'),
    price: z.coerce.number().positive('Price must be positive.'),
    stock: z.coerce.number().int().nonnegative('Stock must be a non-negative integer.'),
    images: z.array(z.object({
        src: z.string().url('Must be a valid URL.'),
        alt: z.string().min(1, 'Alt text is required.'),
    })).min(1, "At least one image is required."),
  })).min(1, 'At least one product variant is required.'),
  offers: z.array(z.object({ value: z.string() })).optional(),
  services: z.object({
    warranty: z.string().min(1, 'Warranty info is required.'),
    returnPolicy: z.string().min(1, 'Return policy is required.'),
  }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductFormProps {
  onSubmit: (data: ProductFormValues) => Promise<void>;
}

export function AddProductForm({ onSubmit }: AddProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'Office Furniture',
      highlights: [{ value: '' }],
      specifications: [{ name: '', value: '' }],
      variants: [{ color: '', mrp: 0, price: 0, stock: 0, images: [{src: '', alt: ''}] }],
      offers: [],
      services: { warranty: '', returnPolicy: '' },
    },
  });

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
    control: form.control,
    name: 'highlights',
  });

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control: form.control,
    name: 'specifications',
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Office Furniture">Office Furniture</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Highlights */}
        <div>
          <FormLabel>Highlights</FormLabel>
           <FormDescription>Key features of your product.</FormDescription>
          <div className="space-y-4 mt-2">
            {highlightFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`highlights.${index}.value`}
                  render={({ field }) => (
                     <FormItem className="flex-grow">
                        <FormControl><Input {...field} placeholder={`Highlight ${index + 1}`} /></FormControl>
                         <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeHighlight(index)} disabled={highlightFields.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
             <Button type="button" variant="outline" size="sm" onClick={() => appendHighlight({ value: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Highlight
            </Button>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <FormLabel>Specifications</FormLabel>
           <FormDescription>Detailed technical specs.</FormDescription>
          <div className="space-y-4 mt-2">
            {specFields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-2">
                <FormField
                  control={form.control}
                  name={`specifications.${index}.name`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormControl><Input {...field} placeholder="Spec Name (e.g. Weight)" /></FormControl>
                         <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specifications.${index}.value`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormControl><Input {...field} placeholder="Spec Value (e.g. 15kg)" /></FormControl>
                         <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeSpec(index)} disabled={specFields.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => appendSpec({ name: '', value: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Specification
            </Button>
          </div>
        </div>
        
         {/* Services */}
        <div className="grid grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="services.warranty"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Warranty</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g. 1 Year Warranty" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="services.returnPolicy"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Return Policy</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g. 10 Days Replacement" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        {/* Variants */}
        <div className="space-y-6">
            <FormLabel>Product Variants</FormLabel>
            <FormDescription>Add different versions of your product, like colors or sizes.</FormDescription>
            {variantFields.map((variant, index) => (
                <Card key={variant.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Variant {index + 1}</CardTitle>
                         <Button type="button" variant="ghost" size="sm" onClick={() => removeVariant(index)} disabled={variantFields.length <= 1}>
                            Remove Variant
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name={`variants.${index}.color`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl><Input {...field} placeholder="e.g. Black" /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-3 gap-4">
                             <FormField
                                control={form.control}
                                name={`variants.${index}.mrp`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>MRP (₹)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`variants.${index}.price`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Selling Price (₹)</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`variants.${index}.stock`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                         <ImageFields control={form.control} variantIndex={index} />
                    </CardContent>
                </Card>
            ))}
             <Button type="button" variant="outline" onClick={() => appendVariant({ color: '', mrp: 0, price: 0, stock: 0, images: [{src: '', alt: ''}] })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Another Variant
            </Button>
        </div>


        <Button type="submit" disabled={form.formState.isSubmitting} size="lg">
          {form.formState.isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}


function ImageFields({ control, variantIndex }: { control: any, variantIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variantIndex}.images`,
  });

  return (
    <div className="space-y-4">
      <FormLabel>Images</FormLabel>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-2 rounded-md border p-4">
            <div className="flex justify-end">
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            <FormField
                control={control}
                name={`variants.${variantIndex}.images.${index}.src`}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl><Input {...field} placeholder="https://example.com/image.png" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={control}
                name={`variants.${variantIndex}.images.${index}.alt`}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl><Input {...field} placeholder="Description of the image" /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ src: '', alt: '' })}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Image
      </Button>
    </div>
  );
}
