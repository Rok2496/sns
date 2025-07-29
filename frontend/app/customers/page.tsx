'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { apiEndpoints, Customer } from '@/lib/api';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiEndpoints.getCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Customers</h1>
          <p className="text-xl opacity-90">Our valued customers and trusted partners</p>
        </div>
      </section>

      {/* Customers Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Valuable Customers
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are proud to serve a diverse range of clients across various industries. 
              Our commitment to excellence has earned us the trust of leading organizations.
            </p>
          </div>

          {/* Customer Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 card-hover w-full h-32"
                title={customer.description}
              >
                <Image
                  src={customer.logo_url || '/images/customers/placeholder.png'}
                  alt={customer.name}
                  width={120}
                  height={80}
                  className="max-h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Customer Stats */}
          <div className="mt-20 bg-blue-600 rounded-lg p-12 text-white text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-8">
              Trusted by Industry Leaders
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">70+</div>
                <p className="text-lg">Satisfied Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">50+</div>
                <p className="text-lg">Partner Brands</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-300 mb-2">365</div>
                <p className="text-lg">Days of Service</p>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="mt-20">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-12 text-center">
              What Our Customers Say
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-8 card-hover">
                <div className="text-blue-600 text-4xl mb-4">"</div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  SNS has been instrumental in transforming our IT infrastructure. Their expertise and dedication 
                  to excellence have made them our trusted technology partner.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Anonymous Client</p>
                    <p className="text-gray-600 text-sm">Enterprise Customer</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 card-hover">
                <div className="text-blue-600 text-4xl mb-4">"</div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The team at SNS provided exceptional service and support throughout our digital transformation 
                  journey. Highly recommended for any organization looking for reliable IT solutions.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    B
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Business Partner</p>
                    <p className="text-gray-600 text-sm">Technology Director</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 card-hover">
                <div className="text-blue-600 text-4xl mb-4">"</div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Professional, reliable, and innovative - SNS delivers on their promises. Their comprehensive 
                  approach to IT solutions has significantly improved our operational efficiency.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    C
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Corporate Client</p>
                    <p className="text-gray-600 text-sm">IT Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us help you achieve your technology goals and become our next success story. 
              Contact us today to discuss your requirements.
            </p>
            <a
              href="/contact-us"
              className="btn-primary inline-block"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}