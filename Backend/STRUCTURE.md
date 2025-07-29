# SNS Backend Project Structure

## 📁 Complete File Structure

```
Backend/
├── 📄 .env                    # Environment variables (configure before use)
├── 📄 .env.example           # Environment variables template
├── 📄 alembic.ini            # Alembic database migration configuration
├── 📄 main.py                # FastAPI application entry point
├── 📄 migration_script.py    # Database migration and data population
├── 📄 README.md              # Complete documentation
├── 📄 requirements.txt       # Python dependencies
├── 📄 run.py                 # Application runner script
├── 📄 setup.sh              # Automated setup script
├── 📄 STRUCTURE.md           # This file - project structure overview
└── 📁 app/                   # Main application package
    ├── 📄 __init__.py        # Package initialization
    ├── 📄 auth.py            # JWT authentication logic
    ├── 📄 config.py          # Environment configuration settings
    ├── 📄 crud.py            # Database CRUD operations
    ├── 📄 database.py        # Database connection and session management
    ├── 📄 models.py          # SQLAlchemy database models
    ├── 📄 schemas.py         # Pydantic request/response schemas
    └── 📁 routers/           # API route handlers
        ├── 📄 __init__.py    # Package initialization
        ├── 📄 admin.py       # Admin CRUD endpoints (protected)
        ├── 📄 auth.py        # Authentication endpoints
        └── 📄 public.py      # Public read-only endpoints
```

## 🔧 Core Components

### 📄 main.py
- FastAPI application initialization
- CORS middleware configuration
- Router inclusion
- Root endpoints

### 📄 run.py
- Application runner with uvicorn
- Development server configuration
- Port and host settings

### 📄 migration_script.py
- Database table creation
- Initial data population
- Admin user creation
- Company information setup
- Sample data insertion

## 📦 App Package Structure

### 📄 config.py
- Environment variable management
- Application settings
- Database configuration
- Security settings

### 📄 database.py
- SQLAlchemy engine setup
- Database session management
- Connection handling

### 📄 models.py
- **Admin**: User authentication model
- **Category**: Product/service categorization
- **Product**: Product catalog
- **Service**: Service offerings
- **Solution**: IT solutions
- **Customer**: Customer portfolio
- **CompanyInfo**: Company details

### 📄 schemas.py
- Pydantic models for API validation
- Request/response schemas
- Data validation rules
- Type definitions

### 📄 auth.py
- JWT token creation and validation
- Password hashing (bcrypt)
- Authentication middleware
- User verification

### 📄 crud.py
- Database CRUD operations
- Query functions
- Data manipulation
- Relationship handling

## 🛣️ Router Structure

### 📄 routers/auth.py
- `POST /auth/login` - Form-based login
- `POST /auth/login-json` - JSON-based login
- Token generation and validation

### 📄 routers/public.py
- `GET /public/categories` - Public category list
- `GET /public/products` - Public product list
- `GET /public/services` - Public service list
- `GET /public/solutions` - Public solution list
- `GET /public/customers` - Public customer list
- `GET /public/company-info` - Company information

### 📄 routers/admin.py
**Categories:**
- `GET /admin/categories` - List categories
- `POST /admin/categories` - Create category
- `GET /admin/categories/{id}` - Get category
- `PUT /admin/categories/{id}` - Update category
- `DELETE /admin/categories/{id}` - Delete category

**Products:**
- `GET /admin/products` - List products
- `POST /admin/products` - Create product
- `GET /admin/products/{id}` - Get product
- `PUT /admin/products/{id}` - Update product
- `DELETE /admin/products/{id}` - Delete product

**Services:**
- `GET /admin/services` - List services
- `POST /admin/services` - Create service
- `GET /admin/services/{id}` - Get service
- `PUT /admin/services/{id}` - Update service
- `DELETE /admin/services/{id}` - Delete service

**Solutions:**
- `GET /admin/solutions` - List solutions
- `POST /admin/solutions` - Create solution
- `GET /admin/solutions/{id}` - Get solution
- `PUT /admin/solutions/{id}` - Update solution
- `DELETE /admin/solutions/{id}` - Delete solution

**Customers:**
- `GET /admin/customers` - List customers
- `POST /admin/customers` - Create customer
- `GET /admin/customers/{id}` - Get customer
- `PUT /admin/customers/{id}` - Update customer
- `DELETE /admin/customers/{id}` - Delete customer

**Company Info:**
- `GET /admin/company-info` - Get company info
- `PUT /admin/company-info` - Update company info

## 🗄️ Database Schema

### Tables Created
1. **admins** - Admin user accounts
2. **categories** - Content categorization
3. **products** - Product catalog
4. **services** - Service offerings
5. **solutions** - IT solutions
6. **customers** - Customer portfolio
7. **company_info** - Company details

### Relationships
- Products → Categories (Many-to-One)
- Services → Categories (Many-to-One)

## 🔐 Security Implementation

### Authentication Flow
1. Admin submits credentials
2. Server validates against database
3. JWT token generated and returned
4. Token included in subsequent requests
5. Token validated on protected endpoints

### Password Security
- bcrypt hashing for password storage
- Salt rounds for additional security
- No plain text password storage

### API Security
- JWT token validation
- Protected admin endpoints
- CORS configuration
- Input validation with Pydantic

## 📊 Data Population

### Migration Script Creates
- **1 Admin User**: Default admin account
- **1 Company Info**: Complete SNS details
- **11 Categories**: All content categories
- **10 Products**: Sample products with images
- **6 Services**: Service offerings with features
- **5 Solutions**: IT solutions with descriptions
- **22 Customers**: Customer portfolio

## 🚀 Deployment Ready

### Production Checklist
- [ ] Update SECRET_KEY
- [ ] Set DEBUG=False
- [ ] Configure production database
- [ ] Set up HTTPS
- [ ] Configure CORS for production domains
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Environment Variables
All sensitive configuration through environment variables:
- Database credentials
- JWT secret key
- Admin credentials
- Application settings

## 🔧 Development Workflow

### Setup Process
1. Clone/copy Backend folder
2. Install dependencies: `pip install -r requirements.txt`
3. Configure `.env` file
4. Setup PostgreSQL database
5. Run migration: `python migration_script.py`
6. Start server: `python run.py`

### Development Commands
```bash
# Install dependencies
pip install -r requirements.txt

# Run migration
python migration_script.py

# Start development server
python run.py

# Access API docs
open http://localhost:8000/docs
```

This structure provides a complete, production-ready FastAPI backend with comprehensive documentation and easy setup process.