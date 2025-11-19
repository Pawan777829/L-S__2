
import Link from 'next/link';
import { GraduationCap, ShoppingBag } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
       <div className="relative h-7 w-7 text-primary">
        <ShoppingBag className="h-6 w-6" />
        <GraduationCap className="absolute -right-1 -bottom-1 h-4 w-4 text-primary fill-background" />
      </div>
      <span className="hidden font-bold sm:inline-block font-headline">
        Learn & Shop
      </span>
    </Link>
  );
}

    