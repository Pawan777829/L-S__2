
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/placeholder-data';
import { useCart } from '@/lib/cart-context';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col group overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.image.aiHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <CardTitle className="text-base">{product.name}</CardTitle>
        </Link>
        <CardDescription className="mt-1 text-sm text-muted-foreground">
          By {product.vendor}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="font-semibold text-lg">₹{product.price.toFixed(2)}</p>
        <Button size="sm" onClick={() => addToCart(product, 'product')}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
