
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">My Wishlist</h1>
      <Card>
        <CardHeader>
          <CardTitle>Saved Items</CardTitle>
          <CardDescription>Your favorite products and courses, all in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Heart className="mx-auto h-16 w-16" />
            <p className="mt-4">Your wishlist is empty.</p>
            <p className="text-sm">Add items you love to your wishlist to save them for later.</p>
             <Button asChild variant="link" className="mt-2">
                <Link href="/products">Explore Products</Link>
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
