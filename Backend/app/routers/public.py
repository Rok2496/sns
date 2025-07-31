from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import crud, schemas
from app.config import settings

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/categories", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return [cat for cat in categories if cat.is_active]


@router.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return [prod for prod in products if prod.is_active]


@router.get("/sub-products", response_model=List[schemas.SubProduct])
def read_sub_products(
    skip: int = 0, 
    limit: int = 100, 
    product_id: int = None,
    db: Session = Depends(get_db)
):
    sub_products = crud.get_sub_products(db, skip=skip, limit=limit, product_id=product_id)
    return [sub_prod for sub_prod in sub_products if sub_prod.is_active]


@router.get("/products/{product_id}/sub-products", response_model=List[schemas.SubProduct])
def read_sub_products_by_product(product_id: int, db: Session = Depends(get_db)):
    sub_products = crud.get_sub_products_by_product(db, product_id=product_id)
    return sub_products


@router.get("/sub-products/featured", response_model=List[schemas.SubProduct])
def read_featured_sub_products(limit: int = 10, db: Session = Depends(get_db)):
    sub_products = crud.get_featured_sub_products(db, limit=limit)
    return sub_products


@router.get("/sub-products/search", response_model=List[schemas.SubProduct])
def search_sub_products(
    q: str, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    sub_products = crud.search_sub_products(db, query=q, skip=skip, limit=limit)
    return sub_products


@router.get("/sub-products/{sub_product_id}", response_model=schemas.SubProduct)
def read_sub_product(sub_product_id: int, db: Session = Depends(get_db)):
    db_sub_product = crud.get_sub_product(db, sub_product_id=sub_product_id)
    if db_sub_product is None or not db_sub_product.is_active:
        raise HTTPException(status_code=404, detail="SubProduct not found")
    return db_sub_product


@router.get("/services", response_model=List[schemas.Service])
def read_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    services = crud.get_services(db, skip=skip, limit=limit)
    return [serv for serv in services if serv.is_active]


@router.get("/solutions", response_model=List[schemas.Solution])
def read_solutions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    solutions = crud.get_solutions(db, skip=skip, limit=limit)
    return [sol for sol in solutions if sol.is_active]


@router.get("/customers", response_model=List[schemas.Customer])
def read_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    customers = crud.get_customers(db, skip=skip, limit=limit)
    return [cust for cust in customers if cust.is_active]


@router.get("/company-info", response_model=schemas.CompanyInfo)
def read_company_info(db: Session = Depends(get_db)):
    company_info = crud.get_company_info(db)
    if company_info is None:
        raise HTTPException(status_code=404, detail="Company info not found")
    return company_info


@router.get("/default-images")
def get_default_images():
    """Get default placeholder image URLs"""
    return {
        "product_image": settings.default_product_image,
        "logo_image": settings.default_logo_image
    }