from pydantic import BaseSettings
from typing import Optional, List
import json
import os


class Settings(BaseSettings):
    # Environment Configuration
    environment: str = "development"
    
    # Database Configuration
    database_url: str
    db_host: str = "localhost"
    db_port: int = 5432
    db_name: str = "sns_db"
    db_user: str = "postgres"
    db_password: str = "password"
    
    # Security Configuration
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Admin Configuration
    admin_username: str = "admin"
    admin_password: str = "admin123"
    admin_email: str = "admin@snsbd.com"
    
    # Application Configuration
    app_name: str = "SNS Backend API"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # API URLs Configuration
    api_base_url: str = "http://localhost:8000"
    
    # Frontend URLs Configuration
    frontend_url: str = "http://localhost:3000"
    admin_frontend_url: str = "http://localhost:3001"
    
    # CORS Configuration
    cors_origins: str = '["http://localhost:3000","http://localhost:3001","http://127.0.0.1:3000","http://127.0.0.1:3001"]'
    
    # Default Images Configuration
    default_product_image: str = "https://picsum.photos/400/300?random=1"
    default_logo_image: str = "https://picsum.photos/200/100?random=2"
    
    @property
    def is_production(self) -> bool:
        """Check if running in production environment"""
        return self.environment.lower() == "production"
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins from string to list"""
        try:
            return json.loads(self.cors_origins)
        except:
            return ["http://localhost:3000", "http://localhost:3001"]

    class Config:
        env_file = ".env"


settings = Settings()