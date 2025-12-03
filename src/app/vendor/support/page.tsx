'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VendorSupportPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Help & Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
          <CardDescription>
            This is a placeholder for the seller support section. You will be able to raise tickets and get help here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Support features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
