# SNS Backend API

A comprehensive FastAPI backend application for Star Network Solutions (SNS) with PostgreSQL database, JWT authentication, and complete CRUD operations for website content management.

## 🚀 Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **PostgreSQL Database**: Robust relational database with SQLAlchemy ORM
- **JWT Authentication**: Secure admin-only authentication system
- **Complete CRUD Operations**: Full Create, Read, Update, Delete for all entities
- **Admin-Only Access**: Secure endpoints for content management
- **Environment Configuration**: All settings managed through .env file
- **Migration Script**: Automated database population with real SNS data
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation

## 📁 Project Structure

```
Backend/
├── app/
│   ├── __init__.py
│   ├── config.py          # Environment configuration settings
│   ├── database.py        # Database connection and session management
│   ├── models.py          # SQLAlchemy database models
│   ├── schemas.py         # Pydantic request/response schemas
│   ├── auth.py           # JWT authentication logic
│   ├── crud.py           # Database CRUD operations
│   └── routers/
│       ├── __init__.py
│       ├── auth.py       # Authentication endpoints
│       ├── admin.py      # Admin CRUD endpoints (protected)
│       └── public.py     # Public read-only endpoints
├── main.py               # FastAPI application entry point
├── run.py               # Application runner script
├── migration_script.py  # Database migration and data population
├── requirements.txt     # Python dependencies
├── alembic.ini         # Alembic database migration configuration
├── .env                # Environment variables (configure before use)
└── README.md           # This documentation
```

## 🗄️ Database Models

### Core Models

1. **Admin**
   - User management for admin authentication
   - Fields: username, email, hashed_password, is_active

2. **Category**
   - Product and service categorization
   - Fields: name, description, is_active

3. **Product**
   - Product catalog management
   - Fields: name, description, category_id, image_url, is_active
   - Relationship: belongs to Category

4. **Service**
   - Service offerings with features
   - Fields: name, description, category_id, features (JSON), is_active
   - Relationship: belongs to Category

5. **Solution**
   - IT solutions with detailed features
   - Fields: name, description, features (JSON), is_active

6. **Customer**
   - Customer portfolio management
   - Fields: name, logo_url, description, is_active

7. **CompanyInfo**
   - Company details and statistics
   - Fields: company_name, address, phone, email, website, mission, vision, about_us, founded_year, total_clients, total_brands, service_days_per_year

## 🔌 API Endpoints

### Authentication Endpoints
```
POST /auth/login          # Form-based login
POST /auth/login-json     # JSON-based login
```

### Public Endpoints (No Authentication Required)
```
GET /public/categories    # Get all active categories
GET /public/products      # Get all active products
GET /public/services      # Get all active services
GET /public/solutions     # Get all active solutions
GET /public/customers     # Get all active customers
GET /public/company-info  # Get company information
```

### Admin Endpoints (Authentication Required)

#### Categories
```
GET    /admin/categories           # List all categories
POST   /admin/categories           # Create new category
GET    /admin/categories/{id}      # Get category by ID
PUT    /admin/categories/{id}      # Update category
DELETE /admin/categories/{id}      # Delete category
```

#### Products
```
GET    /admin/products             # List all products
POST   /admin/products             # Create new product
GET    /admin/products/{id}        # Get product by ID
PUT    /admin/products/{id}        # Update product
DELETE /admin/products/{id}        # Delete product
```

#### Services
```
GET    /admin/services             # List all services
POST   /admin/services             # Create new service
GET    /admin/services/{id}        # Get service by ID
PUT    /admin/services/{id}        # Update service
DELETE /admin/services/{id}        # Delete service
```

#### Solutions
```
GET    /admin/solutions            # List all solutions
POST   /admin/solutions            # Create new solution
GET    /admin/solutions/{id}       # Get solution by ID
PUT    /admin/solutions/{id}       # Update solution
DELETE /admin/solutions/{id}       # Delete solution
```

#### Customers
```
GET    /admin/customers            # List all customers
POST   /admin/customers            # Create new customer
GET    /admin/customers/{id}       # Get customer by ID
PUT    /admin/customers/{id}       # Update customer
DELETE /admin/customers/{id}       # Delete customer
```

#### Company Information
```
GET    /admin/company-info         # Get company information
PUT    /admin/company-info         # Update company information
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

### 2. Database Setup
Create a PostgreSQL database:
```sql
CREATE DATABASE sns_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sns_db TO postgres;
```

### 3. Environment Configuration
Update the `.env` file with your settings:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/sns_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sns_db
DB_USER=postgres
DB_PASSWORD=your_password

# Security Configuration
SECRET_KEY=your-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@snsbd.com

# Application Configuration
APP_NAME=SNS Backend API
APP_VERSION=1.0.0
DEBUG=True
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run Database Migration
Populate the database with initial data:
```bash
python migration_script.py
```

### 6. Start the Application
```bash
python run.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 🔐 Authentication

