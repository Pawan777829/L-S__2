'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/layout/logo';
import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SearchBar } from '@/components/shared/search-bar';
import { CartIcon } from '@/components/shared/cart-icon';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { User as UserIcon, LogOut, LayoutDashboard, ShoppingCart, GraduationCap, User as ProfileIcon } from 'lucide-react';


function UserNav() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Signed Out',
        description: "You have been successfully signed out.",
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: "There was an error signing out.",
      });
    }
  };
  
  if (isUserLoading) {
    return null;
  }

  if (!user) {
    return (
       <Button asChild>
          <Link href="/login">
            <UserIcon className="mr-2 h-4 w-4" /> Login
          </Link>
        </Button>
    );
  }

  const userInitial = user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/account')}>
          <ProfileIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/account/orders')}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span>Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/account/courses')}>
           <GraduationCap className="mr-2 h-4 w-4" />
          <span>My Courses</span>
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => router.push('/vendor/dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Vendor Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
           <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Logo />
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex flex-1 max-w-sm">
            <SearchBar />
          </div>
          <nav className="flex items-center space-x-2">
            <CartIcon />
            <UserNav />
            <MobileNav />
          </nav>
        </div>
      </div>
      <div className="md:hidden p-4 border-t">
        <SearchBar />
      </div>
    </header>
  );
}
