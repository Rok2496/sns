'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiEndpoints } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  StarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  PhoneIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface SubProduct {
  id: number;
  name: string;
  description: string;
  product_id: number;
  sku: string;
  brand: string;
  model: string;
  specifications: string;
  features: string;
  images: string;
  price_range: string;
  currency: string;
  availability_status: string;
  warranty_info: string;
  support_info: string;
  documentation_url: string;
  datasheet_url: string;
  tags: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string | null;
}

export default function SubProductDetailClient() {
  const params = useParams();
  const [subProduct, setSubProduct] = useState<SubProduct | null>(null);
  const [defaultImages, setDefaultImages] = useState<{product_image: string, logo_image: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subProductResponse, defaultImagesResponse] = await Promise.all([
          apiEndpoints.getSubProduct(parseInt(params.id as string)),
          apiEndpoints.getDefaultImages()
        ]);
        
        setSubProduct(subProductResponse.data);
        setDefaultImages(defaultImagesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const parseJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
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

  if (!subProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/sub-products" className="text-blue-600 hover:text-blue-800">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = parseJSON(subProduct.images);
  const features = parseJSON(subProduct.features);
  const specifications = parseJSON(subProduct.specifications);
  const tags = parseJSON(subProduct.tags);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/sub-products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{subProduct.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/sub-products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={images.length > 0 ? images[selectedImageIndex] : (defaultImages?.product_image || 'https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Product+Image')}
                alt={subProduct.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImages?.product_image || 'https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Product+Image';
                }}
              />
              {subProduct.is_featured && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <StarIconSolid className="h-4 w-4 mr-1" />
                  Featured
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${subProduct.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {/* Brand and SKU */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-blue-600">{subProduct.brand}</span>
              <span className="text-sm text-gray-500">SKU: {subProduct.sku}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {subProduct.name}
            </h1>

            {/* Model */}
            <p className="text-lg text-gray-600 mb-4">Model: {subProduct.model}</p>

            {/* Availability Status */}
            <div className="flex items-center mb-6">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">{subProduct.availability_status}</span>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-green-600">
                {subProduct.price_range}
              </span>
              <span className="text-lg text-gray-500 ml-2">{subProduct.currency}</span>
              <p className="text-sm text-gray-500 mt-1">
                *Prices are indicative and may vary based on configuration and quantity
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{subProduct.description}</p>
            </div>

            {/* Key Features */}
            {features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                Request Quote
              </button>
              
              {subProduct.datasheet_url && (
                <a
                  href={subProduct.datasheet_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                >
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Download Datasheet
                </a>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technical Specifications */}
        {Object.keys(specifications).length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CpuChipIcon className="h-6 w-6 mr-3 text-blue-600" />
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 pb-4">
                  <dt className="text-sm font-medium text-gray-900 capitalize">
                    {key.replace(/_/g, ' ')}
                  </dt>
                  <dd className="text-sm text-gray-600 mt-1">{value as string}</dd>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Warranty */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-500" />
              Warranty Information
            </h3>
            <p className="text-gray-600">{subProduct.warranty_info}</p>
          </div>

          {/* Support */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <WrenchScrewdriverIcon className="h-5 w-5 mr-2 text-blue-500" />
              Support Information
            </h3>
            <p className="text-gray-600 mb-4">{subProduct.support_info}</p>
            
            {subProduct.documentation_url && (
              <a
                href={subProduct.documentation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <GlobeAltIcon className="h-4 w-4 mr-1" />
                View Documentation
              </a>
            )}
          </div>
        </div>

        {/* Contact for More Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Need More Information?
          </h3>
          <p className="text-gray-600 mb-6">
            Our technical experts are here to help you choose the right solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Our Experts
            </Link>
            <a
              href="tel:+8801897974300"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
            >
              Call: +880 1897 974 300
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}