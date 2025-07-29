export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl opacity-90">Your privacy is important to us</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              At Star Network Solutions, we care about your privacy and want to make sure you understand how we
              collect and use your information. This Privacy Policy explains what information we collect and how
              we use it.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Information We Collect:</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              When you visit our website (<a href="https://snsbd.com/" className="text-blue-600 hover:text-blue-800">https://snsbd.com/</a>),
              we may collect certain personal information from you. This includes information you provide directly
              to us, such as your name, email address, phone number, and any messages or attachments you send us.
              When you create an account, we may also ask for your contact information, such as your name, company
              name, address, email address, and phone number.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information:</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-8">
              <li>Provide and maintain our website.</li>
              <li>Improve and personalize your experience on our website.</li>
              <li>Understand how you use our website and analyze trends.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, including customer service, updates, and marketing purposes.</li>
              <li>Send you emails.</li>
              <li>Prevent fraud.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Log Files:</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Like many other websites, we use log files. These files gather non-personally identifiable
              information such as internet protocol (IP) addresses, browser type, Internet Service Provider (ISP),
              date and time stamps, referring/exit pages, and the number of clicks. We use this information for
              website analysis, administration, and demographic purposes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security:</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              We implement appropriate security measures to protect your personal information against unauthorized 
              access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
              or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies:</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Our website may use cookies to enhance your browsing experience. Cookies are small files that a site 
              or its service provider transfers to your computer's hard drive through your web browser that enables 
              the site's or service provider's systems to recognize your browser and capture certain information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services:</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              We may employ third-party companies and individuals to facilitate our service, provide the service 
              on our behalf, perform service-related services, or assist us in analyzing how our service is used. 
              These third parties have access to your personal information only to perform these tasks on our behalf 
              and are obligated not to disclose or use it for any other purpose.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights:</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing your personal information</li>
              <li>Request transfer of your personal information</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy:</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "last updated" date. You are advised to review 
              this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us:</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or suggestions regarding our Privacy Policy, please feel free to contact
              us. We're here to help and address any concerns you may have.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information:</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Phone:</strong> +8801897974300</p>
                <p><strong>Email:</strong> info@snsbd.com</p>
                <p><strong>Address:</strong> Lilyrin Tower House No -39/1, 8th Floor, Road No -2, Dhanmondi, Dhaka 1205</p>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}