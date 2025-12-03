
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, PlusCircle } from 'lucide-react';

export default function AddressesPage() {

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">My Addresses</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Addresses</CardTitle>
          <CardDescription>Add, edit, or remove your shipping addresses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Home className="mx-auto h-12 w-12" />
            <p className="mt-4">You have no saved addresses.</p>
            <p className="text-sm">Adding an address allows for faster checkout.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
