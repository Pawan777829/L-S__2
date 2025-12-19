
'use client';

import { useState, useEffect } from 'react';

export default function SecurityPage() {
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-headline">Security</h1>
        
        <p>Last updated: {date}</p>
        
        <h2>Our Commitment</h2>
        <p>
          SynergySphere is committed to ensuring the security of your information. We use a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure.
        </p>
        
        <h2>Secure Payments</h2>
        <p>
         Your payment information is handled with the utmost care. All transactions are processed through a secure payment gateway provider that is PCI-DSS compliant. We do not store your full credit card details on our servers, ensuring your financial data is protected.
        </p>

        <h2>Account Protection</h2>
        <p>
          Your account is protected by a password for your privacy and security. We recommend using a strong, unique password and logging out after using shared computers.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about security on our website, you can email us at contact@synergysphere.com.
        </p>
      </div>
    </div>
  );
}
