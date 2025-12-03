'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Home,
  Package,
  Package2,
  ShoppingCart,
  Users2,
  LineChart,
  Settings,
  PanelLeft,
  Bell,
  BarChart,
  Star,
  CircleDollarSign,
  Archive,
  Megaphone,
  LifeBuoy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/layout/logo';

const navItems = [
    { href: '/vendor/dashboard', label: 'Dashboard', icon: Home },
    { href: '/vendor/products', label: 'Products', icon: Package },
    { href: '/vendor/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/vendor/inventory', label: 'Inventory', icon: Archive },
    { href: '/vendor/payments', label: 'Payments', icon: CircleDollarSign },
    { href: '/vendor/returns', label: 'Returns', icon: Archive },
    { href: '/vendor/ratings', label: 'Ratings', icon: Star },
    { href: '/vendor/offers', label: 'Offers', icon: Megaphone },
    { href: '/vendor/analytics', label: 'Analytics', icon: BarChart },
    { href: '/vendor/support', label: 'Support', icon: LifeBuoy },
];

const NavLink = ({ item, pathname }: { item: typeof navItems[0]; pathname: string }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    return (
        <Tooltip>
        <TooltipTrigger asChild>
            <Link
            href={item.href}
            className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                isActive && 'bg-accent text-accent-foreground'
            )}
            >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{item.label}</span>
            </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
    )
}

const MobileNavLink = ({ item, pathname }: { item: typeof navItems[0]; pathname: string }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    return (
         <Link
            href={item.href}
            className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", isActive && "text-foreground")}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
    )
}

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <Logo />
                <span className="sr-only">Learn & Shop</span>
            </Link>
            {navItems.map(item => <NavLink key={item.href} item={item} pathname={pathname} />)}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/vendor/settings"
                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", pathname === '/vendor/settings' && "bg-accent text-accent-foreground")}
                >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            </nav>
        </TooltipProvider>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
            <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
                <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                <Logo />
                <span className="sr-only">Learn & Shop</span>
                </Link>
                {navItems.map(item => <MobileNavLink key={item.href} item={item} pathname={pathname} />)}
            </nav>
            </SheetContent>
        </Sheet>
         <div className="relative ml-auto flex-1 md:grow-0">
             <h1 className="font-semibold text-lg">Vendor Dashboard</h1>
         </div>
         <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Bell className="h-5 w-5" />
        </Button>
      </header>
    </>
  );
}
