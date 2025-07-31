from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
from app import models, schemas
from app.auth import get_password_hash


# Admin CRUD
def get_admin(db: Session, admin_id: int):
    return db.query(models.Admin).filter(models.Admin.id == admin_id).first()


def get_admin_by_username(db: Session, username: str):
    return db.query(models.Admin).filter(models.Admin.username == username).first()


def create_admin(db: Session, admin: schemas.AdminCreate):
    hashed_password = get_password_hash(admin.password)
    db_admin = models.Admin(
        username=admin.username,
        email=admin.email,
        hashed_password=hashed_password
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin


def update_admin(db: Session, admin_id: int, admin_update: schemas.AdminUpdate):
    db_admin = db.query(models.Admin).filter(models.Admin.id == admin_id).first()
    if db_admin:
        update_data = admin_update.dict(exclude_unset=True)
        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
        for field, value in update_data.items():
            setattr(db_admin, field, value)
        
        db.commit()
        db.refresh(db_admin)
    return db_admin


# Category CRUD
def get_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Category).offset(skip).limit(limit).all()


def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id == category_id).first()


def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def update_category(db: Session, category_id: int, category_update: schemas.CategoryUpdate):
    db_category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if db_category:
        update_data = category_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_category, field, value)
        db.commit()
        db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: int):
    db_category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if db_category:
        db.delete(db_category)
        db.commit()
    return db_category


# Product CRUD
def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()


def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        update_data = product_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_product, field, value)
        db.commit()
        db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product


# SubProduct CRUD
def get_sub_products(db: Session, skip: int = 0, limit: int = 100, product_id: Optional[int] = None):
    query = db.query(models.SubProduct)
    if product_id:
        query = query.filter(models.SubProduct.product_id == product_id)
    return query.offset(skip).limit(limit).all()


def get_sub_product(db: Session, sub_product_id: int):
    return db.query(models.SubProduct).filter(models.SubProduct.id == sub_product_id).first()


def get_sub_products_by_product(db: Session, product_id: int):
    return db.query(models.SubProduct).filter(
        and_(models.SubProduct.product_id == product_id, models.SubProduct.is_active == True)
    ).order_by(models.SubProduct.sort_order, models.SubProduct.name).all()


def get_featured_sub_products(db: Session, limit: int = 10):
    return db.query(models.SubProduct).filter(
        and_(models.SubProduct.is_featured == True, models.SubProduct.is_active == True)
    ).order_by(models.SubProduct.sort_order, models.SubProduct.name).limit(limit).all()


def create_sub_product(db: Session, sub_product: schemas.SubProductCreate):
    db_sub_product = models.SubProduct(**sub_product.dict())
    db.add(db_sub_product)
    db.commit()
    db.refresh(db_sub_product)
    return db_sub_product


def update_sub_product(db: Session, sub_product_id: int, sub_product_update: schemas.SubProductUpdate):
    db_sub_product = db.query(models.SubProduct).filter(models.SubProduct.id == sub_product_id).first()
    if db_sub_product:
        update_data = sub_product_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_sub_product, field, value)
        db.commit()
        db.refresh(db_sub_product)
    return db_sub_product


def delete_sub_product(db: Session, sub_product_id: int):
    db_sub_product = db.query(models.SubProduct).filter(models.SubProduct.id == sub_product_id).first()
    if db_sub_product:
        db.delete(db_sub_product)
        db.commit()
    return db_sub_product


def search_sub_products(db: Session, query: str, skip: int = 0, limit: int = 100):
    """Search sub products by name, brand, model, or tags"""
    search_filter = f"%{query}%"
    return db.query(models.SubProduct).filter(
        and_(
            models.SubProduct.is_active == True,
            (
                models.SubProduct.name.ilike(search_filter) |
                models.SubProduct.brand.ilike(search_filter) |
                models.SubProduct.model.ilike(search_filter) |
                models.SubProduct.tags.ilike(search_filter)
            )
        )
    ).offset(skip).limit(limit).all()


# Service CRUD
def get_services(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Service).offset(skip).limit(limit).all()


def get_service(db: Session, service_id: int):
    return db.query(models.Service).filter(models.Service.id == service_id).first()


def create_service(db: Session, service: schemas.ServiceCreate):
    db_service = models.Service(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


def update_service(db: Session, service_id: int, service_update: schemas.ServiceUpdate):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if db_service:
        update_data = service_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_service, field, value)
        db.commit()
        db.refresh(db_service)
    return db_service


def delete_service(db: Session, service_id: int):
    db_service = db.query(models.Service).filter(models.Service.id == service_id).first()
    if db_service:
        db.delete(db_service)
        db.commit()
    return db_service


# Solution CRUD
def get_solutions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Solution).offset(skip).limit(limit).all()


def get_solution(db: Session, solution_id: int):
    return db.query(models.Solution).filter(models.Solution.id == solution_id).first()


def create_solution(db: Session, solution: schemas.SolutionCreate):
    db_solution = models.Solution(**solution.dict())
    db.add(db_solution)
    db.commit()
    db.refresh(db_solution)
    return db_solution


def update_solution(db: Session, solution_id: int, solution_update: schemas.SolutionUpdate):
    db_solution = db.query(models.Solution).filter(models.Solution.id == solution_id).first()
    if db_solution:
        update_data = solution_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_solution, field, value)
        db.commit()
        db.refresh(db_solution)
    return db_solution


def delete_solution(db: Session, solution_id: int):
    db_solution = db.query(models.Solution).filter(models.Solution.id == solution_id).first()
    if db_solution:
        db.delete(db_solution)
        db.commit()
    return db_solution


# Customer CRUD
def get_customers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Customer).offset(skip).limit(limit).all()


def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()


def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


def update_customer(db: Session, customer_id: int, customer_update: schemas.CustomerUpdate):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if db_customer:
        update_data = customer_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_customer, field, value)
        db.commit()
        db.refresh(db_customer)
    return db_customer


def delete_customer(db: Session, customer_id: int):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if db_customer:
        db.delete(db_customer)
        db.commit()
    return db_customer


# Company Info CRUD
def get_company_info(db: Session):
    return db.query(models.CompanyInfo).first()


def create_company_info(db: Session, company_info: schemas.CompanyInfoCreate):
    db_company_info = models.CompanyInfo(**company_info.dict())
    db.add(db_company_info)
    db.commit()
    db.refresh(db_company_info)
    return db_company_info


def update_company_info(db: Session, company_info_update: schemas.CompanyInfoUpdate):
    db_company_info = db.query(models.CompanyInfo).first()
    if db_company_info:
        update_data = company_info_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_company_info, field, value)
        db.commit()
        db.refresh(db_company_info)
    return db_company_info