'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VendorSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Store Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile & Information</CardTitle>
          <CardDescription>
            This is a placeholder for managing your store settings, including business details, bank information, and addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings management coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
