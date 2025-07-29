'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI, Customer, CustomerCreate } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CustomerCreate>();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await adminAPI.getCustomers();
      setCustomers(response.data);
    } catch (error) {
      toast.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CustomerCreate) => {
    try {
      if (editingCustomer) {
        await adminAPI.updateCustomer(editingCustomer.id, data);
        toast.success('Customer updated successfully');
      } else {
        await adminAPI.createCustomer(data);
        toast.success('Customer created successfully');
      }
      fetchCustomers();
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    reset({
      name: customer.name,
      description: customer.description,
      logo_url: customer.logo_url,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await adminAPI.deleteCustomer(id);
        toast.success('Customer deleted successfully');
        fetchCustomers();
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const toggleStatus = async (customer: Customer) => {
    try {
      await adminAPI.updateCustomer(customer.id, { is_active: !customer.is_active });
      toast.success('Customer status updated');
      fetchCustomers();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
    reset();
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your customer portfolio
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="admin-button flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Customer</span>
            </button>
          </div>

          {/* Customers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {customers.map((customer) => (
              <div key={customer.id} className="admin-card">
                <div className="flex items-center justify-center h-24 mb-4 bg-gray-50 rounded-lg">
                  {customer.logo_url ? (
                    <img
                      src={customer.logo_url}
                      alt={customer.name}
                      className="max-h-16 max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No Logo</div>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{customer.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{customer.description}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleStatus(customer)}
                    className={`admin-badge ${
                      customer.is_active ? 'admin-badge-success' : 'admin-badge-danger'
                    }`}
                  >
                    {customer.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {editingCustomer ? 'Edit Customer' : 'Add Customer'}
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="admin-input"
                        placeholder="Customer name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        {...register('description')}
                        rows={3}
                        className="admin-textarea"
                        placeholder="Customer description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logo URL
                      </label>
                      <input
                        {...register('logo_url')}
                        type="url"
                        className="admin-input"
                        placeholder="https://example.com/logo.jpg"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="admin-button-secondary"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="admin-button">
                        {editingCustomer ? 'Update' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}