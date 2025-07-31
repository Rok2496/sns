from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    products = relationship("Product", back_populates="category")
    services = relationship("Service", back_populates="category")


class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    category_id = Column(Integer, ForeignKey("categories.id"))
    image_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    category = relationship("Category", back_populates="products")
    sub_products = relationship("SubProduct", back_populates="product", cascade="all, delete-orphan")


class SubProduct(Base):
    __tablename__ = "sub_products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    # Ecommerce-style fields
    sku = Column(String(100), unique=True, index=True)  # Stock Keeping Unit
    brand = Column(String(100))
    model = Column(String(100))
    specifications = Column(Text)  # JSON string of technical specs
    features = Column(Text)  # JSON string of features
    images = Column(Text)  # JSON array of image URLs
    
    # Informational pricing (for display only, no actual selling)
    price_range = Column(String(100))  # e.g., "$1000 - $2000"
    currency = Column(String(10), default="USD")
    
    # Additional ecommerce-style info
    availability_status = Column(String(50), default="Available")  # Available, Out of Stock, Discontinued
    warranty_info = Column(Text)
    support_info = Column(Text)
    documentation_url = Column(String(500))
    datasheet_url = Column(String(500))
    
    # SEO and categorization
    tags = Column(Text)  # JSON array of tags
    meta_title = Column(String(200))
    meta_description = Column(Text)
    
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    product = relationship("Product", back_populates="sub_products")


class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    category_id = Column(Integer, ForeignKey("categories.id"))
    features = Column(Text)  # JSON string of features
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    category = relationship("Category", back_populates="services")


class Solution(Base):
    __tablename__ = "solutions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    features = Column(Text)  # JSON string of features
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    logo_url = Column(String(500))
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class CompanyInfo(Base):
    __tablename__ = "company_info"
    
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(200), nullable=False)
    address = Column(Text)
    phone = Column(String(50))
    email = Column(String(100))
    website = Column(String(200))
    mission = Column(Text)
    vision = Column(Text)
    about_us = Column(Text)
    founded_year = Column(Integer)
    total_clients = Column(Integer, default=0)
    total_brands = Column(Integer, default=0)
    service_days_per_year = Column(Integer, default=365)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())