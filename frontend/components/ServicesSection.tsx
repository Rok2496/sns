'use client';

import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: 'IT Security',
      href: '/solutions',
      description: 'Comprehensive security solutions to protect your enterprise',
      icon: '🔒'
    },
    {
      title: 'Networking',
      href: '/solutions',
      description: 'Advanced networking infrastructure and solutions',
      icon: '🌐'
    },
    {
      title: 'Backup & Storage',
      href: '/solutions',
      description: 'Reliable data backup and storage solutions',
      icon: '💾'
    },
    {
      title: 'Server & Virtualization',
      href: '/solutions',
      description: 'High-performance server and virtualization services',
      icon: '🖥️'
    },
    {
      title: 'Customer Service',
      href: '/services',
      description: 'Dedicated customer support and service excellence',
      icon: '🎧'
    },
    {
      title: 'Digital & Creative',
      href: '/services',
      description: 'Digital transformation and creative solutions',
      icon: '🎨'
    }
  ];

  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-gray-800 rounded-lg p-6 card-hover hover:bg-gray-700 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {service.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}