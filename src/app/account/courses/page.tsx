
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle, GraduationCap } from 'lucide-react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getCourseById, Course } from '@/lib/placeholder-data';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


interface Enrollment {
  id: string;
  courseId: string;
  progress: number;
}

interface EnrolledCourse extends Course {
  progress: number;
}

function EnrolledCoursesLoader() {
  return (
    <div className="space-y-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-2 w-full mt-3" />
        </div>
      ))}
    </div>
  );
}

export default function EnrolledCoursesPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const enrollmentsCollectionRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, 'users', user.uid, 'enrollments');
  }, [user, firestore]);

  const { data: enrollments, isLoading: enrollmentsLoading } = useCollection<Enrollment>(enrollmentsCollectionRef);

  useEffect(() => {
    if (!enrollmentsLoading && enrollments) {
      const courses = enrollments.map(enrollment => {
        const courseDetails = getCourseById(enrollment.courseId);
        if (courseDetails) {
          return {
            ...courseDetails,
            progress: enrollment.progress
          };
        }
        return null;
      }).filter((course): course is EnrolledCourse => course !== null);
      
      setEnrolledCourses(courses);
      setIsLoading(false);
    } else if(!enrollmentsLoading && !enrollments) {
      setIsLoading(false);
    }
  }, [enrollments, enrollmentsLoading]);

  const pageIsLoading = isUserLoading || isLoading;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">My Courses</h1>
       <Card>
        <CardHeader>
          <CardTitle>Enrolled Courses</CardTitle>
          <CardDescription>Continue your learning journey.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pageIsLoading ? (
            <EnrolledCoursesLoader />
          ) : enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                      <div>
                          <h3 className="font-semibold">{course.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{course.progress}% complete</p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                          <Link href={`/courses/${course.id}`}>
                              <PlayCircle />
                              <span className="sr-only">Continue Course</span>
                          </Link>
                      </Button>
                  </div>
                  <Progress value={course.progress} className="mt-2 h-2" />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">You are not enrolled in any courses yet.</p>
              <Button asChild variant="link" className="mt-2">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
