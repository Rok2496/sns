'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI, Category, CategoryCreate, CategoryUpdate } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryCreate>();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CategoryCreate) => {
    try {
      if (editingCategory) {
        await adminAPI.updateCategory(editingCategory.id, data);
        toast.success('Category updated successfully');
      } else {
        await adminAPI.createCategory(data);
        toast.success('Category created successfully');
      }
      fetchCategories();
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    reset({
      name: category.name,
      description: category.description,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await adminAPI.deleteCategory(id);
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const toggleStatus = async (category: Category) => {
    try {
      await adminAPI.updateCategory(category.id, { is_active: !category.is_active });
      toast.success('Category status updated');
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage product and service categories
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="admin-button flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Categories Table */}
          <div className="admin-card">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="font-medium">{category.name}</td>
                      <td className="max-w-xs truncate">{category.description}</td>
                      <td>
                        <button
                          onClick={() => toggleStatus(category)}
                          className={`admin-badge ${
                            category.is_active ? 'admin-badge-success' : 'admin-badge-danger'
                          }`}
                        >
                          {category.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>{new Date(category.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
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
                    {editingCategory ? 'Edit Category' : 'Add Category'}
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
                        placeholder="Category name"
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
                        placeholder="Category description"
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
                        {editingCategory ? 'Update' : 'Create'}
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