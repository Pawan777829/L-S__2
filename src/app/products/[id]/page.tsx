
'use client';

import { useParams } from 'next/navigation';
import { getProductById, Product, ProductVariant } from '@/lib/placeholder-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, ShieldCheck, Truck, Tag, Check } from 'lucide-react';
import ProductCard from '@/components/shared/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

function ProductPageLoader() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="grid grid-cols-5 gap-2">
            <Skeleton className="aspect-square w-full rounded" />
            <Skeleton className="aspect-square w-full rounded" />
            <Skeleton className="aspect-square w-full rounded" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
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

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(product?.variants[0]?.id || null);

  const { addToCart } = useCart();

  const selectedVariant = useMemo(() => {
    return product?.variants.find(v => v.id === selectedVariantId) || product?.variants[0];
  }, [product, selectedVariantId]);

  const [activeImage, setActiveImage] = useState(selectedVariant?.images[0]);

  if (!product || !selectedVariant) {
    return <ProductPageLoader />;
  }

  const discount = Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100);

  const handleVariantChange = (variantId: string) => {
    const newVariant = product.variants.find(v => v.id === variantId);
    if (newVariant) {
      setSelectedVariantId(variantId);
      setActiveImage(newVariant.images[0]);
    }
  }

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="grid grid-cols-1 gap-4 sticky top-24">
             <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src={activeImage?.src || product.variants[0].images[0].src}
                alt={activeImage?.alt || product.variants[0].images[0].alt}
                fill
                className="object-cover"
                data-ai-hint={activeImage?.aiHint || product.variants[0].images[0].aiHint}
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {selectedVariant.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "relative aspect-square w-full rounded-md border-2 overflow-hidden",
                    image.src === activeImage?.src ? "border-primary" : "border-border"
                  )}
                  onClick={() => setActiveImage(image)}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
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

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge>4.5 <Star className="h-3 w-3 ml-1" /></Badge>
                <span className="text-sm text-muted-foreground">(1,289 reviews)</span>
              </div>
            </div>

            <Separator />
            
            <div>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-bold font-headline">₹{selectedVariant.price.toFixed(2)}</p>
                <p className="text-xl text-muted-foreground line-through">₹{selectedVariant.mrp.toFixed(2)}</p>
                <p className="text-xl font-bold text-green-600">{discount}% off</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Inclusive of all taxes</p>
            </div>
            
            {/* Variants */}
            {product.variants.length > 1 && (
              <div>
                <Label className="text-base font-semibold">Color</Label>
                <RadioGroup
                  value={selectedVariantId || ''}
                  onValueChange={handleVariantChange}
                  className="flex gap-2 mt-2"
                >
                  {product.variants.map((variant) => (
                    <Label
                      key={variant.id}
                      htmlFor={variant.id}
                      className={cn(
                        "flex items-center justify-center rounded-md border-2 p-1 cursor-pointer",
                        selectedVariantId === variant.id ? "border-primary" : "border-muted"
                      )}
                    >
                       <RadioGroupItem value={variant.id} id={variant.id} className="sr-only" />
                       <Image src={variant.images[0].src} alt={variant.color} width={40} height={40} className="rounded-sm object-cover aspect-square"/>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}


            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                 <Button size="lg" onClick={() => addToCart({ ...product, price: selectedVariant.price }, 'product')} className="flex-1">
                    <ShoppingCart className="mr-2" /> Add to Cart
                </Button>
                 <Button size="lg" variant="secondary" className="flex-1">Buy Now</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Available Offers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    {product.offers.map((offer, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <Tag className="h-4 w-4 mt-0.5 text-primary flex-shrink-0"/>
                            <p>
                                <span className="font-semibold">Bank Offer:</span> {offer} <span className="text-primary font-semibold cursor-pointer">T&C</span>
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4 text-center mt-2">
                <div className="flex flex-col items-center gap-2">
                    <Truck className="h-8 w-8 text-muted-foreground"/>
                    <span className="text-xs text-muted-foreground">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-8 w-8 text-muted-foreground"/>
                    <span className="text-xs text-muted-foreground">{product.services.returnPolicy}</span>
                </div>
            </div>

            <Separator className="my-4"/>

            <div>
                <h3 className="font-bold text-lg font-headline mb-2">Highlights</h3>
                <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                    {product.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))}
                </ul>
            </div>
            
             <Separator className="my-4"/>

            <div>
                <h3 className="font-bold text-lg font-headline mb-2">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                </p>
            </div>

            <Separator className="my-4"/>

            <div>
                <h3 className="font-bold text-lg font-headline mb-4">Specifications</h3>
                <table className="w-full text-sm">
                    <tbody>
                        {product.specifications.map((spec, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 text-muted-foreground w-1/3">{spec.name}</td>
                                <td className="py-2">{spec.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
