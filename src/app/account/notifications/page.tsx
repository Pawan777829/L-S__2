
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Alerts</CardTitle>
          <CardDescription>Stay updated on orders, offers, and more.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="mx-auto h-16 w-16" />
            <p className="mt-4">You have no new notifications.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
