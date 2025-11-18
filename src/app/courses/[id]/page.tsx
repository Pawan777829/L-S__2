'use client';

import { useParams } from 'next/navigation';
import { getCourseById, getCourses, Course } from '@/lib/placeholder-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, Clock, BookOpen, User, CheckCircle } from 'lucide-react';
import CourseCard from '@/components/shared/course-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const curriculum = [
    { title: "Introduction", details: "1 video (12 min)", locked: false },
    { title: "Setting Up Your Environment", details: "2 videos (25 min)", locked: false },
    { title: "Core Concepts", details: "5 videos (1 hr 15 min)", locked: true },
    { title: "Building a Project", details: "3 videos (45 min)", locked: true },
    { title: "Deployment", details: "2 videos (20 min)", locked: true },
]


function CoursePageLoader() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="w-full aspect-video rounded-lg" />
           <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function CoursePage() {
  const params = useParams();
  const { id } = params;
  const course = getCourseById(id as string);
  const relatedCourses = getCourses().filter(c => c.id !== id).slice(0, 2);

  const { addToCart } = useCart();

  if (!course) {
    return <CoursePageLoader />;
  }

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-x-12 items-start">
          {/* Left Column - Course Details */}
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-primary mb-2">Online Course</p>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">
              {course.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
            
            <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold">4.7</span>
                    <span className="text-sm text-muted-foreground">(3,450 ratings)</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>12,890 students</span>
                </div>
            </div>
             <p className="text-sm text-muted-foreground mt-2">
                Created by <span className="font-medium text-foreground">{course.instructor}</span>
            </p>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg mt-8">
              <Image
                src={course.image.src}
                alt={course.image.alt}
                fill
                className="object-cover"
                data-ai-hint={course.image.aiHint}
              />
            </div>
            
            <Card className="my-8">
                <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" /><span>Build modern, fast, and scalable web applications.</span></li>
                        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" /><span>Master advanced state management techniques.</span></li>
                        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" /><span>Learn to deploy your applications to the cloud.</span></li>
                        <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" /><span>Understand best practices for modern development.</span></li>
                    </ul>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold font-headline mb-4">Course content</h2>
            <Accordion type="single" collapsible className="w-full">
                {curriculum.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>
                            <div className="flex justify-between w-full pr-4">
                                <span>{item.title}</span>
                                <span className="text-muted-foreground text-sm">{item.details}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           {item.locked ? "Purchase the course to unlock this content." : "Detailed content for this section goes here."}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>

          {/* Right Column - Purchase Card */}
          <div className="sticky top-24">
            <Card className="shadow-2xl">
                 <CardHeader>
                    <p className="text-4xl font-bold font-headline">${course.price.toFixed(2)}</p>
                </CardHeader>
                <CardContent>
                    <Button size="lg" onClick={() => addToCart(course, 'course')} className="w-full">
                        Enroll Now
                    </Button>
                     <Button size="lg" variant="outline" className="w-full mt-2">
                        Add to Cart
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">30-Day Money-Back Guarantee</p>
                    <Separator className="my-4" />
                    <h3 className="font-semibold mb-2">This course includes:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-3"><Clock /><span>8.5 hours on-demand video</span></li>
                        <li className="flex items-center gap-3"><BookOpen /><span>12 articles & resources</span></li>
                    </ul>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Courses Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Related Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
             {relatedCourses.length === 0 && <p>No related courses found.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
