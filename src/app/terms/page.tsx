
export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-headline">Terms of Use</h1>
        
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Agreement to Terms</h2>
        <p>
          By using our website, you agree to be bound by these Terms of Use. If you do not agree to these Terms of Use, you may not use the website. We may modify these Terms of Use at any time, and such modification shall be effective immediately upon posting of the modified Terms of Use.
        </p>
        
        <h2>2. Intellectual Property Rights</h2>
        <p>
          The Site and its original content, features, and functionality are owned by Learn & Shop and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
        
        <h2>3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        
        <h2>4. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>
        
        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at contact@synergysphere.com.
        </p>
      </div>
    </div>
  );
}

    