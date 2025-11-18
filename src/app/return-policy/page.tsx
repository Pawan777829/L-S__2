
export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-headline">Return Policy</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>10-Day Returns</h2>
        <p>
          We offer a 10-day return policy for most items. This means you have 10 days after receiving your item to request a return.
        </p>
        
        <h2>Eligibility</h2>
        <p>
          To be eligible for a return, your item must be in the same condition that you received it: unworn or unused, with all original tags, and in its original packaging. You will also need the receipt or proof of purchase.
        </p>

        <h2>Initiating a Return</h2>
        <p>
          To start a return, you can contact us at contact@synergysphere.com or visit the 'My Orders' section of your account. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about returns, please contact us at contact@synergysphere.com.
        </p>
      </div>
    </div>
  );
}
