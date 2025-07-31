from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import crud, models, schemas
from app.auth import get_current_admin

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(get_current_admin)])


# Category endpoints
@router.get("/categories", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return categories


@router.post("/categories", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return crud.create_category(db=db, category=category)


@router.get("/categories/{category_id}", response_model=schemas.Category)
def read_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.get_category(db, category_id=category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category


@router.put("/categories/{category_id}", response_model=schemas.Category)
def update_category(
    category_id: int, 
    category_update: schemas.CategoryUpdate, 
    db: Session = Depends(get_db)
):
    db_category = crud.update_category(db, category_id=category_id, category_update=category_update)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category


@router.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.delete_category(db, category_id=category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}


# Product endpoints
@router.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products


@router.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, product=product)


@router.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@router.put("/products/{product_id}", response_model=schemas.Product)
def update_product(
    product_id: int, 
    product_update: schemas.ProductUpdate, 
    db: Session = Depends(get_db)
):
    db_product = crud.update_product(db, product_id=product_id, product_update=product_update)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.delete_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}


# SubProduct endpoints
@router.get("/sub-products", response_model=List[schemas.SubProduct])
def read_sub_products(
    skip: int = 0, 
    limit: int = 100, 
    product_id: int = None,
    db: Session = Depends(get_db)
):
    sub_products = crud.get_sub_products(db, skip=skip, limit=limit, product_id=product_id)
    return sub_products


@router.get("/products/{product_id}/sub-products", response_model=List[schemas.SubProduct])
def read_sub_products_by_product(product_id: int, db: Session = Depends(get_db)):
    # Verify product exists
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
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


@router.post("/sub-products", response_model=schemas.SubProduct)
def create_sub_product(sub_product: schemas.SubProductCreate, db: Session = Depends(get_db)):
    # Verify product exists
    db_product = crud.get_product(db, product_id=sub_product.product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return crud.create_sub_product(db=db, sub_product=sub_product)


@router.get("/sub-products/{sub_product_id}", response_model=schemas.SubProduct)
def read_sub_product(sub_product_id: int, db: Session = Depends(get_db)):
    db_sub_product = crud.get_sub_product(db, sub_product_id=sub_product_id)
    if db_sub_product is None:
        raise HTTPException(status_code=404, detail="SubProduct not found")
    return db_sub_product


@router.put("/sub-products/{sub_product_id}", response_model=schemas.SubProduct)
def update_sub_product(
    sub_product_id: int, 
    sub_product_update: schemas.SubProductUpdate, 
    db: Session = Depends(get_db)
):
    # If product_id is being updated, verify the new product exists
    if sub_product_update.product_id is not None:
        db_product = crud.get_product(db, product_id=sub_product_update.product_id)
        if db_product is None:
            raise HTTPException(status_code=404, detail="Product not found")
    
    db_sub_product = crud.update_sub_product(db, sub_product_id=sub_product_id, sub_product_update=sub_product_update)
    if db_sub_product is None:
        raise HTTPException(status_code=404, detail="SubProduct not found")
    return db_sub_product


@router.delete("/sub-products/{sub_product_id}")
def delete_sub_product(sub_product_id: int, db: Session = Depends(get_db)):
    db_sub_product = crud.delete_sub_product(db, sub_product_id=sub_product_id)
    if db_sub_product is None:
        raise HTTPException(status_code=404, detail="SubProduct not found")
    return {"message": "SubProduct deleted successfully"}


# Service endpoints
@router.get("/services", response_model=List[schemas.Service])
def read_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    services = crud.get_services(db, skip=skip, limit=limit)
    return services


@router.post("/services", response_model=schemas.Service)
def create_service(service: schemas.ServiceCreate, db: Session = Depends(get_db)):
    return crud.create_service(db=db, service=service)


@router.get("/services/{service_id}", response_model=schemas.Service)
def read_service(service_id: int, db: Session = Depends(get_db)):
    db_service = crud.get_service(db, service_id=service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service


@router.put("/services/{service_id}", response_model=schemas.Service)
def update_service(
    service_id: int, 
    service_update: schemas.ServiceUpdate, 
    db: Session = Depends(get_db)
):
    db_service = crud.update_service(db, service_id=service_id, service_update=service_update)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service


@router.delete("/services/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    db_service = crud.delete_service(db, service_id=service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}


# Solution endpoints
@router.get("/solutions", response_model=List[schemas.Solution])
def read_solutions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    solutions = crud.get_solutions(db, skip=skip, limit=limit)
    return solutions


@router.post("/solutions", response_model=schemas.Solution)
def create_solution(solution: schemas.SolutionCreate, db: Session = Depends(get_db)):
    return crud.create_solution(db=db, solution=solution)


@router.get("/solutions/{solution_id}", response_model=schemas.Solution)
def read_solution(solution_id: int, db: Session = Depends(get_db)):
    db_solution = crud.get_solution(db, solution_id=solution_id)
    if db_solution is None:
        raise HTTPException(status_code=404, detail="Solution not found")
    return db_solution


@router.put("/solutions/{solution_id}", response_model=schemas.Solution)
def update_solution(
    solution_id: int, 
    solution_update: schemas.SolutionUpdate, 
    db: Session = Depends(get_db)
):
    db_solution = crud.update_solution(db, solution_id=solution_id, solution_update=solution_update)
    if db_solution is None:
        raise HTTPException(status_code=404, detail="Solution not found")
    return db_solution


@router.delete("/solutions/{solution_id}")
def delete_solution(solution_id: int, db: Session = Depends(get_db)):
    db_solution = crud.delete_solution(db, solution_id=solution_id)
    if db_solution is None:
        raise HTTPException(status_code=404, detail="Solution not found")
    return {"message": "Solution deleted successfully"}


# Customer endpoints
@router.get("/customers", response_model=List[schemas.Customer])
def read_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    customers = crud.get_customers(db, skip=skip, limit=limit)
    return customers


@router.post("/customers", response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db=db, customer=customer)


@router.get("/customers/{customer_id}", response_model=schemas.Customer)
def read_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = crud.get_customer(db, customer_id=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_customer


@router.put("/customers/{customer_id}", response_model=schemas.Customer)
def update_customer(
    customer_id: int, 
    customer_update: schemas.CustomerUpdate, 
    db: Session = Depends(get_db)
):
    db_customer = crud.update_customer(db, customer_id=customer_id, customer_update=customer_update)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return db_customer


@router.delete("/customers/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = crud.delete_customer(db, customer_id=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"message": "Customer deleted successfully"}


# Company Info endpoints
@router.get("/company-info", response_model=schemas.CompanyInfo)
def read_company_info(db: Session = Depends(get_db)):
    company_info = crud.get_company_info(db)
    if company_info is None:
        raise HTTPException(status_code=404, detail="Company info not found")
    return company_info


@router.put("/company-info", response_model=schemas.CompanyInfo)
def update_company_info(
    company_info_update: schemas.CompanyInfoUpdate, 
    db: Session = Depends(get_db)
):
    db_company_info = crud.update_company_info(db, company_info_update=company_info_update)
    if db_company_info is None:
        raise HTTPException(status_code=404, detail="Company info not found")
    return db_company_info