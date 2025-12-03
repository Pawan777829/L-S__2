'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VendorOffersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Offers & Promotions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Discounts</CardTitle>
          <CardDescription>
            This is a placeholder for creating and managing promotions like discounts and coupons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Promotion tools coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
