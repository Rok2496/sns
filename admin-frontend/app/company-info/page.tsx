'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI, CompanyInfo, CompanyInfoUpdate } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CompanyInfoPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyInfoUpdate>();

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await adminAPI.getCompanyInfo();
      setCompanyInfo(response.data);
      reset(response.data);
    } catch (error) {
      toast.error('Failed to fetch company info');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CompanyInfoUpdate) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        founded_year: data.founded_year ? Number(data.founded_year) : undefined,
        total_clients: data.total_clients ? Number(data.total_clients) : undefined,
        total_brands: data.total_brands ? Number(data.total_brands) : undefined,
        service_days_per_year: data.service_days_per_year ? Number(data.service_days_per_year) : undefined,
      };

      await adminAPI.updateCompanyInfo(payload);
      toast.success('Company info updated successfully');
      fetchCompanyInfo();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    } finally {
      setSaving(false);
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

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Information</h1>
            <p className="mt-1 text-sm text-gray-500">
              Update your company details and statistics
            </p>
          </div>

          {/* Company Info Form */}
          <div className="admin-card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      {...register('company_name', { required: 'Company name is required' })}
                      type="text"
                      className="admin-input"
                      placeholder="Star Network Solutions"
                    />
                    {errors.company_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.company_name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Founded Year
                    </label>
                    <input
                      {...register('founded_year')}
                      type="number"
                      className="admin-input"
                      placeholder="2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="admin-input"
                      placeholder="info@snsbd.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      {...register('phone')}
                      type="text"
                      className="admin-input"
                      placeholder="+8801897974300"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      {...register('website')}
                      type="url"
                      className="admin-input"
                      placeholder="https://www.snsbd.com"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="admin-textarea"
                    placeholder="Lilyrin Tower House No -39/1, 8th Floor, Road No -2, Dhanmondi, Dhaka 1205"
                  />
                </div>
              </div>

              {/* Company Description */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Company Description</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      About Us
                    </label>
                    <textarea
                      {...register('about_us')}
                      rows={4}
                      className="admin-textarea"
                      placeholder="Brief description about the company..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mission
                    </label>
                    <textarea
                      {...register('mission')}
                      rows={4}
                      className="admin-textarea"
                      placeholder="Company mission statement..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vision
                    </label>
                    <textarea
                      {...register('vision')}
                      rows={4}
                      className="admin-textarea"
                      placeholder="Company vision statement..."
                    />
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Company Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Clients
                    </label>
                    <input
                      {...register('total_clients')}
                      type="number"
                      className="admin-input"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Brands
                    </label>
                    <input
                      {...register('total_brands')}
                      type="number"
                      className="admin-input"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Days Per Year
                    </label>
                    <input
                      {...register('service_days_per_year')}
                      type="number"
                      className="admin-input"
                      placeholder="365"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-button flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="spinner h-4 w-4"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Current Info Display */}
          {companyInfo && (
            <div className="admin-card">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Current Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Company:</span>
                  <span className="ml-2 text-gray-900">{companyInfo.company_name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Founded:</span>
                  <span className="ml-2 text-gray-900">{companyInfo.founded_year}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Clients:</span>
                  <span className="ml-2 text-gray-900">{companyInfo.total_clients}+</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Brands:</span>
                  <span className="ml-2 text-gray-900">{companyInfo.total_brands}+</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-900">{companyInfo.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="ml-2 text-gray-900">{companyInfo.phone}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}