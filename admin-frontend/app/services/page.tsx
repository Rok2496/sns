'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI, Service, ServiceCreate, Category } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceCreate>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesResponse, categoriesResponse] = await Promise.all([
        adminAPI.getServices(),
        adminAPI.getCategories(),
      ]);
      setServices(servicesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ServiceCreate) => {
    try {
      const payload = {
        ...data,
        category_id: data.category_id ? Number(data.category_id) : undefined,
      };

      if (editingService) {
        await adminAPI.updateService(editingService.id, payload);
        toast.success('Service updated successfully');
      } else {
        await adminAPI.createService(payload);
        toast.success('Service created successfully');
      }
      fetchData();
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    reset({
      name: service.name,
      description: service.description,
      category_id: service.category_id,
      features: service.features,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await adminAPI.deleteService(id);
        toast.success('Service deleted successfully');
        fetchData();
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const toggleStatus = async (service: Service) => {
    try {
      await adminAPI.updateService(service.id, { is_active: !service.is_active });
      toast.success('Service status updated');
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'No Category';
  };

  const parseFeatures = (featuresString: string): string[] => {
    try {
      return JSON.parse(featuresString);
    } catch {
      return [];
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Services</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your service offerings
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="admin-button flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Service</span>
            </button>
          </div>

          {/* Services Table */}
          <div className="admin-card">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Features</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="font-medium">{service.name}</td>
                      <td className="max-w-xs truncate">{service.description}</td>
                      <td>{getCategoryName(service.category_id)}</td>
                      <td className="max-w-xs">
                        {service.features && (
                          <span className="text-sm text-gray-500">
                            {parseFeatures(service.features).length} features
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(service)}
                          className={`admin-badge ${
                            service.is_active ? 'admin-badge-success' : 'admin-badge-danger'
                          }`}
                        >
                          {service.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {editingService ? 'Edit Service' : 'Add Service'}
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
                        placeholder="Service name"
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
                        placeholder="Service description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        {...register('category_id')}
                        className="admin-select"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Features (JSON format)
                      </label>
                      <textarea
                        {...register('features')}
                        rows={4}
                        className="admin-textarea"
                        placeholder='["Feature 1", "Feature 2", "Feature 3"]'
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Enter features as a JSON array of strings
                      </p>
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
                        {editingService ? 'Update' : 'Create'}
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