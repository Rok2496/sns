'use client';

// Generate static params for static export
export async function generateStaticParams() {
  // Return a few common static params to satisfy Next.js static export requirements
  // These will be pre-generated at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

// Enable dynamic routing for IDs not in generateStaticParams
export const dynamicParams = true;

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';


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

interface FormData {
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
}

export default function EditSubProductPage() {
  const params = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    product_id: 0,
    sku: '',
    brand: '',
    model: '',
    specifications: '{}',
    features: '[]',
    images: '[]',
    price_range: '',
    currency: 'USD',
    availability_status: 'Available',
    warranty_info: '',
    support_info: '',
    documentation_url: '',
    datasheet_url: '',
    tags: '[]',
    meta_title: '',
    meta_description: '',
    is_active: true,
    is_featured: false,
    sort_order: 0,
  });

  // Helper states for JSON fields
  const [specificationsList, setSpecificationsList] = useState<{key: string, value: string}[]>([]);
  const [featuresList, setFeaturesList] = useState<string[]>(['']);
  const [imagesList, setImagesList] = useState<string[]>(['']);
  const [tagsList, setTagsList] = useState<string[]>(['']);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      setInitialLoading(true);
      const [subProductResponse, productsResponse] = await Promise.all([
        adminAPI.getSubProduct(parseInt(params.id as string)),
        adminAPI.getProducts()
      ]);
      
      const subProduct: SubProduct = subProductResponse.data;
      setProducts(productsResponse.data);
      
      // Set form data
      setFormData({
        name: subProduct.name,
        description: subProduct.description,
        product_id: subProduct.product_id,
        sku: subProduct.sku,
        brand: subProduct.brand,
        model: subProduct.model,
        specifications: subProduct.specifications,
        features: subProduct.features,
        images: subProduct.images,
        price_range: subProduct.price_range,
        currency: subProduct.currency,
        availability_status: subProduct.availability_status,
        warranty_info: subProduct.warranty_info,
        support_info: subProduct.support_info,
        documentation_url: subProduct.documentation_url,
        datasheet_url: subProduct.datasheet_url,
        tags: subProduct.tags,
        meta_title: subProduct.meta_title,
        meta_description: subProduct.meta_description,
        is_active: subProduct.is_active,
        is_featured: subProduct.is_featured,
        sort_order: subProduct.sort_order,
      });

      // Parse JSON fields
      try {
        const specs = JSON.parse(subProduct.specifications);
        setSpecificationsList(Object.entries(specs).map(([key, value]) => ({ key, value: value as string })));
      } catch {
        setSpecificationsList([]);
      }

      try {
        const features = JSON.parse(subProduct.features);
        setFeaturesList(features.length > 0 ? features : ['']);
      } catch {
        setFeaturesList(['']);
      }

      try {
        const images = JSON.parse(subProduct.images);
        setImagesList(images.length > 0 ? images : ['']);
      } catch {
        setImagesList(['']);
      }

      try {
        const tags = JSON.parse(subProduct.tags);
        setTagsList(tags.length > 0 ? tags : ['']);
      } catch {
        setTagsList(['']);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specificationsList];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setSpecificationsList(newSpecs);
    
    const specsObject = newSpecs.reduce((acc, spec) => {
      if (spec.key && spec.value) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {} as Record<string, string>);
    
    setFormData(prev => ({ ...prev, specifications: JSON.stringify(specsObject) }));
  };

  const addSpecification = () => {
    setSpecificationsList([...specificationsList, { key: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    const newSpecs = specificationsList.filter((_, i) => i !== index);
    setSpecificationsList(newSpecs);
    
    const specsObject = newSpecs.reduce((acc, spec) => {
      if (spec.key && spec.value) {
        acc[spec.key] = spec.value;
      }
      return acc;
    }, {} as Record<string, string>);
    
    setFormData(prev => ({ ...prev, specifications: JSON.stringify(specsObject) }));
  };

  const handleListChange = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>, 
    index: number, 
    value: string,
    formField: keyof FormData
  ) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
    
    const filteredList = newList.filter(item => item.trim() !== '');
    setFormData(prev => ({ ...prev, [formField]: JSON.stringify(filteredList) }));
  };

  const addListItem = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList([...list, '']);
  };

  const removeListItem = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>, 
    index: number,
    formField: keyof FormData
  ) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    
    const filteredList = newList.filter(item => item.trim() !== '');
    setFormData(prev => ({ ...prev, [formField]: JSON.stringify(filteredList) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.product_id) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await adminAPI.updateSubProduct(parseInt(params.id as string), formData);
      router.push('/sub-products');
    } catch (error) {
      console.error('Error updating sub-product:', error);
      alert('Error updating sub-product');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          href="/sub-products"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Sub Product</h1>
          <p className="text-gray-600">Update sub-product information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Category *
              </label>
              <select
                name="product_id"
                value={formData.product_id}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a product category</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability Status
              </label>
              <select
                name="availability_status"
                value={formData.availability_status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
                <option value="Pre-order">Pre-order</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <input
                type="text"
                name="price_range"
                value={formData.price_range}
                onChange={handleInputChange}
                placeholder="e.g., $1000 - $2000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BDT">BDT</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
          
          {imagesList.map((image, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={image}
                onChange={(e) => handleListChange(imagesList, setImagesList, index, e.target.value, 'images')}
                placeholder="Enter image URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {imagesList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem(imagesList, setImagesList, index, 'images')}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addListItem(imagesList, setImagesList)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Image URL
          </button>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
          
          {featuresList.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleListChange(featuresList, setFeaturesList, index, e.target.value, 'features')}
                placeholder="Enter feature"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {featuresList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem(featuresList, setFeaturesList, index, 'features')}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addListItem(featuresList, setFeaturesList)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Feature
          </button>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h2>
          
          {specificationsList.map((spec, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                placeholder="Specification name"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                  placeholder="Specification value"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {specificationsList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addSpecification}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Specification
          </button>
        </div>

        {/* Support Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warranty Information
              </label>
              <textarea
                name="warranty_info"
                value={formData.warranty_info}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Information
              </label>
              <textarea
                name="support_info"
                value={formData.support_info}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documentation URL
                </label>
                <input
                  type="url"
                  name="documentation_url"
                  value={formData.documentation_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datasheet URL
                </label>
                <input
                  type="url"
                  name="datasheet_url"
                  value={formData.datasheet_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
          
          {tagsList.map((tag, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleListChange(tagsList, setTagsList, index, e.target.value, 'tags')}
                placeholder="Enter tag"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {tagsList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem(tagsList, setTagsList, index, 'tags')}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addListItem(tagsList, setTagsList)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Tag
          </button>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/sub-products"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Sub Product'}
          </button>
        </div>
      </form>
    </div>
  );
}