'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI, Product, ProductCreate, Category } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductCreate>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        adminAPI.getProducts(),
        adminAPI.getCategories(),
      ]);
      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductCreate) => {
    try {
      const payload = {
        ...data,
        category_id: data.category_id ? Number(data.category_id) : undefined,
      };

      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct.id, payload);
        toast.success('Product updated successfully');
      } else {
        await adminAPI.createProduct(payload);
        toast.success('Product created successfully');
      }
      fetchData();
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      image_url: product.image_url,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await adminAPI.deleteProduct(id);
        toast.success('Product deleted successfully');
        fetchData();
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const toggleStatus = async (product: Product) => {
    try {
      await adminAPI.updateProduct(product.id, { is_active: !product.is_active });
      toast.success('Product status updated');
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'No Category';
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your product catalog
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="admin-button flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="admin-card">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="font-medium">{product.name}</td>
                      <td className="max-w-xs truncate">{product.description}</td>
                      <td>{getCategoryName(product.category_id)}</td>
                      <td>
                        <button
                          onClick={() => toggleStatus(product)}
                          className={`admin-badge ${
                            product.is_active ? 'admin-badge-success' : 'admin-badge-danger'
                          }`}
                        >
                          {product.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>{new Date(product.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
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
                    {editingProduct ? 'Edit Product' : 'Add Product'}
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
                        placeholder="Product name"
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
                        placeholder="Product description"
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
                        Image URL
                      </label>
                      <input
                        {...register('image_url')}
                        type="url"
                        className="admin-input"
                        placeholder="https://example.com/image.jpg"
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
                        {editingProduct ? 'Update' : 'Create'}
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