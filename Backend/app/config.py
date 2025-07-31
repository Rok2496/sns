from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
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
    
    # Default Images Configuration
    default_product_image: str = "https://picsum.photos/400/300?random=1"
    default_logo_image: str = "https://picsum.photos/200/100?random=2"

    class Config:
        env_file = ".env"


settings = Settings()