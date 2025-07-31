from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routers import auth, admin, public
from app.config import settings

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="SNS Backend API for managing company information, products, services, and solutions"
)

# CORS middleware with custom origin validation
def is_allowed_origin(origin: str) -> bool:
    """Check if origin is allowed"""
    allowed_origins = settings.cors_origins_list
    
    # Check exact matches
    if origin in allowed_origins:
        return True
    
    # Check for Netlify preview deployments
    if origin and origin.endswith('.netlify.app'):
        return True
    
    # Check for localhost with any port
    if origin and (origin.startswith('http://localhost:') or origin.startswith('http://127.0.0.1:')):
        return True
    
    return False

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.netlify\.app",
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(public.router)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to SNS Backend API",
        "version": settings.app_version,
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}