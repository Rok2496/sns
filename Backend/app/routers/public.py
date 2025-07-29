from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/categories", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return [cat for cat in categories if cat.is_active]


@router.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return [prod for prod in products if prod.is_active]


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