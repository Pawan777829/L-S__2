'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthenticatedRouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user data has loaded and there is no user, redirect to login.
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  // If the user is loading, show a loading state.
  if (isUserLoading) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If there is a user, render the children components.
  if (user) {
    return <>{children}</>;
  }

  // If not loading and no user, don't render anything (as it will redirect).
  return null;
}
