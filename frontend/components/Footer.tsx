'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiEndpoints, CompanyInfo } from '@/lib/api';

export default function Footer() {
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
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Address */}
          <div>
            <div className="mb-6">
              <Image
                src="/images/web/footer.png"
                alt="SNS Footer"
                width={300}
                height={100}
                className="h-16 w-auto"
              />
            </div>
            <h3 className="text-lg font-semibold mb-4">Our Address</h3>
            <div>
              <h4 className="font-medium text-blue-400 mb-2">{companyInfo.company_name}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {companyInfo.address}
              </p>
            </div>
          </div>

          {/* Contact Email */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Mailbox</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">{companyInfo.email}</p>
              <p className="text-gray-300 text-sm">sales@snsbd.com</p>
            </div>
          </div>

          {/* Phone */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Phone</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">{companyInfo.phone}</p>
              <p className="text-gray-300 text-sm">+88 01897 974 301</p>
              <p className="text-gray-300 text-sm">+88 01897 974 302</p>
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <div className="space-y-2">
              <Link 
                href="/about-us" 
                className="block text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                About us
              </Link>
              <Link 
                href="/privacy-policy" 
                className="block text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © SNS, All rights reserved by{' '}
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
              SNS
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}