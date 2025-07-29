'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AllianceSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Alliance partner logos (based on the website scan)
  const allianceLogos = [
    { id: 1, name: 'Partner 1', image: '/images/alliance/1.png' },
    { id: 2, name: 'Partner 2', image: '/images/alliance/2.png' },
    { id: 3, name: 'Partner 3', image: '/images/alliance/3.png' },
    { id: 4, name: 'Partner 4', image: '/images/alliance/4.png' },
    { id: 5, name: 'Partner 5', image: '/images/alliance/5.png' },
    { id: 6, name: 'Partner 6', image: '/images/alliance/6.png' },
    { id: 7, name: 'Partner 7', image: '/images/alliance/7.png' },
    { id: 8, name: 'Partner 8', image: '/images/alliance/8.png' },
    { id: 9, name: 'Partner 9', image: '/images/alliance/9.png' },
    { id: 10, name: 'Partner 10', image: '/images/alliance/10.png' },
    { id: 11, name: 'Partner 11', image: '/images/alliance/11.png' },
    { id: 12, name: 'Partner 12', image: '/images/alliance/12.png' },
    { id: 13, name: 'Partner 13', image: '/images/alliance/13.png' },
    { id: 14, name: 'Partner 14', image: '/images/alliance/14.png' },
    { id: 15, name: 'Partner 15', image: '/images/alliance/15.png' },
    { id: 16, name: 'Partner 16', image: '/images/alliance/16.png' },
    { id: 18, name: 'Partner 18', image: '/images/alliance/18.png' },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(allianceLogos.length / 6));
    }, 3000);

    return () => clearInterval(timer);
  }, [allianceLogos.length]);

  const getVisibleLogos = () => {
    const logosPerSlide = 6;
    const startIndex = currentSlide * logosPerSlide;
    return allianceLogos.slice(startIndex, startIndex + logosPerSlide);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Alliance Product
          </h2>
        </div>

        {/* Alliance Logos Carousel */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {getVisibleLogos().map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 card-hover"
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={120}
                  height={80}
                  className="max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(allianceLogos.length / 6) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Logos Grid (Static Display) */}
        <div className="mt-16">
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6 items-center justify-items-center">
            {allianceLogos.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 card-hover"
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={100}
                  height={60}
                  className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}