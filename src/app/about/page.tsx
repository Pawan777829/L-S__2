
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
    {
        name: 'Jane Doe',
        role: 'CEO & Founder',
        avatar: 'https://picsum.photos/seed/person1/100/100',
        bio: 'Jane is a visionary leader with a passion for creating innovative solutions that empower people.',
    },
    {
        name: 'John Smith',
        role: 'Chief Technology Officer',
        avatar: 'https://picsum.photos/seed/person2/100/100',
        bio: 'John is a tech guru who loves building scalable and robust systems.',
    },
    {
        name: 'Emily White',
        role: 'Head of E-commerce',
        avatar: 'https://picsum.photos/seed/person3/100/100',
        bio: 'Emily has a knack for creating delightful shopping experiences for customers.',
    },
     {
        name: 'Michael Brown',
        role: 'Head of Learning',
        avatar: 'https://picsum.photos/seed/person4/100/100',
        bio: 'Michael is dedicated to making education accessible and engaging for everyone.',
    },
]

export default function AboutUsPage() {
  return (
    <div className="bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white">
            <Image
            src="https://picsum.photos/seed/about-hero/1920/1080"
            alt="SynergySphere Office"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="modern office"
            />
            <div className="absolute inset-0 bg-primary/70 z-10" />
            <div className="relative z-20 container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
                    About SynergySphere
                </h1>
                <p className="text-lg md:text-2xl max-w-3xl mx-auto">
                    A unified marketplace for products and learning.
                </p>
            </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
                    <p className="text-xl text-muted-foreground">
                        Our mission is to create a revolutionary platform that seamlessly blends commerce and education. We empower vendors to reach new markets while offering users a unique space to shop, learn, and grow. At SynergySphere, we believe in the power of connection and knowledge to drive personal and professional success.
                    </p>
                </div>
            </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 font-headline">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <Card key={member.name} className="text-center hover:shadow-2xl transition-shadow duration-300">
                            <CardContent className="p-6">
                                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-xl">{member.name}</CardTitle>
                                <CardDescription>{member.role}</CardDescription>
                                <p className="text-muted-foreground mt-4 text-sm">{member.bio}</p>
                                <div className="mt-4 flex justify-center gap-4">
                                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20}/></Link>
                                    <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20}/></Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 font-headline">Our Core Values</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">Innovation</h3>
                        <p className="text-muted-foreground">We constantly seek new and better ways to serve our customers and partners, pushing the boundaries of what's possible.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">Integrity</h3>
                        <p className="text-muted-foreground">We operate with honesty and transparency in everything we do, building trust with our community.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">Community</h3>
                        <p className="text-muted-foreground">We foster a supportive and collaborative environment where everyone can learn, share, and succeed together.</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
