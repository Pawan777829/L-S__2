
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, CartItem as CartItemType } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();
  const linkHref = item.type === 'product' ? `/products/${item.item.id}` : `/courses/${item.item.id}`;

  return (
    <div className="flex items-center gap-4 py-4">
      <Link href={linkHref} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.item.image.src}
          alt={item.item.image.alt}
          width={96}
          height={96}
          className="object-cover"
        />
      </Link>
      <div className="flex-grow">
         <Link href={linkHref}>
          <h3 className="font-semibold hover:underline">{item.item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">₹{item.item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.item.id, parseInt(e.target.value, 10))}
            className="h-9 w-20"
          />
          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.item.id)}>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
      <p className="font-semibold">₹{(item.item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
}

function CartLoader() {
 return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 font-headline">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-32" />
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-4">
                    <Skeleton className="h-24 w-24 rounded-md" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-24" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-9" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-28" />
              </div>
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cartItems, cartTotal, cartCount, isLoading } = useCart();

  if (isLoading) {
    return <CartLoader />;
  }

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold font-headline">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 font-headline">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{cartCount} {cartCount > 1 ? 'items' : 'item'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping & Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
