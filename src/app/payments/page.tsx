
export default function PaymentsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-headline">Payments</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>Payment Methods</h2>
        <p>
          We accept a variety of payment methods to make your shopping experience convenient and secure. These include:
        </p>
        <ul>
          <li>Credit and Debit Cards (Visa, MasterCard, American Express)</li>
          <li>Net Banking</li>
          <li>Unified Payments Interface (UPI)</li>
          <li>Wallets (Paytm, etc.)</li>
          <li>Cash on Delivery (on eligible orders)</li>
        </ul>
        
        <h2>Security</h2>
        <p>
          All online transactions are processed through a secure payment gateway. We do not store your card information on our servers. Your payment details are encrypted and securely transmitted to the respective payment processors.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about payments, please contact us at contact@synergysphere.com.
        </p>
      </div>
    </div>
  );
}
