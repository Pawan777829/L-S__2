'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VendorProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Manage Products</h1>
        <Button asChild>
          <Link href="/vendor/products/new">Add New Product</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            This is a placeholder for managing your products. Functionality to add, edit, and view products will be implemented here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Product management table or grid will go here */}
          <p className="text-muted-foreground">Product list coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
