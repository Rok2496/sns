'use client';

import { useEffect, useState } from 'react';
import { apiEndpoints, Solution } from '@/lib/api';

export default function ProductsServicesSection() {
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await apiEndpoints.getSolutions();
        setSolutions(response.data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      }
    };

    fetchSolutions();
  }, []);

  const parseFeatures = (featuresString: string): string[] => {
    try {
      return JSON.parse(featuresString);
    } catch {
      return [];
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Products, Solutions & Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => {
            const features = parseFeatures(solution.features);
            
            return (
              <div key={solution.id} className="bg-white rounded-lg shadow-lg p-6 card-hover">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {solution.name}
                </h3>
                <ul className="space-y-2">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-600 text-sm flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Static Content from Original Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Complete IT Infrastructure Solution
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Server & Storage Solution.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Data Center & Related Facilities.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Power & Cooling.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                LAN-WAN Wired & Wireless Networking.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Operating System.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Virtualization & Database Implementation.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Entire IT Life-Cycle.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              IT Physical & Cyber Security Solution
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Network Security.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Physical Security.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Cyber Security.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Protect your whole Enterprise, Inside & Out, Efficiently & Proactively.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Enable the Adoption of New Applications & Technology.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Data & Application Security.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Identity & Access Management.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Managed IT Operation
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Remote Onsite Operation Support System.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Annual Maintenance Contract with SLA.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Professional Services
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Network Assessment & Optimization.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Project Management: Turn Key Projects.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Network Design & Implementation.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Network Architecture Review.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Wireless Security Testing.
              </li>
              <li className="text-gray-600 text-sm flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Vulnerability Assessment.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}