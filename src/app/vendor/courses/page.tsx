'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VendorCoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Manage Courses</h1>
        <Button asChild>
          <Link href="/vendor/courses/new">Add New Course</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>
            This is a placeholder for managing your courses. Functionality to add, edit, and view courses will be implemented here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Course list coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
