'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI } from '@/lib/api';
import { 
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';


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
  product?: {
    id: number;
    name: string;
    description: string;
    category_id: number;
    image_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string | null;
  };
}

export default function SubProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [subProduct, setSubProduct] = useState<SubProduct | null>(null);
  const [defaultImages, setDefaultImages] = useState<{product_image: string, logo_image: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subProductResponse, defaultImagesResponse] = await Promise.all([
        adminAPI.getSubProduct(parseInt(params.id as string)),
        adminAPI.getDefaultImages()
      ]);
      
      setSubProduct(subProductResponse.data);
      setDefaultImages(defaultImagesResponse.data);
    } catch (error) {
      console.error('Error fetching sub-product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sub-product? This action cannot be undone.')) {
      try {
        await adminAPI.deleteSubProduct(parseInt(params.id as string));
        toast.success('Sub-product deleted successfully');
        router.push('/sub-products');
      } catch (error: any) {
        console.error('Error deleting sub-product:', error);
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const parseJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center h-64">
            <div className="spinner h-16 w-16"></div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (!subProduct) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sub Product Not Found</h1>
            <Link href="/sub-products" className="text-blue-600 hover:text-blue-800">
              ← Back to Sub Products
            </Link>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  const images = parseJSON(subProduct.images);
  const features = parseJSON(subProduct.features);
  const specifications = parseJSON(subProduct.specifications);
  const tags = parseJSON(subProduct.tags);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/sub-products"
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{subProduct.name}</h1>
            <p className="text-gray-600">{subProduct.brand} - {subProduct.model}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/sub-products/${subProduct.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
          
          <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={images.length > 0 ? images[selectedImageIndex] : (defaultImages?.product_image || 'https://picsum.photos/400/300?random=1')}
              alt={subProduct.name}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImages?.product_image || 'https://picsum.photos/400/300?random=1';
              }}
            />
            {subProduct.is_featured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <StarIconSolid className="h-4 w-4 mr-1" />
                Featured
              </div>
            )}
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {subProduct.availability_status}
            </div>
            {!subProduct.is_active && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-medium text-lg">Inactive</span>
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
                  className={`relative h-16 w-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 ${
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">SKU</label>
              <p className="text-gray-900">{subProduct.sku}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Brand</label>
              <p className="text-gray-900">{subProduct.brand}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Model</label>
              <p className="text-gray-900">{subProduct.model}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Price Range</label>
              <p className="text-gray-900 text-lg font-semibold text-green-600">
                {subProduct.price_range} {subProduct.currency}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Availability Status</label>
              <p className="text-gray-900">{subProduct.availability_status}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                subProduct.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {subProduct.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Featured</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                subProduct.is_featured 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {subProduct.is_featured ? 'Yes' : 'No'}
              </span>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Sort Order</label>
              <p className="text-gray-900">{subProduct.sort_order}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-600 leading-relaxed">{subProduct.description}</p>
      </div>

      {/* Key Features */}
      {features.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
            Key Features
          </h2>
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

      {/* Technical Specifications */}
      {Object.keys(specifications).length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CpuChipIcon className="h-5 w-5 mr-2 text-blue-600" />
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-2">
                <dt className="text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/_/g, ' ')}
                </dt>
                <dd className="text-sm text-gray-900 mt-1">{value as string}</dd>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* URLs and Links */}
      {(subProduct.documentation_url || subProduct.datasheet_url) && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Links & Resources</h2>
          <div className="space-y-2">
            {subProduct.documentation_url && (
              <div>
                <label className="text-sm font-medium text-gray-700">Documentation URL</label>
                <a
                  href={subProduct.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 break-all"
                >
                  {subProduct.documentation_url}
                </a>
              </div>
            )}
            {subProduct.datasheet_url && (
              <div>
                <label className="text-sm font-medium text-gray-700">Datasheet URL</label>
                <a
                  href={subProduct.datasheet_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 break-all"
                >
                  {subProduct.datasheet_url}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
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

      {/* SEO Information */}
      {(subProduct.meta_title || subProduct.meta_description) && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Information</h2>
          <div className="space-y-4">
            {subProduct.meta_title && (
              <div>
                <label className="text-sm font-medium text-gray-700">Meta Title</label>
                <p className="text-gray-900">{subProduct.meta_title}</p>
              </div>
            )}
            {subProduct.meta_description && (
              <div>
                <label className="text-sm font-medium text-gray-700">Meta Description</label>
                <p className="text-gray-900">{subProduct.meta_description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Timestamps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Created At</label>
            <p className="text-gray-900">{new Date(subProduct.created_at).toLocaleString()}</p>
          </div>
          {subProduct.updated_at && (
            <div>
              <label className="text-sm font-medium text-gray-700">Updated At</label>
              <p className="text-gray-900">{new Date(subProduct.updated_at).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}