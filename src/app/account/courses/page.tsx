
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
import Image from 'next/image';


interface Enrollment {
  id: string;
  courseId: string;
  progress: number;
}

interface EnrolledCourse extends Course {
  progress: number;
  enrollmentId: string;
}

function EnrolledCoursesLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
            <Skeleton className="h-40 w-full rounded-t-lg" />
            <CardContent className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-2 w-full mt-2" />
                <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
        </Card>
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
            progress: enrollment.progress,
            enrollmentId: enrollment.id,
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
      <h1 className="text-3xl font-bold mb-8 font-headline">My Learning Dashboard</h1>
       <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>Continue your learning journey and build new skills.</CardDescription>
        </CardHeader>
        <CardContent>
          {pageIsLoading ? (
            <EnrolledCoursesLoader />
          ) : enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                    <Card key={course.enrollmentId} className="flex flex-col">
                        <div className="relative aspect-video w-full">
                            <Image src={course.image.src} alt={course.image.alt} fill className="rounded-t-lg object-cover" />
                        </div>
                        <CardContent className="p-4 flex-grow flex flex-col">
                            <h3 className="font-semibold text-lg flex-grow">{course.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
                            <div className="mt-4">
                                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                            </div>
                        </CardContent>
                        <div className="p-4 pt-0">
                             <Button asChild className="w-full">
                                <Link href={`/account/courses/${course.id}`}>
                                    {course.progress > 0 ? 'Continue Learning' : 'Start Learning'} <PlayCircle className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <GraduationCap className="mx-auto h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">You are not enrolled in any courses yet.</p>
              <p className="text-sm text-muted-foreground">Once you purchase a course, it will appear here.</p>
              <Button asChild variant="default" className="mt-6">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