### JWT Token Authentication
The API uses JSON Web Tokens (JWT) for secure authentication:

1. **Login**: Send credentials to `/auth/login-json`
2. **Receive Token**: Get JWT access token in response
3. **Use Token**: Include token in Authorization header: `Bearer <token>`
4. **Token Expiry**: Tokens expire after 30 minutes (configurable)

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@snsbd.com`

⚠️ **Important**: Change default credentials in production!

## 🗃️ Migration Script

The `migration_script.py` automatically populates the database with:

### Company Information
- Complete SNS company details
- Contact information
- Mission and vision statements
- Company statistics (70+ clients, 50+ brands, 365 service days)

### Categories (11 total)
- Network & Security
- Access Control & Attendance Systems
- Security Surveillance
- Structured Cabling Product
- Software & Security
- Robotic Process Automation (RPA)
- Data Center Product
- IT Power Products
- Software Development
- IT Solutions
- IT Services

### Products (10 total)
- Cisco Network Equipment
- Fortinet Security Solutions
- Sophos Security Products
- Palo Alto Networks
- ZKTeco Access Control
- Hikvision Access Control
- Hikvision CCTV Systems
- Dahua Security Cameras
- Dell EMC Storage Solutions
- HPE Server Solutions

### Services (6 total)
- IT Consultancy
- IT Management Service
- Migration Service
- Installation & Configuration Service
- IT Audit
- Software Development

### Solutions (5 total)
- IT Security
- Networking
- Backup & Storage
- Server & Virtualization
- Robotic Process Automation (RPA)

### Customers (22 total)
- Customer portfolio with logo references

## 🛡️ Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Admin-Only Access**: All modification endpoints require authentication
- **Token Expiration**: Configurable token lifetime
- **CORS Support**: Cross-origin resource sharing configuration

### Input Validation
- **Pydantic Schemas**: Request/response validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **Type Safety**: Strong typing with Python type hints

### Error Handling
- **Structured Errors**: Consistent error response format
- **HTTP Status Codes**: Proper status code usage
- **Detailed Messages**: Informative error messages for debugging

## 🔧 Development

### Adding New Features

1. **Models**: Add new database models in `app/models.py`
2. **Schemas**: Create Pydantic schemas in `app/schemas.py`
3. **CRUD**: Implement database operations in `app/crud.py`
4. **Routes**: Add API endpoints in appropriate router files
5. **Migration**: Update migration script if needed

### Database Migrations

Using Alembic for database schema changes:
```bash
# Generate migration
alembic revision --autogenerate -m "Description"

# Apply migration
alembic upgrade head

# Downgrade migration
alembic downgrade -1
```

### Testing

Test API endpoints using:
- **Swagger UI**: Interactive testing at `/docs`
- **curl**: Command-line testing
- **Postman**: API testing tool
- **pytest**: Unit testing framework

## 🚀 Production Deployment

### Environment Setup
1. **Set DEBUG=False** in production
2. **Use strong SECRET_KEY** (generate random key)
3. **Configure proper database** (production PostgreSQL)
4. **Set up HTTPS** with reverse proxy (nginx)
5. **Configure CORS** for production domains
6. **Use environment variables** for sensitive data

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Performance Optimization
- **Database Connection Pooling**: Configure SQLAlchemy pool
- **Caching**: Implement Redis for caching
- **Load Balancing**: Use multiple application instances
- **Database Indexing**: Add indexes for frequently queried fields

## 📊 Monitoring & Logging

### Application Monitoring
- **Health Check**: `/health` endpoint for monitoring
- **Metrics**: Application performance metrics
- **Error Tracking**: Structured error logging
- **Database Monitoring**: Query performance tracking

### Logging Configuration
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Authentication Failed**
   - Check admin credentials
   - Verify JWT secret key
   - Check token expiration

3. **Import Errors**
   - Install all requirements: `pip install -r requirements.txt`
   - Check Python version compatibility
   - Verify virtual environment activation

4. **Migration Errors**
   - Check database permissions
   - Verify database schema
   - Run migration script again

### Debug Mode
Enable debug mode in `.env`:
```env
DEBUG=True
```

This provides:
- Detailed error messages
- Auto-reload on code changes
- Enhanced logging

## 📞 Support

### Contact Information
- **Email**: info@snsbd.com
- **Phone**: +8801897974300
- **Website**: https://www.snsbd.com

### Documentation
- **API Docs**: http://localhost:8000/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **SQLAlchemy Docs**: https://docs.sqlalchemy.org/

## 📄 License

This project is proprietary to Star Network Solutions (SNS).

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Setup database (ensure PostgreSQL is running)
python migration_script.py

# Start development server
python run.py

# Access API documentation
open http://localhost:8000/docs

# Test API health
curl http://localhost:8000/health
```

The backend is now ready to serve the SNS website and admin panel with secure, scalable API endpoints!