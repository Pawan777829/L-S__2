
'use client';

import { useParams } from 'next/navigation';
import { getProductById, getProducts, Product } from '@/lib/placeholder-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '@/components/shared/product-card';
import { Skeleton } from '@/components/ui/skeleton';

function ProductPageLoader() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Skeleton className="w-full aspect-square rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-12 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const product = getProductById(id as string);
  const relatedProducts = getProducts().filter(p => p.id !== id).slice(0, 4);

  const { addToCart } = useCart();

  if (!product) {
    return <ProductPageLoader />;
  }

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              data-ai-hint={product.image.aiHint}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-primary cursor-pointer hover:underline">
                By {product.vendor}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-headline mt-1">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(1,289 reviews)</span>
            </div>

            <Separator />
            
            <div>
                <p className="text-4xl font-bold font-headline">${product.price.toFixed(2)}</p>
                <p className="text-sm text-green-600 font-semibold mt-1">Special price</p>
            </div>

            <Button size="lg" onClick={() => addToCart(product, 'product')} className="w-full md:w-auto">
              <ShoppingCart className="mr-2" /> Add to Cart
            </Button>

            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              {product.description}
            </p>

             <Card className="mt-4">
                <CardContent className="p-4 space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <span>Standard Delivery by tomorrow</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                        <span>1 Year Brand Warranty</span>
                    </div>
                </CardContent>
            </Card>

          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
