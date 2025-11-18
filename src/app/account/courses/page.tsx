import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const enrolledCourses = [
  { id: 'course-1', name: 'Intro to Web Development', progress: 75 },
  { id: 'course-2', name: 'Advanced React Patterns', progress: 20 },
];

export default function EnrolledCoursesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-headline">My Courses</h1>
       <Card>
        <CardHeader>
          <CardTitle>Enrolled Courses</CardTitle>
          <CardDescription>Continue your learning journey.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {enrolledCourses.map((course) => (
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
          ))}
           {enrolledCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
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
