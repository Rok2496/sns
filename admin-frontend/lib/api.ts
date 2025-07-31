import axios from 'axios';
import Cookies from 'js-cookie';

// Local development API URL
const API_BASE_URL = 'http://localhost:8000';

// Production API URL (commented out)
// const API_BASE_URL = 'https://sns-38a5.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    axios.post(`${API_BASE_URL}/auth/login-json`, credentials),
};

// Admin API endpoints
export const adminAPI = {
  // Categories
  getCategories: () => api.get('/admin/categories'),
  getCategory: (id: number) => api.get(`/admin/categories/${id}`),
  createCategory: (data: CategoryCreate) => api.post('/admin/categories', data),
  updateCategory: (id: number, data: CategoryUpdate) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/admin/categories/${id}`),

  // Products
  getProducts: () => api.get('/admin/products'),
  getProduct: (id: number) => api.get(`/admin/products/${id}`),
  createProduct: (data: ProductCreate) => api.post('/admin/products', data),
  updateProduct: (id: number, data: ProductUpdate) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/admin/products/${id}`),

  // SubProducts
  getSubProducts: (productId?: number) => api.get('/admin/sub-products', { params: { product_id: productId } }),
  getSubProduct: (id: number) => api.get(`/admin/sub-products/${id}`),
  getSubProductsByProduct: (productId: number) => api.get(`/admin/products/${productId}/sub-products`),
  getFeaturedSubProducts: (limit?: number) => api.get('/admin/sub-products/featured', { params: { limit } }),
  searchSubProducts: (query: string, skip?: number, limit?: number) => api.get('/admin/sub-products/search', { params: { q: query, skip, limit } }),
  createSubProduct: (data: SubProductCreate) => api.post('/admin/sub-products', data),
  updateSubProduct: (id: number, data: SubProductUpdate) => api.put(`/admin/sub-products/${id}`, data),
  deleteSubProduct: (id: number) => api.delete(`/admin/sub-products/${id}`),

  // Services
  getServices: () => api.get('/admin/services'),
  getService: (id: number) => api.get(`/admin/services/${id}`),
  createService: (data: ServiceCreate) => api.post('/admin/services', data),
  updateService: (id: number, data: ServiceUpdate) => api.put(`/admin/services/${id}`, data),
  deleteService: (id: number) => api.delete(`/admin/services/${id}`),

  // Solutions
  getSolutions: () => api.get('/admin/solutions'),
  getSolution: (id: number) => api.get(`/admin/solutions/${id}`),
  createSolution: (data: SolutionCreate) => api.post('/admin/solutions', data),
  updateSolution: (id: number, data: SolutionUpdate) => api.put(`/admin/solutions/${id}`, data),
  deleteSolution: (id: number) => api.delete(`/admin/solutions/${id}`),

  // Customers
  getCustomers: () => api.get('/admin/customers'),
  getCustomer: (id: number) => api.get(`/admin/customers/${id}`),
  createCustomer: (data: CustomerCreate) => api.post('/admin/customers', data),
  updateCustomer: (id: number, data: CustomerUpdate) => api.put(`/admin/customers/${id}`, data),
  deleteCustomer: (id: number) => api.delete(`/admin/customers/${id}`),

  // Company Info
  getCompanyInfo: () => api.get('/admin/company-info'),
  updateCompanyInfo: (data: CompanyInfoUpdate) => api.put('/admin/company-info', data),
  
  // Default Images
  getDefaultImages: () => api.get('/public/default-images'),
};

// Types
export interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface CategoryCreate {
  name: string;
  description?: string;
}

export interface CategoryUpdate {
  name?: string;
  description?: string;
  is_active?: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  category?: Category;
}

export interface ProductCreate {
  name: string;
  description?: string;
  category_id?: number;
  image_url?: string;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  category_id?: number;
  image_url?: string;
  is_active?: boolean;
}

export interface SubProduct {
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
  product?: Product;
}

export interface SubProductCreate {
  name: string;
  description?: string;
  product_id: number;
  sku?: string;
  brand?: string;
  model?: string;
  specifications?: string;
  features?: string;
  images?: string;
  price_range?: string;
  currency?: string;
  availability_status?: string;
  warranty_info?: string;
  support_info?: string;
  documentation_url?: string;
  datasheet_url?: string;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
  is_featured?: boolean;
  sort_order?: number;
}

export interface SubProductUpdate {
  name?: string;
  description?: string;
  product_id?: number;
  sku?: string;
  brand?: string;
  model?: string;
  specifications?: string;
  features?: string;
  images?: string;
  price_range?: string;
  currency?: string;
  availability_status?: string;
  warranty_info?: string;
  support_info?: string;
  documentation_url?: string;
  datasheet_url?: string;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
  is_active?: boolean;
  is_featured?: boolean;
  sort_order?: number;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  category_id: number;
  features: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  category?: Category;
}

export interface ServiceCreate {
  name: string;
  description?: string;
  category_id?: number;
  features?: string;
}

export interface ServiceUpdate {
  name?: string;
  description?: string;
  category_id?: number;
  features?: string;
  is_active?: boolean;
}

export interface Solution {
  id: number;
  name: string;
  description: string;
  features: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface SolutionCreate {
  name: string;
  description?: string;
  features?: string;
}

export interface SolutionUpdate {
  name?: string;
  description?: string;
  features?: string;
  is_active?: boolean;
}

export interface Customer {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface CustomerCreate {
  name: string;
  logo_url?: string;
  description?: string;
}

export interface CustomerUpdate {
  name?: string;
  logo_url?: string;
  description?: string;
  is_active?: boolean;
}

export interface CompanyInfo {
  id: number;
  company_name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  mission: string;
  vision: string;
  about_us: string;
  founded_year: number;
  total_clients: number;
  total_brands: number;
  service_days_per_year: number;
  created_at: string;
  updated_at: string | null;
}

export interface CompanyInfoUpdate {
  company_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  mission?: string;
  vision?: string;
  about_us?: string;
  founded_year?: number;
  total_clients?: number;
  total_brands?: number;
  service_days_per_year?: number;
}

export default api;