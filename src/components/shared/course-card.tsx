import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/placeholder-data';
import { ArrowRight } from 'lucide-react';

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/courses/${course.id}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
            <Image
              src={course.image.src}
              alt={course.image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={course.image.aiHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle>{course.name}</CardTitle>
         <CardDescription className="mt-2 text-sm text-muted-foreground">
          By {course.instructor}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="font-semibold text-lg">${course.price.toFixed(2)}</p>
        <Button size="sm" variant="outline" asChild>
          <Link href={`/courses/${course.id}`}>
            View Course
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
