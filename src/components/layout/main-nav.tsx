
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// This component is no longer used in the header but kept in case it's needed elsewhere.
const navItems = [
  { href: '/products', label: 'Products' },
  { href: '/courses', label: 'Courses' },
  { href: '/vendor/dashboard', label: 'For Vendors' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname.startsWith(item.href) ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
