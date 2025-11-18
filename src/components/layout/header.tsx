import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SearchBar } from '@/components/shared/search-bar';
import { CartIcon } from '@/components/shared/cart-icon';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

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
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">User Account</span>
              </Link>
            </Button>
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
