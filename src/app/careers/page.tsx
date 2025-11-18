
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight } from 'lucide-react';

const jobOpenings = [
    {
        title: 'Senior Frontend Engineer',
        location: 'Remote',
        department: 'Engineering',
    },
    {
        title: 'Product Manager, E-commerce',
        location: 'Innovation City',
        department: 'Product',
    },
    {
        title: 'Digital Marketing Specialist',
        location: 'Remote',
        department: 'Marketing',
    },
    {
        title: 'UX/UI Designer',
        location: 'Innovation City',
        department: 'Design',
    }
]

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <Briefcase className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground">
          We're always looking for passionate people to join us on our mission.
          Explore our open roles and find your fit at SynergySphere.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8">Current Openings</h2>
        <div className="space-y-6">
          {jobOpenings.map((job) => (
             <Card key={job.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground mt-1">
                            {job.department} &middot; {job.location}
                        </p>
                    </div>
                    <Button variant="outline" size="sm">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
            <h3 className="text-2xl font-bold">Don't see a role for you?</h3>
            <p className="text-muted-foreground mt-2">
                We are always interested in hearing from talented individuals. Send us your resume!
            </p>
            <Button className="mt-4">
                Email your resume
            </Button>
        </div>
      </div>
    </div>
  );
}
