'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI } from '@/lib/api';
import {
  TagIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  categories: number;
  products: number;
  services: number;
  solutions: number;
  customers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    categories: 0,
    products: 0,
    services: 0,
    solutions: 0,
    customers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categories, products, services, solutions, customers] = await Promise.all([
          adminAPI.getCategories(),
          adminAPI.getProducts(),
          adminAPI.getServices(),
          adminAPI.getSolutions(),
          adminAPI.getCustomers(),
        ]);

        setStats({
          categories: categories.data.length,
          products: products.data.length,
          services: services.data.length,
          solutions: solutions.data.length,
          customers: customers.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Categories',
      value: stats.categories,
      icon: TagIcon,
      color: 'bg-blue-500',
      href: '/categories',
    },
    {
      name: 'Products',
      value: stats.products,
      icon: CubeIcon,
      color: 'bg-green-500',
      href: '/products',
    },
    {
      name: 'Services',
      value: stats.services,
      icon: WrenchScrewdriverIcon,
      color: 'bg-yellow-500',
      href: '/services',
    },
    {
      name: 'Solutions',
      value: stats.solutions,
      icon: LightBulbIcon,
      color: 'bg-purple-500',
      href: '/solutions',
    },
    {
      name: 'Customers',
      value: stats.customers,
      icon: UsersIcon,
      color: 'bg-red-500',
      href: '/customers',
    },
  ];

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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome to SNS Admin Panel. Manage your website content here.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {statCards.map((card) => (
              <div
                key={card.name}
                className="admin-card hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => window.location.href = card.href}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${card.color} rounded-md p-3`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {card.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="admin-card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/categories"
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <TagIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Manage Categories</p>
                  <p className="text-xs text-blue-700">Add, edit, or delete categories</p>
                </div>
              </a>
              
              <a
                href="/products"
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
              >
                <CubeIcon className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-900">Manage Products</p>
                  <p className="text-xs text-green-700">Add, edit, or delete products</p>
                </div>
              </a>
              
              <a
                href="/company-info"
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                <ChartBarIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-purple-900">Company Info</p>
                  <p className="text-xs text-purple-700">Update company details</p>
                </div>
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="admin-card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Total Categories</span>
                <span className="text-sm font-medium text-gray-900">{stats.categories}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Total Products</span>
                <span className="text-sm font-medium text-gray-900">{stats.products}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Total Services</span>
                <span className="text-sm font-medium text-gray-900">{stats.services}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Total Solutions</span>
                <span className="text-sm font-medium text-gray-900">{stats.solutions}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Total Customers</span>
                <span className="text-sm font-medium text-gray-900">{stats.customers}</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}