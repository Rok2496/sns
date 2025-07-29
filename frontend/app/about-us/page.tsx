'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { apiEndpoints, CompanyInfo } from '@/lib/api';

export default function AboutUs() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await apiEndpoints.getCompanyInfo();
        setCompanyInfo(response.data);
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    fetchCompanyInfo();
  }, []);

  if (!companyInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const teamStrengths = [
    'Experienced Management from Associated Technology Domain',
    'Cisco Professional Level Certified Resources',
    'Fortinet NSE Certified Resources',
    'Data Center Certified Resources',
    'Experienced Project Management Professional',
    'Dell Certified Resources for Server & Storage Domain',
    'Experienced Resources on Modular DC',
    'Certified Structured Cabling Professional',
    '10+ Experienced Technical & Technicians Team',
    'Experienced Supply Chain Professionals to Ensure Project Smoothness'
  ];

  const whyChooseUs = [
    'Strategic partner and trusted adviser',
    'Value for money',
    'Proactive resolution to issues',
    'Small enough to care, large enough to deliver excellence',
    'Adding value, not complication',
    'An accessible team',
    'Ensuring a smooth transition',
    'Specialists to provide you the extra knowledge',
    'Clear communication',
    'The utmost accountability and commitment',
    'Projects completed on time and within budget'
  ];

  const ourApproach = [
    'We take the time to understand your needs carefully analyzing where our partners are right now and where they want to be in the future.',
    'We help our partner to identify improvements that can be made and we quantify the benefits to them of making those improvements.',
    'We work with our partner to implement the agreed solutions. We are not here to tell them what to do but we will be the catalyst that will help them grow and make the changes they want to make.'
  ];

  const ourServices = [
    'Design and planning Services',
    'Implementation Services',
    'Configuration Optimization Services',
    'Upgrade and Migration Services',
    'Design Review and Verification Services',
    'Application Customization Services'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Our Company</h1>
        </div>
      </section>

      {/* Partner Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Your Partner for Network Solution
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                SNS Founded in {companyInfo.founded_year}, we have earning experience, continued success and a well-satisfied
                clientele. We are powered by highly skilled professionals, across various domains, whose
                experience can transform organizations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                {companyInfo.about_us}
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/web/about-1.png"
                alt="About SNS"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Strength */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Team Strength
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamStrengths.map((strength, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                <span className="text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                {companyInfo.mission}
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                {companyInfo.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">IT SOLUTIONS</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span className="text-gray-700">IT Security</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span className="text-gray-700">Networking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span className="text-gray-700">Backup & Storage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span className="text-gray-700">Server & Virtualization</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">IT CONSULTANCY</h3>
              <p className="text-gray-700 leading-relaxed">
                We partner with our customers to simplify, develop and transform the services supporting their
                businesses. We ensure the best levels of expert advisory and technical knowledge through a deep-set
                commitment, comprehensive industry expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IT Consultancy Details */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            IT Consultancy
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h3>
              <div className="space-y-6">
                {ourApproach.map((approach, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700 leading-relaxed">{approach}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
              <div className="space-y-3">
                {ourServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            We've worked with some great companies already. We think you should join them in your quest for top talent.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">
                {companyInfo.total_clients}+
              </div>
              <h3 className="text-xl font-semibold">Our Clients</h3>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">
                {companyInfo.total_brands}+
              </div>
              <h3 className="text-xl font-semibold">Brands</h3>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">
                {companyInfo.service_days_per_year}+
              </div>
              <h3 className="text-xl font-semibold">Our service Day/Year</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1">•</span>
                <span className="text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}