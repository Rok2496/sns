'use client';

import { useEffect, useState } from 'react';
import { apiEndpoints, CompanyInfo } from '@/lib/api';

export default function HeroSection() {
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
      <div className="hero-gradient min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 animate-fadeInUp">
          EMPOWERING YOUR
          <br />
          <span className="text-yellow-300">DIGITAL TRANSFORMATION</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          {/* Stats Cards */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 card-hover">
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              {companyInfo.total_clients}+
            </div>
            <h3 className="text-xl font-semibold">Our Clients</h3>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 card-hover">
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              {companyInfo.total_brands}+
            </div>
            <h3 className="text-xl font-semibold">Brands</h3>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 card-hover">
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              {companyInfo.service_days_per_year}+
            </div>
            <h3 className="text-xl font-semibold">Our service Day/Year</h3>
          </div>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}