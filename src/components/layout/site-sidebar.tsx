
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { Home, ShoppingBag, GraduationCap, ShoppingCart, HelpCircle, Package, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: ShoppingBag },
  { href: '/courses', label: 'Courses', icon: GraduationCap },
];

const userNavItems = [
  { href: '/account/orders', label: 'My Orders', icon: Package },
  { href: '/cart', label: 'My Cart', icon: ShoppingCart },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/faq', label: 'Help Centre', icon: HelpCircle },
];

export function SiteSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const sidebarMenuButtonAsLink = (href: string, label: string, icon: React.ElementType) => {
    const Icon = icon;
    const isActive = pathname === href;
    return (
      <SidebarMenuItem key={href}>
        <Link href={href} className="w-full">
            <SidebarMenuButton isActive={isActive} tooltip={label}>
                <Icon />
                <span>{label}</span>
            </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };


  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="flex items-center justify-between">
        <Logo />
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => sidebarMenuButtonAsLink(item.href, item.label, item.icon))}
          
          {user && (
            <>
                <SidebarMenuItem>
                    <div className="h-px w-full bg-border my-2" />
                </SidebarMenuItem>
                {userNavItems.map((item) => sidebarMenuButtonAsLink(item.href, item.label, item.icon))}
            </>
          )}

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
