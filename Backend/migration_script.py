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
    
    created_products = {}
    for prod_data in products_data:
        product = crud.create_product(db, schemas.ProductCreate(**prod_data))
        created_products[product.name] = product
        print(f"Created product: {product.name}")
    
    return created_products


def create_sub_products(db: Session, products):
    """Create sub-products with ecommerce-style information"""
    sub_products_data = [
        # Cisco Network Equipment Sub-products
        {
            "name": "Cisco Catalyst 9300 Series Switch",
            "description": "High-performance enterprise switch with advanced security features",
            "product_id": products["Cisco Network Equipment"].id,
            "sku": "C9300-48P-A",
            "brand": "Cisco",
            "model": "Catalyst 9300-48P",
            "specifications": json.dumps({
                "ports": "48 x 10/100/1000 Ethernet ports",
                "uplinks": "4 x 10G SFP+ uplinks",
                "switching_capacity": "176 Gbps",
                "forwarding_rate": "130.95 Mpps",
                "power_consumption": "435W",
                "dimensions": "44.5 x 44.5 x 4.4 cm"
            }),
            "features": json.dumps([
                "StackWise-480 technology",
                "Cisco DNA Center ready",
                "Advanced security features",
                "Energy efficient design",
                "Hot-swappable components"
            ]),
            "images": json.dumps([
                "https://www.cisco.com/c/dam/en/us/products/collateral/switches/catalyst-9300-series-switches/catalyst-9300-series-switches-ds.jpg"
            ]),
            "price_range": "$3,000 - $5,000",
            "availability_status": "Available",
            "warranty_info": "Limited lifetime hardware warranty",
            "support_info": "24/7 Cisco TAC support available",
            "documentation_url": "https://www.cisco.com/c/en/us/products/switches/catalyst-9300-series-switches/",
            "datasheet_url": "https://www.cisco.com/c/en/us/products/collateral/switches/catalyst-9300-series-switches/nb-06-cat9300-ser-data-sheet-cte-en.html",
            "tags": json.dumps(["enterprise", "switch", "network", "cisco", "catalyst"]),
            "meta_title": "Cisco Catalyst 9300 Series Switch - Enterprise Network Switch",
            "meta_description": "High-performance Cisco Catalyst 9300 series switch with 48 ports and advanced security features for enterprise networks.",
            "is_featured": True,
            "sort_order": 1
        },
        {
            "name": "Cisco ASR 1000 Series Router",
            "description": "Enterprise-class aggregation services router",
            "product_id": products["Cisco Network Equipment"].id,
            "sku": "ASR1001-X",
            "brand": "Cisco",
            "model": "ASR 1001-X",
            "specifications": json.dumps({
                "throughput": "Up to 20 Gbps",
                "interfaces": "6 built-in GE ports",
                "expansion_slots": "2 x SPA slots",
                "memory": "8 GB DRAM",
                "storage": "8 GB eUSB",
                "power_consumption": "550W"
            }),
            "features": json.dumps([
                "High availability design",
                "Advanced QoS capabilities",
                "Integrated security features",
                "Flexible interface options",
                "Carrier-grade reliability"
            ]),
            "images": json.dumps([
                "https://www.cisco.com/c/dam/en/us/products/routers/asr-1000-series-aggregation-services-routers/asr-1000-hero.jpg"
            ]),
            "price_range": "$15,000 - $25,000",
            "availability_status": "Available",
            "warranty_info": "1-year limited hardware warranty",
            "support_info": "Cisco SmartNet support recommended",
            "documentation_url": "https://www.cisco.com/c/en/us/products/routers/asr-1000-series-aggregation-services-routers/",
            "tags": json.dumps(["router", "enterprise", "cisco", "asr", "aggregation"]),
            "is_featured": True,
            "sort_order": 2
        },
        
        # Fortinet Security Solutions Sub-products
        {
            "name": "FortiGate 100F Next-Generation Firewall",
            "description": "Compact next-generation firewall for small to medium businesses",
            "product_id": products["Fortinet Security Solutions"].id,
            "sku": "FG-100F",
            "brand": "Fortinet",
            "model": "FortiGate 100F",
            "specifications": json.dumps({
                "firewall_throughput": "10 Gbps",
                "threat_protection_throughput": "1.8 Gbps",
                "ipsec_vpn_throughput": "9 Gbps",
                "concurrent_sessions": "500,000",
                "interfaces": "14 x GE RJ45 ports, 2 x SFP slots",
                "power_consumption": "65W"
            }),
            "features": json.dumps([
                "AI-powered security",
                "Advanced threat protection",
                "SD-WAN capabilities",
                "SSL inspection",
                "Application control",
                "Web filtering"
            ]),
            "images": json.dumps([
                "https://www.fortinet.com/content/dam/fortinet/images/products/fortigate/fortigate-100f.jpg"
            ]),
            "price_range": "$2,500 - $4,000",
            "availability_status": "Available",
            "warranty_info": "1-year hardware warranty",
            "support_info": "FortiCare support services available",
            "documentation_url": "https://www.fortinet.com/products/next-generation-firewall",
            "datasheet_url": "https://www.fortinet.com/content/dam/fortinet/assets/data-sheets/fortigate-100f.pdf",
            "tags": json.dumps(["firewall", "security", "fortinet", "ngfw", "threat-protection"]),
            "is_featured": True,
            "sort_order": 1
        },
        
        # Hikvision CCTV Systems Sub-products
        {
            "name": "Hikvision DS-2CD2385G1-I 8MP IP Camera",
            "description": "8MP outdoor bullet IP camera with IR illumination",
            "product_id": products["Hikvision CCTV Systems"].id,
            "sku": "DS-2CD2385G1-I",
            "brand": "Hikvision",
            "model": "DS-2CD2385G1-I",
            "specifications": json.dumps({
                "resolution": "8MP (3840 × 2160)",
                "lens": "2.8mm, 4mm, 6mm fixed lens",
                "ir_range": "Up to 30m",
                "compression": "H.265+/H.265/H.264+/H.264",
                "power": "12V DC, PoE+",
                "operating_temperature": "-40°C to 60°C"
            }),
            "features": json.dumps([
                "4K Ultra HD resolution",
                "Smart IR technology",
                "WDR (Wide Dynamic Range)",
                "3D DNR (Digital Noise Reduction)",
                "IP67 weatherproof rating",
                "ONVIF compliant"
            ]),
            "images": json.dumps([
                "https://www.hikvision.com/content/dam/hikvision/products/S000000001/S000000002/S000000003/DS-2CD2385G1-I.jpg"
            ]),
            "price_range": "$200 - $350",
            "availability_status": "Available",
            "warranty_info": "3-year manufacturer warranty",
            "support_info": "Technical support and firmware updates",
            "documentation_url": "https://www.hikvision.com/en/products/IP-Products/Network-Cameras/",
            "tags": json.dumps(["ip-camera", "surveillance", "hikvision", "8mp", "outdoor"]),
            "is_featured": True,
            "sort_order": 1
        },
        
        # ZKTeco Access Control Sub-products
        {
            "name": "ZKTeco SpeedFace-V5L Facial Recognition Terminal",
            "description": "Advanced facial recognition access control terminal",
            "product_id": products["ZKTeco Access Control"].id,
            "sku": "SpeedFace-V5L",
            "brand": "ZKTeco",
            "model": "SpeedFace-V5L",
            "specifications": json.dumps({
                "display": "4.3-inch touch screen",
                "camera": "Wide-angle dual camera",
                "face_capacity": "3,000 faces",
                "card_capacity": "10,000 cards",
                "transaction_capacity": "200,000",
                "communication": "TCP/IP, WiFi, USB"
            }),
            "features": json.dumps([
                "Visible light facial recognition",
                "Anti-spoofing algorithm",
                "Mask detection",
                "Temperature measurement",
                "Multiple authentication modes",
                "Mobile app support"
            ]),
            "images": json.dumps([
                "https://www.zkteco.com/uploads/product/SpeedFace-V5L.jpg"
            ]),
            "price_range": "$800 - $1,200",
            "availability_status": "Available",
            "warranty_info": "2-year manufacturer warranty",
            "support_info": "Technical support and software updates",
            "documentation_url": "https://www.zkteco.com/product/speedface-v5l",
            "tags": json.dumps(["access-control", "facial-recognition", "zkteco", "biometric", "terminal"]),
            "is_featured": True,
            "sort_order": 1
        },
        
        # Dell EMC Storage Solutions Sub-products
        {
            "name": "Dell PowerVault ME4024 Storage Array",
            "description": "Entry-level SAN storage array for small to medium businesses",
            "product_id": products["Dell EMC Storage Solutions"].id,
            "sku": "ME4024",
            "brand": "Dell EMC",
            "model": "PowerVault ME4024",
            "specifications": json.dumps({
                "drive_bays": "24 x 2.5-inch drive bays",
                "max_capacity": "576 TB",
                "controllers": "Dual active-active controllers",
                "host_interfaces": "16Gb FC, 10Gb iSCSI, 12Gb SAS",
                "cache": "8 GB per controller",
                "power": "Redundant power supplies"
            }),
            "features": json.dumps([
                "Automated tiering",
                "Thin provisioning",
                "Snapshot capabilities",
                "Replication support",
                "Easy management interface",
                "High availability design"
            ]),
            "images": json.dumps([
                "https://www.dell.com/content/dam/global-site-design/product_images/dell_emc_storage/powervault/me4024.jpg"
            ]),
            "price_range": "$8,000 - $15,000",
            "availability_status": "Available",
            "warranty_info": "3-year ProSupport warranty",
            "support_info": "Dell EMC support services",
            "documentation_url": "https://www.dell.com/en-us/work/shop/povw/powervault-me4024",
            "tags": json.dumps(["storage", "san", "dell-emc", "powervault", "array"]),
            "is_featured": True,
            "sort_order": 1
        }
    ]
    
    for sub_prod_data in sub_products_data:
        sub_product = crud.create_sub_product(db, schemas.SubProductCreate(**sub_prod_data))
        print(f"Created sub-product: {sub_product.name}")


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
        products = create_products(db, categories)
        
        # Create sub-products
        create_sub_products(db, products)
        
        # Create services
        create_services(db, categories)
        
        # Create solutions
        create_solutions(db)
        
        # Create customers
        create_customers(db)
        
        print("\nMigration completed successfully!")
        print(f"Admin login: {settings.admin_username} / {settings.admin_password}")
        print("Sub-products with ecommerce-style information have been created!")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()