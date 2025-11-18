
export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-headline">Shipping Policy</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>Shipping Speeds and Charges</h2>
        <p>
          We are committed to delivering your order accurately, in good condition, and always on time.
        </p>
        <ul>
          <li>
            <strong>Standard Shipping:</strong> Delivered within 5-7 business days. A nominal fee may be applied.
          </li>
          <li>
            <strong>Express Shipping:</strong> Delivered within 2-3 business days. Additional charges will apply.
          </li>
        </ul>
        
        <h2>Locations</h2>
        <p>
          We currently ship to most pin codes across India. At the time of checkout, please provide your shipping address to check for serviceability.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about our shipping policy, please contact us at contact@synergysphere.com.
        </p>
      </div>
    </div>
  );
}
