
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 font-headline">Contact Us</h1>
        <p className="text-xl text-center text-muted-foreground mb-12">
          We'd love to hear from you. Please reach out with any questions or feedback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <Input id="email" type="email" placeholder="Your Email" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                    <Textarea id="message" placeholder="Your message..." />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Information</h2>
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <Mail className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">Email Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">contact@synergysphere.com</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <Phone className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">Call Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                        <MapPin className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">Visit Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            123 Synergy Way, Innovation City, 560103
                        </p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
