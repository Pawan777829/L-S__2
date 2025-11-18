
export default function CancellationReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-headline">Cancellation & Returns</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>Cancellation Policy</h2>
        <p>
          You can cancel your order online before the product has been shipped. In case your product has been shipped, you will not be able to cancel the order.
        </p>
        
        <h2>Return Policy</h2>
        <p>
          We have a 10-day return policy, which means you have 10 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
        </p>
        
        <h2>Refunds</h2>
        <p>
          We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method.
        </p>

        <h2>Contact Us</h2>
        <p>
          For any return question, you can contact us at contact@synergysphere.com.
        </p>
      </div>
    </div>
  );
}
