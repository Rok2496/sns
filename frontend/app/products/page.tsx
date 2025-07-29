'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { apiEndpoints, Product, Category } from '@/lib/api';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          apiEndpoints.getProducts(),
          apiEndpoints.getCategories()
        ]);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === parseInt(selectedCategory));

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Alliance Products</h1>
          <p className="text-xl opacity-90">Discover our comprehensive range of technology solutions</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id.toString())}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {categories.map((category) => {
        const categoryProducts = products.filter(product => product.category_id === category.id);
        
        if (categoryProducts.length === 0) return null;

        return (
          <section key={category.id} className="section-padding bg-white">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categoryProducts.map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-lg p-6 card-hover">
                    <div className="flex items-center justify-center h-32 mb-4">
                      <Image
                        src={product.image_url || '/images/alliance/placeholder.png'}
                        alt={product.name}
                        width={120}
                        height={80}
                        className="max-h-20 w-auto object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-gray-600 text-sm text-center">
                        {product.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Software Development Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Software Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Website Development',
              'E-commerce Website',
              'POS & Stock Management Software',
              'Inventory Management System',
              'Hotel Booking System',
              'Courier management system',
              'Payroll system',
              'WordPress hacked & malware infected website Recover'
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md card-hover">
                <div className="text-blue-600 text-2xl mb-3">💻</div>
                <h3 className="font-semibold text-gray-900 mb-2">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtered Products Display */}
      {selectedCategory !== 'all' && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {getCategoryName(parseInt(selectedCategory))} Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-lg p-6 card-hover">
                  <div className="flex items-center justify-center h-32 mb-4">
                    <Image
                      src={product.image_url || '/images/alliance/placeholder.png'}
                      alt={product.name}
                      width={150}
                      height={100}
                      className="max-h-24 w-auto object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-center">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-4 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {getCategoryName(product.category_id)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}