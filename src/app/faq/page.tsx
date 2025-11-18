
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 font-headline">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is SynergySphere?</AccordionTrigger>
            <AccordionContent>
              SynergySphere is a unique platform that combines an e-commerce marketplace with a learning portal, allowing users to buy products and enroll in courses all in one place.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I return an item?</AccordionTrigger>
            <AccordionContent>
              You can initiate a return within 10 days of receiving your item by going to your 'My Orders' page. Please refer to our Cancellation & Returns policy for more details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I become a vendor?</AccordionTrigger>
            <AccordionContent>
              We're glad you're interested! You can find more information and sign up to be a vendor by visiting our 'For Vendors' page.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
            <AccordionContent>
              Yes, absolutely. We use industry-standard encryption and a secure payment gateway to process all transactions. We do not store your credit card information on our servers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
