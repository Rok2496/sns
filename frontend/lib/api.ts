import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'https://sns-38a5.onrender.com';

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
  getServices: () => api.get('/public/services'),
  getSolutions: () => api.get('/public/solutions'),
  getCustomers: () => api.get('/public/customers'),
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