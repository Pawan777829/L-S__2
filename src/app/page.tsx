
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts, getCourses } from '@/lib/placeholder-data';
import ProductCard from '@/components/shared/product-card';
import CourseCard from '@/components/shared/course-card';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const featuredProducts = getProducts().slice(0, 4);
  const featuredCourses = getCourses().slice(0, 4);
  
  const { user: authUser, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [authUser, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);
  
  const isVendor = userProfile?.role === 'vendor';
  const isLoading = isUserLoading || isProfileLoading;


  const renderHeroButtons = () => {
    if (isLoading) {
      return (
        <div className="flex flex-wrap justify-center gap-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      );
    }
    
    if (isVendor) {
      return (
         <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/vendor/dashboard">Manage Your Store</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/vendor/products/new">Add New Product</Link>
          </Button>
           <Button asChild size="lg" variant="secondary">
            <Link href="/vendor/courses/new">Add New Course</Link>
          </Button>
        </div>
      )
    }

    return (
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/products">Explore Products</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/courses">Discover Courses</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/seed/hero/1920/1080"
          alt="Abstract background"
          fill
          className="z-0 object-cover"
          data-ai-hint="abstract background"
        />
        <div className="absolute inset-0 bg-primary/70 z-10" />
        <div className="relative z-20 container mx-auto px-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 drop-shadow-lg">
            Welcome to Learn & Shop
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Your unified marketplace for products and learning.
          </p>
          {renderHeroButtons()}
        </div>
      </section>

      <section id="recommended" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Recommended For You</h2>
            <p className="mt-2 text-muted-foreground">AI-powered suggestions based on your activity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {getProducts().slice(4, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {getCourses().slice(4, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">Check out our best-selling items.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="courses" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">Featured Courses</h2>
            <p className="mt-2 text-muted-foreground">Expand your knowledge with our top courses.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
