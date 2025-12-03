'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VendorPaymentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Payments & Earnings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            This is a placeholder for viewing your payments and earnings. Payout details, transaction history, and reports will be available here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Payment details coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
