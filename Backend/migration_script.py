#!/usr/bin/env python3
"""
Migration script to populate the SNS database with initial data
based on the website scan information.
"""

import json
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models, crud, schemas
from app.auth import get_password_hash
from app.config import settings


def create_admin_user(db: Session):
    """Create the default admin user"""
    admin = crud.get_admin_by_username(db, settings.admin_username)
    if not admin:
        admin_data = schemas.AdminCreate(
            username=settings.admin_username,
            email=settings.admin_email,
            password=settings.admin_password
        )
        admin = crud.create_admin(db, admin_data)
        print(f"Created admin user: {admin.username}")
    else:
        print(f"Admin user already exists: {admin.username}")


def create_company_info(db: Session):
    """Create company information"""
    company_info = crud.get_company_info(db)
    if not company_info:
        company_data = schemas.CompanyInfoCreate(
            company_name="Star Network Solutions",
            address="Lilyrin Tower House No -39/1, 8th Floor, Road No -2, Dhanmondi, Dhaka 1205",
            phone="+8801897974300",
            email="info@snsbd.com",
            website="https://www.snsbd.com",
            mission="Our mission is to create sustainable and gainful business models to serve our customers. Our core value is maintaining '5S Operation Model' (Support, Strength, Standardization, Sustainability and Success) where we Support our stakeholders to increase their Strength for building Standardized & Sustainable solutions for all of our stakeholders to ascend them to Success.",
            vision="Our vision is to become one of the top business leaders in terms of providing sustainable technology-based advanced solutions to our customers.",
            about_us="SNS Founded in 2023, we have earning experience, continued success and a well-satisfied clientele. We are powered by highly skilled professionals, across various domains, whose experience can transform organizations. Star Network Solutions (SNS) is formed by passionate, tech-enthusiast and hardworking key people who dreamt of helping people and other businesses by adding technology-driven value to their services.",
            founded_year=2023,
            total_clients=70,
            total_brands=50,
            service_days_per_year=365
        )
        company_info = crud.create_company_info(db, company_data)
        print("Created company information")
    else:
        print("Company information already exists")


def create_categories(db: Session):
    """Create product and service categories"""
    categories_data = [
        {
            "name": "Network & Security",
            "description": "Network infrastructure and security solutions"
        },
        {
            "name": "Access Control & Attendance Systems",
            "description": "Access control and employee attendance management systems"
        },
        {
            "name": "Security Surveillance",
            "description": "Video surveillance and monitoring systems"
        },
        {
            "name": "Structured Cabling Product",
            "description": "Structured cabling and network infrastructure products"
        },
        {
            "name": "Software & Security",
            "description": "Software solutions and security applications"
        },
        {
            "name": "Robotic Process Automation (RPA)",
            "description": "Automation software and RPA solutions"
        },
        {
            "name": "Data Center Product",
            "description": "Data center infrastructure and equipment"
        },
        {
            "name": "IT Power Products",
            "description": "Power management and UPS solutions for IT infrastructure"
        },
        {
            "name": "Software Development",
            "description": "Custom software development services"
        },
        {
            "name": "IT Solutions",
            "description": "Complete IT infrastructure solutions"
        },
        {
            "name": "IT Services",
            "description": "Professional IT services and consulting"
        }
    ]
    
    created_categories = {}
    for cat_data in categories_data:
        category = crud.create_category(db, schemas.CategoryCreate(**cat_data))
        created_categories[cat_data["name"]] = category
        print(f"Created category: {category.name}")
    
    return created_categories


