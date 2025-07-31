from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# Admin Schemas
class AdminBase(BaseModel):
    username: str
    email: EmailStr


class AdminCreate(AdminBase):
    password: str


class AdminUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None


class Admin(AdminBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Category Schemas
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None


class Category(CategoryBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    category_id: Optional[int] = None
    image_url: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[int] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class Product(ProductBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    category: Optional[Category] = None

    class Config:
        from_attributes = True


# SubProduct Schemas
class SubProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    product_id: int
    sku: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    specifications: Optional[str] = None
    features: Optional[str] = None
    images: Optional[str] = None
    price_range: Optional[str] = None
    currency: Optional[str] = "USD"
    availability_status: Optional[str] = "Available"
    warranty_info: Optional[str] = None
    support_info: Optional[str] = None
    documentation_url: Optional[str] = None
    datasheet_url: Optional[str] = None
    tags: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    is_featured: Optional[bool] = False
    sort_order: Optional[int] = 0


class SubProductCreate(SubProductBase):
    pass


class SubProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    product_id: Optional[int] = None
    sku: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    specifications: Optional[str] = None
    features: Optional[str] = None
    images: Optional[str] = None
    price_range: Optional[str] = None
    currency: Optional[str] = None
    availability_status: Optional[str] = None
    warranty_info: Optional[str] = None
    support_info: Optional[str] = None
    documentation_url: Optional[str] = None
    datasheet_url: Optional[str] = None
    tags: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None
    sort_order: Optional[int] = None


class SubProduct(SubProductBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Service Schemas
class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    category_id: Optional[int] = None
    features: Optional[str] = None


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[int] = None
    features: Optional[str] = None
    is_active: Optional[bool] = None


class Service(ServiceBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    category: Optional[Category] = None

    class Config:
        from_attributes = True


# Solution Schemas
class SolutionBase(BaseModel):
    name: str
    description: Optional[str] = None
    features: Optional[str] = None


class SolutionCreate(SolutionBase):
    pass


class SolutionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    features: Optional[str] = None
    is_active: Optional[bool] = None


class Solution(SolutionBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Customer Schemas
class CustomerBase(BaseModel):
    name: str
    logo_url: Optional[str] = None
    description: Optional[str] = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None


class Customer(CustomerBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Company Info Schemas
class CompanyInfoBase(BaseModel):
    company_name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    mission: Optional[str] = None
    vision: Optional[str] = None
    about_us: Optional[str] = None
    founded_year: Optional[int] = None
    total_clients: Optional[int] = None
    total_brands: Optional[int] = None
    service_days_per_year: Optional[int] = None


class CompanyInfoCreate(CompanyInfoBase):
    pass


class CompanyInfoUpdate(BaseModel):
    company_name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    mission: Optional[str] = None
    vision: Optional[str] = None
    about_us: Optional[str] = None
    founded_year: Optional[int] = None
    total_clients: Optional[int] = None
    total_brands: Optional[int] = None
    service_days_per_year: Optional[int] = None


class CompanyInfo(CompanyInfoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class LoginRequest(BaseModel):
    username: str
    password: str