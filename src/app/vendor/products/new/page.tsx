'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AddProductForm } from '../add-product-form';
import { useUser, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection } from 'firebase/firestore';

export default function AddProductPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleAddProduct = async (data: any) => {
    if (!user || !firestore) return;

    try {
      const productsCollection = collection(firestore, 'products');
      await addDoc(productsCollection, {
        ...data,
        vendorId: user.uid,
        vendor: user.displayName, // Assuming vendor name is user's display name
      });
      
      toast({
        title: 'Product Added',
        description: `${data.name} has been successfully added to your store.`,
      });
      router.push('/vendor/products');
    } catch (error: any) {
      console.error("Error adding product: ", error);
      toast({
        variant: 'destructive',
        title: 'Failed to add product',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Add a New Product</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Fill out the form below to add a new product to your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddProductForm onSubmit={handleAddProduct} />
        </CardContent>
      </Card>
    </div>
  );
}
