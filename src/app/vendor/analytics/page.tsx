'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VendorAnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Analytics & Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Sales Reports</CardTitle>
          <CardDescription>
            This is a placeholder for viewing detailed sales analytics and generating reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Analytics graphs and reports coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
