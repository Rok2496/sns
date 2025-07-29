'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { adminAPI, Solution, SolutionCreate } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Solutions() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SolutionCreate>();

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const response = await adminAPI.getSolutions();
      setSolutions(response.data);
    } catch (error) {
      toast.error('Failed to fetch solutions');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SolutionCreate) => {
    try {
      if (editingSolution) {
        await adminAPI.updateSolution(editingSolution.id, data);
        toast.success('Solution updated successfully');
      } else {
        await adminAPI.createSolution(data);
        toast.success('Solution created successfully');
      }
      fetchSolutions();
      closeModal();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Operation failed');
    }
  };

  const handleEdit = (solution: Solution) => {
    setEditingSolution(solution);
    reset({
      name: solution.name,
      description: solution.description,
      features: solution.features,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this solution?')) {
      try {
        await adminAPI.deleteSolution(id);
        toast.success('Solution deleted successfully');
        fetchSolutions();
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Delete failed');
      }
    }
  };

  const toggleStatus = async (solution: Solution) => {
    try {
      await adminAPI.updateSolution(solution.id, { is_active: !solution.is_active });
      toast.success('Solution status updated');
      fetchSolutions();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Update failed');
    }
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
    setEditingSolution(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Solutions</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your IT solutions
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="admin-button flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Solution</span>
            </button>
          </div>

          {/* Solutions Table */}
          <div className="admin-card">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Features</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {solutions.map((solution) => (
                    <tr key={solution.id}>
                      <td className="font-medium">{solution.name}</td>
                      <td className="max-w-xs truncate">{solution.description}</td>
                      <td className="max-w-xs">
                        {solution.features && (
                          <span className="text-sm text-gray-500">
                            {parseFeatures(solution.features).length} features
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => toggleStatus(solution)}
                          className={`admin-badge ${
                            solution.is_active ? 'admin-badge-success' : 'admin-badge-danger'
                          }`}
                        >
                          {solution.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>{new Date(solution.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(solution)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(solution.id)}
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
                    {editingSolution ? 'Edit Solution' : 'Add Solution'}
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
                        placeholder="Solution name"
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
                        rows={4}
                        className="admin-textarea"
                        placeholder="Solution description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Features (JSON format)
                      </label>
                      <textarea
                        {...register('features')}
                        rows={6}
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
                        {editingSolution ? 'Update' : 'Create'}
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