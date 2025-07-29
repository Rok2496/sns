'use client';

import { useEffect, useState } from 'react';
import { apiEndpoints, Service } from '@/lib/api';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiEndpoints.getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const parseFeatures = (featuresString: string): string[] => {
    try {
      return JSON.parse(featuresString);
    } catch {
      return [];
    }
  };

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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Services</h1>
          <p className="text-xl opacity-90">Professional IT services to transform your business</p>
        </div>
      </section>

      {/* Dynamic Services from API */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const features = parseFeatures(service.features);
              
              return (
                <div key={service.id} className="bg-gray-50 rounded-lg p-8 card-hover">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    {service.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {features.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h3>
                      <ul className="space-y-3">
                        {features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">•</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IT Consultancy Details */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            IT Consultancy
          </h2>
          
          <div className="bg-white rounded-lg p-8 shadow-lg mb-12">
            <p className="text-gray-700 leading-relaxed mb-8">
              We partner with our customers to simplify, develop and transform the services supporting their
              businesses. We ensure the best levels of expert advisory and technical knowledge through a deep-set
              commitment, comprehensive industry expertise.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">OUR IT CONSULTING PROCESS</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl font-bold">1</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">ANALYSIS</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our IT consulting advisors study your existing IT solutions and the ways in which your employees use
                  them, identifying problems in workflows and automation.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl font-bold">2</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">STRATEGY</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The advisors design a roadmap and strategy that will help your business leverage the latest
                  technologies and de-clutter your IT infrastructure. Then, they set IT products and employee KPIs.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-600 text-2xl font-bold">3</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">PERFORMANCE</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Impactful IT consulting services rely on collaboration between the client and the IT consulting
                  company. Our experts will closely analyse your workflows, tracking the performance to discover the
                  pain points.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl font-bold">4</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">IMPROVEMENTS</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  After completing the initially set goals, our IT consulting advisors recommend steps for future
                  improvements, as well as assist with implementing them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IT Management Service */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            IT Management Service
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">SNS Managed IT Provider</h3>
              <p className="text-gray-700 leading-relaxed">
                SNS is Managed IT provider with over 2 years of experience in implementing infrastructure projects
                and outsourcing IT functions. Hundreds of customers from our country.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Services</h3>
              <p className="text-gray-700 leading-relaxed">
                Choosing QAPL as a Managed IT provider, you benefit from a comprehensive service, all components of
                which are designed to meet your business objectives. Outsourcing IT service design and management,
                you minimize investment into your own IT infrastructure and its support.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">IP Telephony Solution</h3>
              <p className="text-gray-700 leading-relaxed">
                With Managed IT, you can take advantage of flexible, customizable IT solutions tailored to your
                business and its ongoing changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Migration Service */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Migration Service</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Data center migration</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Data Center Migration is the process of deploying and migrating/relocating an existing data center
                    from one operating environment to another without causing data loss, this relocation process
                    requires no physical movement and is logical.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Customization of IT Solutions</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    An IT migration is the shifting of data or software from one system to another. Replacing one data
                    storage system with another. Moving from on-premise infrastructure to cloud infrastructure.
                    Replacing a monolithic application with containerized services.
                  </p>
                </div>
              </div>
            </div>

            {/* Installation & Configuration */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Installation & Configuration Service</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                As your business grows and you take on more employees, the time will come where you need a server to
                keep your office network and business running efficiently. But with a seemingly endless array of
                choices and important decisions to be made, you might be wondering where to start.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                In this guide, we'll take you through everything you need to know including what a server is,
                deciding between hardware or the cloud, choosing the right operating system, and the best way to set
                it all up.
              </p>
            </div>

            {/* IT Audit */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">IT Audit</h3>
              <p className="text-gray-700 leading-relaxed">
                An IT audit is the examination and evaluation of an organization's information technology
                infrastructure, policies and operations. Information technology audits determine whether IT controls
                protect corporate assets, ensure data integrity and are aligned with the business's overall goals.
              </p>
            </div>

            {/* Software Development */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Software Development</h3>
              <ul className="space-y-3">
                {[
                  'E-commerce Website',
                  'POS & Stock Management Software',
                  'Inventory Management System',
                  'Hotel Booking System'
                ].map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}