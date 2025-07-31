'use client';

import { useState, useEffect } from 'react';
import { apiEndpoints } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  StarIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  InformationCircleIcon
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
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [defaultImages, setDefaultImages] = useState<{product_image: string, logo_image: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subProductsResponse, productsResponse, defaultImagesResponse] = await Promise.all([
          apiEndpoints.getSubProducts(),
          apiEndpoints.getProducts(),
          apiEndpoints.getDefaultImages()
        ]);
        
        setSubProducts(subProductsResponse.data);
        setProducts(productsResponse.data);
        setDefaultImages(defaultImagesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  const filteredSubProducts = subProducts.filter(subProduct => {
    const matchesSearch = subProduct.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subProduct.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subProduct.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProduct = selectedProduct ? subProduct.product_id === selectedProduct : true;
    const matchesFeatured = showFeaturedOnly ? subProduct.is_featured : true;
    
    return matchesSearch && matchesProduct && matchesFeatured;
  });

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const getFirstImage = (imagesJson: string) => {
    const images = parseJSON(imagesJson);
    return images.length > 0 ? images[0] : (defaultImages?.product_image || 'https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Product+Image');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Catalog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of IT products with detailed specifications, 
              features, and technical information.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, models..."
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
                Featured Products Only
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredSubProducts.length} of {subProducts.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSubProducts.map((subProduct) => (
            <div key={subProduct.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <Image
                  src={getFirstImage(subProduct.images)}
                  alt={subProduct.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultImages?.product_image || 'https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Product+Image';
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
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Brand and Model */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{subProduct.brand}</span>
                  <span className="text-xs text-gray-500">SKU: {subProduct.sku}</span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {subProduct.name}
                </h3>

                {/* Model */}
                <p className="text-sm text-gray-600 mb-2">Model: {subProduct.model}</p>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {subProduct.description}
                </p>

                {/* Price Range */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-green-600">
                    {subProduct.price_range}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">{subProduct.currency}</span>
                </div>

                {/* Key Features */}
                {subProduct.features && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {parseJSON(subProduct.features).slice(0, 3).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    href={`/sub-products/${subProduct.id}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center flex items-center justify-center"
                  >
                    <InformationCircleIcon className="h-4 w-4 mr-1" />
                    View Details
                  </Link>
                  
                  {subProduct.datasheet_url && (
                    <a
                      href={subProduct.datasheet_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                    >
                      <DocumentTextIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>

                {/* Product Category */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Category: {getProductName(subProduct.product_id)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSubProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}