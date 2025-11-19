
import Link from 'next/link';
import { Logo } from './logo';
import { Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4 text-foreground font-headline">ABOUT</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="/vendor/dashboard" className="text-muted-foreground hover:text-foreground">Become a Vendor</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4 text-foreground font-headline">HELP</h3>
            <ul className="space-y-3">
              <li><Link href="/payments" className="text-muted-foreground hover:text-foreground">Payments</Link></li>
              <li><Link href="/shipping" className="text-muted-foreground hover:text-foreground">Shipping</Link></li>
              <li><Link href="/cancellation-returns" className="text-muted-foreground hover:text-foreground">Cancellation & Returns</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
             <h3 className="font-semibold mb-4 text-foreground font-headline">POLICY</h3>
            <ul className="space-y-3">
              <li><Link href="/return-policy" className="text-muted-foreground hover:text-foreground">Return Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms Of Use</Link></li>
              <li><Link href="/security" className="text-muted-foreground hover:text-foreground">Security</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4 text-foreground font-headline">SOCIAL</h3>
            <ul className="space-y-3">
               <li><Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Facebook size={16} /> Facebook</Link></li>
               <li><Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Twitter size={16} /> Twitter</Link></li>
               <li><Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Youtube size={16} /> YouTube</Link></li>
            </ul>
          </div>
          <div className="col-span-full md:col-span-2 border-t md:border-l md:border-t-0 pt-6 md:pt-0 md:pl-6 border-dashed">
             <h3 className="font-semibold mb-4 text-foreground font-headline">Mail Us:</h3>
             <p className="text-muted-foreground">
                Learn & Shop Internet Private Limited,
                <br />
                Buildings Alyssa, Begonia &amp;
                <br />
                Clove Embassy Tech Village,
                <br />
                Outer Ring Road, Devarabeesanahalli Village,
                <br />
                Bengaluru, 560103,
                <br />
                Karnataka, India
             </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-dashed flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="order-2 md:order-1 mt-4 md:mt-0">&copy; {new Date().getFullYear()} Learn & Shop. All rights reserved.</p>
          <div className="order-1 md:order-2">
            <Logo />
          </div>
        </div>
      </div>
    </footer>
  );
}

    