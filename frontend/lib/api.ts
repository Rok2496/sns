import axios from 'axios';

// Local development API URL
const API_BASE_URL = 'http://localhost:8000';

// Production API URL (commented out)
// const API_BASE_URL = 'https://sns-38a5.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const apiEndpoints = {
  // Public endpoints
  getCompanyInfo: () => api.get('/public/company-info'),
  getCategories: () => api.get('/public/categories'),
  getProducts: () => api.get('/public/products'),
  getSubProducts: (productId?: number) => api.get('/public/sub-products', { params: { product_id: productId } }),
  getSubProduct: (id: number) => api.get(`/public/sub-products/${id}`),
  getSubProductsByProduct: (productId: number) => api.get(`/public/products/${productId}/sub-products`),
  getFeaturedSubProducts: (limit?: number) => api.get('/public/sub-products/featured', { params: { limit } }),
  searchSubProducts: (query: string, skip?: number, limit?: number) => api.get('/public/sub-products/search', { params: { q: query, skip, limit } }),
  getServices: () => api.get('/public/services'),
  getSolutions: () => api.get('/public/solutions'),
  getCustomers: () => api.get('/public/customers'),
  getDefaultImages: () => api.get('/public/default-images'),
};

// Types
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

export interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
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

export interface Solution {
  id: number;
  name: string;
  description: string;
  features: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
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

export default api;