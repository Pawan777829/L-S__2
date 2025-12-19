
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getCourseById, Course } from '@/lib/placeholder-data';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlaySquare, Lock } from 'lucide-react';
import AuthenticatedRouteGuard from '@/components/auth/authenticated-route-guard';

const curriculum = [
    { title: "Introduction to the Course", details: "1 video (12 min)", isLocked: false },
    { title: "Setting Up Your Development Environment", details: "2 videos (25 min)", isLocked: false },
    { title: "Core Concepts and Fundamentals", details: "5 videos (1 hr 15 min)", isLocked: false },
    { title: "Building Your First Project", details: "3 videos (45 min)", isLocked: true },
    { title: "Advanced Techniques", details: "4 videos (1 hr 30 min)", isLocked: true },
    { title: "Deployment and Final Project", details: "2 videos (20 min)", isLocked: true },
];

function CoursePlayerLoader() {
  return (
    <div className="p-4 md:p-8">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-8" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Skeleton className="w-full aspect-video rounded-lg" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}


export default function CoursePlayerPage() {
    const params = useParams();
    const { id } = params;
    const course = getCourseById(id as string);
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const enrollmentDocRef = useMemoFirebase(() => {
        if (!user || !id) return null;
        // This is a simplified lookup. A query `where('courseId', '==', id)` would be more robust.
        // For this example, we assume enrollment ID might match course ID for simplicity.
        return doc(firestore, 'users', user.uid, 'enrollments', id as string);
    }, [user, firestore, id]);

    const { data: enrollment, isLoading: isEnrollmentLoading } = useDoc(enrollmentDocRef);
    
    const isLoading = isUserLoading || isEnrollmentLoading;

    if (isLoading) {
        return <CoursePlayerLoader />;
    }

    if (!course) {
        return <p>Course not found.</p>;
    }
    
    // For now, we just check if an enrollment document exists.
    const isEnrolled = !!enrollment;

    return (
        <AuthenticatedRouteGuard>
            <div className="p-4 md:p-8">
                <h1 className="text-3xl font-bold font-headline">{course.name}</h1>
                <p className="text-muted-foreground mt-2">by {course.instructor}</p>

                <div className="grid lg:grid-cols-3 gap-8 mt-8">
                    <main className="lg:col-span-2">
                        <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
                            <PlaySquare size={64} />
                        </div>
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>About This Course</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{course.description}</p>
                            </CardContent>
                        </Card>
                    </main>
                    <aside>
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Content</CardTitle>
                            </CardHeader>
                            <CardContent>
                                 <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                                    {curriculum.map((item, index) => (
                                        <AccordionItem value={`item-${index}`} key={index}>
                                            <AccordionTrigger disabled={item.isLocked && !isEnrolled}>
                                                <div className="flex justify-between items-center w-full pr-4">
                                                    <span className="text-left">{item.title}</span>
                                                    {item.isLocked && !isEnrolled && <Lock className="h-4 w-4 ml-2 flex-shrink-0" />}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                               <p className="text-sm text-muted-foreground">{item.details}</p>
                                               <Button variant="link" className="px-0 h-auto mt-2">Watch Video</Button>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                         <Button className="w-full mt-4" size="lg">
                            <CheckCircle className="mr-2"/> Mark as Completed
                        </Button>
                    </aside>
                </div>
            </div>
        </AuthenticatedRouteGuard>
    );
}

