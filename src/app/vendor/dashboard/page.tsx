import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VendorDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 font-headline">Vendor Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Vendor!</CardTitle>
          <CardDescription>This is a placeholder for your dashboard where you can manage products, courses, and view sales analytics.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>Add Product</Button>
          <Button variant="secondary">Add Course</Button>
        </CardContent>
      </Card>
    </div>
  );
}