def create_products(db: Session, categories):
    """Create products based on website data"""
    products_data = [
        # Network & Security Products
        {
            "name": "Cisco Network Equipment",
            "description": "Enterprise-grade networking equipment from Cisco",
            "category_id": categories["Network & Security"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/19.png"
        },
        {
            "name": "Fortinet Security Solutions",
            "description": "Next-generation firewall and security solutions",
            "category_id": categories["Network & Security"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/1.png"
        },
        {
            "name": "Sophos Security Products",
            "description": "Endpoint and network security solutions",
            "category_id": categories["Network & Security"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/3.png"
        },
        {
            "name": "Palo Alto Networks",
            "description": "Advanced cybersecurity platform",
            "category_id": categories["Network & Security"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/4.png"
        },
        
        # Access Control Products
        {
            "name": "ZKTeco Access Control",
            "description": "Biometric access control and time attendance systems",
            "category_id": categories["Access Control & Attendance Systems"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/11.png"
        },
        {
            "name": "Hikvision Access Control",
            "description": "Professional access control solutions",
            "category_id": categories["Access Control & Attendance Systems"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/9.png"
        },
        
        # Surveillance Products
        {
            "name": "Hikvision CCTV Systems",
            "description": "Professional video surveillance systems",
            "category_id": categories["Security Surveillance"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/10.png"
        },
        {
            "name": "Dahua Security Cameras",
            "description": "High-quality security camera systems",
            "category_id": categories["Security Surveillance"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/21.png"
        },
        
        # Data Center Products
        {
            "name": "Dell EMC Storage Solutions",
            "description": "Enterprise storage and data management solutions",
            "category_id": categories["Data Center Product"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/30.png"
        },
        {
            "name": "HPE Server Solutions",
            "description": "High-performance enterprise servers",
            "category_id": categories["Data Center Product"].id,
            "image_url": "https://www.snsbd.com/assets/images/Web/slide-allience/31.png"
        }
    ]
    
    for prod_data in products_data:
        product = crud.create_product(db, schemas.ProductCreate(**prod_data))
        print(f"Created product: {product.name}")


def create_services(db: Session, categories):
    """Create services based on website data"""
    services_data = [
        {
            "name": "IT Consultancy",
            "description": "We partner with our customers to simplify, develop and transform the services supporting their businesses. We ensure the best levels of expert advisory and technical knowledge through a deep-set commitment, comprehensive industry expertise.",
            "category_id": categories["IT Services"].id,
            "features": json.dumps([
                "Analysis of existing IT solutions",
                "Strategy design and roadmap",
                "Performance tracking and optimization",
                "Future improvements planning"
            ])
        },
        {
            "name": "IT Management Service",
            "description": "SNS is Managed IT provider with over 2 years of experience in implementing infrastructure projects and outsourcing IT functions.",
            "category_id": categories["IT Services"].id,
            "features": json.dumps([
                "Comprehensive managed IT services",
                "Infrastructure project implementation",
                "IT function outsourcing",
                "Flexible and customizable solutions"
            ])
        },
        {
            "name": "Migration Service",
            "description": "Data Center Migration and IT system migration services without causing data loss.",
            "category_id": categories["IT Services"].id,
            "features": json.dumps([
                "Data center migration",
                "Cloud infrastructure migration",
                "Application migration",
                "Zero data loss guarantee"
            ])
        },
        {
            "name": "Installation & Configuration Service",
            "description": "Professional installation and configuration services for IT infrastructure and business systems.",
            "category_id": categories["IT Services"].id,
            "features": json.dumps([
                "Server setup and configuration",
                "Network infrastructure installation",
                "System optimization",
                "Technical support"
            ])
        },
        {
            "name": "IT Audit",
            "description": "Comprehensive examination and evaluation of an organization's information technology infrastructure, policies and operations.",
            "category_id": categories["IT Services"].id,
            "features": json.dumps([
                "IT infrastructure assessment",
                "Security evaluation",
                "Compliance checking",
                "Risk assessment"
            ])
        },
        {
            "name": "Software Development",
            "description": "Custom software development services for various business needs.",
            "category_id": categories["Software Development"].id,
            "features": json.dumps([
                "E-commerce Website Development",
                "POS & Stock Management Software",
                "Inventory Management System",
                "Hotel Booking System",
                "Courier Management System",
                "Payroll System",
                "WordPress Security & Recovery"
            ])
        }
    ]
    
    for serv_data in services_data:
        service = crud.create_service(db, schemas.ServiceCreate(**serv_data))
        print(f"Created service: {service.name}")


def create_solutions(db: Session):
    """Create solutions based on website data"""
    solutions_data = [
        {
            "name": "IT Security",
            "description": "Today's network architecture is complex and is faced with a threat environment that is always changing and attackers that are always trying to find and exploit vulnerabilities.",
            "features": json.dumps([
                "NGFW/UTM - Next Generation Firewall solutions",
                "Email Security - Protection against malware, spam and phishing",
                "DLP Solution - Data Loss Prevention for Enterprise & SMBs",
                "Network Security Management",
                "Vulnerability Assessment"
            ])
        },
        {
            "name": "Networking",
            "description": "Effective data communications is the key to ensure the reliable dissemination of information. Communication solutions depend on highly adaptive and resilient network infrastructure.",
            "features": json.dumps([
                "Wi-Fi Solutions - Enterprise wireless networking",
                "Audio/Video Conferencing - Multi-site collaboration tools",
                "IP Telephony Solution - Voice over IP systems",
                "LAN-WAN Networking - Wired and wireless solutions",
                "Network Infrastructure Design"
            ])
        },
        {
            "name": "Backup & Storage",
            "description": "Comprehensive backup and storage solutions for data protection and management.",
            "features": json.dumps([
                "Enterprise Backup Solutions",
                "Cloud Storage Integration",
                "Disaster Recovery Planning",
                "Data Archiving Systems"
            ])
        },
        {
            "name": "Server & Virtualization",
            "description": "Server & Virtualization consulting services to achieve high performance, reliability, connectivity and scalability.",
            "features": json.dumps([
                "Server Infrastructure Design",
                "Virtualization Implementation",
                "Storage Solutions",
                "Performance Optimization",
                "Scalability Planning"
            ])
        },
        {
            "name": "Robotic Process Automation (RPA)",
            "description": "Automation software to end repetitive tasks and make digital transformation a reality.",
            "features": json.dumps([
                "Process Automation",
                "Digital Transformation",
                "Workflow Optimization",
                "Task Automation",
                "Efficiency Improvement"
            ])
        }
    ]
    
    for sol_data in solutions_data:
        solution = crud.create_solution(db, schemas.SolutionCreate(**sol_data))
        print(f"Created solution: {solution.name}")


def create_customers(db: Session):
    """Create customer entries"""
    # Since we have customer logos from 1.png to 22.png, we'll create entries for them
    customers_data = []
    for i in range(1, 23):
        customers_data.append({
            "name": f"Customer {i}",
            "logo_url": f"https://www.snsbd.com/assets/images/Web/customers/{i}.png",
            "description": f"Valued customer partner {i}"
        })
    
    for cust_data in customers_data:
        customer = crud.create_customer(db, schemas.CustomerCreate(**cust_data))
        print(f"Created customer: {customer.name}")


def main():
    """Main migration function"""
    print("Starting SNS database migration...")
    
    # Create database tables
    models.Base.metadata.create_all(bind=engine)
    
    # Create database session
    db = SessionLocal()
    
    try:
        # Create admin user
        create_admin_user(db)
        
        # Create company information
        create_company_info(db)
        
        # Create categories
        categories = create_categories(db)
        
        # Create products
        create_products(db, categories)
        
        # Create services
        create_services(db, categories)
        
        # Create solutions
        create_solutions(db)
        
        # Create customers
        create_customers(db)
        
        print("\nMigration completed successfully!")
        print(f"Admin login: {settings.admin_username} / {settings.admin_password}")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()