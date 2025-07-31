'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, MagnifyingGlassIcon, FunnelIcon, StarIcon } from '@heroicons/react/24/outline';
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

interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export default function SubProductsPage() {
  const router = useRouter();
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [defaultImages, setDefaultImages] = useState<{product_image: string, logo_image: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subProductsResponse, productsResponse, defaultImagesResponse] = await Promise.all([
        adminAPI.getSubProducts(),
        adminAPI.getProducts(),
        adminAPI.getDefaultImages()
      ]);
      
      setSubProducts(subProductsResponse.data);
      setProducts(productsResponse.data);
      setDefaultImages(defaultImagesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this sub-product?')) {
      try {
        await adminAPI.deleteSubProduct(id);
        toast.success('Sub-product deleted successfully');
        await fetchData(); // Refresh the list
      } catch (error: any) {
        console.error('Error deleting sub-product:', error);
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const handleView = (id: number) => {
    router.push(`/sub-products/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/sub-products/${id}/edit`);
  };

  const toggleStatus = async (subProduct: SubProduct) => {
    try {
      await adminAPI.updateSubProduct(subProduct.id, { is_active: !subProduct.is_active });
      toast.success('Sub-product status updated');
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    }
  };

  const parseJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  const getFirstImage = (imagesJson: string) => {
    const images = parseJSON(imagesJson);
    return images.length > 0 ? images[0] : (defaultImages?.product_image || 'https://picsum.photos/400/300?random=1');
  };

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const filteredSubProducts = subProducts.filter(subProduct => {
    const matchesSearch = subProduct.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subProduct.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subProduct.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subProduct.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProduct = selectedProduct ? subProduct.product_id === selectedProduct : true;
    const matchesFeatured = showFeaturedOnly ? subProduct.is_featured : true;
    
    return matchesSearch && matchesProduct && matchesFeatured;
  });

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

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sub Products</h1>
          <p className="text-gray-600">Manage your product catalog with detailed specifications</p>
        </div>
        <Link
          href="/sub-products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Sub Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, brand, model, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Product Filter */}
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedProduct || ''}
              onChange={(e) => setSelectedProduct(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Product Categories</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Filter */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700 flex items-center">
              <StarIcon className="h-4 w-4 mr-1" />
              Featured Only
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredSubProducts.length} of {subProducts.length} sub-products
      </div>

      {/* Sub Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubProducts.map((subProduct) => (
          <div key={subProduct.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              <Image
                src={getFirstImage(subProduct.images)}
                alt={subProduct.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImages?.product_image || 'https://picsum.photos/400/300?random=1';
                }}
              />
              {subProduct.is_featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <StarIconSolid className="h-3 w-3 mr-1" />
                  Featured
                </div>
              )}
              <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {subProduct.availability_status}
              </div>
              {!subProduct.is_active && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium">Inactive</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Brand and SKU */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600">{subProduct.brand}</span>
                <span className="text-xs text-gray-500">SKU: {subProduct.sku}</span>
              </div>

              {/* Product Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {subProduct.name}
              </h3>

              {/* Model and Product Category */}
              <div className="space-y-1 mb-3">
                <p className="text-sm text-gray-600">Model: {subProduct.model}</p>
                <p className="text-xs text-gray-500">Category: {getProductName(subProduct.product_id)}</p>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <span className="text-lg font-bold text-green-600">
                  {subProduct.price_range}
                </span>
                <span className="text-sm text-gray-500 ml-1">{subProduct.currency}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  href={`/sub-products/${subProduct.id}`}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 text-center flex items-center justify-center"
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View
                </Link>
                <Link
                  href={`/sub-products/${subProduct.id}/edit`}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center flex items-center justify-center"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(subProduct.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredSubProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1m16 0V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sub-products found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || selectedProduct || showFeaturedOnly
              ? 'Try adjusting your search criteria or filters.'
              : 'Get started by creating your first sub-product.'}
          </p>
          {!searchQuery && !selectedProduct && !showFeaturedOnly && (
            <Link
              href="/sub-products/create"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Sub Product
            </Link>
          )}
        </div>
      )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}