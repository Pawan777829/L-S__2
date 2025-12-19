'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AddCourseForm } from '../add-course-form';
import { useUser, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection } from 'firebase/firestore';

export default function AddCoursePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleAddCourse = async (data: any) => {
    if (!user || !firestore) return;

    try {
      const coursesCollection = collection(firestore, 'courses');
      await addDoc(coursesCollection, {
        ...data,
        vendorId: user.uid,
        instructor: user.displayName, // Assuming vendor name is user's display name
      });
      
      toast({
        title: 'Course Added',
        description: `${data.name} has been successfully added to your store.`,
      });
      router.push('/vendor/courses');
    } catch (error: any) {
      console.error("Error adding course: ", error);
      toast({
        variant: 'destructive',
        title: 'Failed to add course',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">Add a New Course</h1>
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
          <CardDescription>
            Fill out the form below to add a new course to your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddCourseForm onSubmit={handleAddCourse} />
        </CardContent>
      </Card>
    </div>
  );
}
