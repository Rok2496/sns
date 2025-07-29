#!/usr/bin/env python3
"""
Quick API test script for SNS Backend
Tests basic functionality and endpoints
"""

import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure it's running on port 8000")
        return False

def test_public_endpoints():
    """Test public endpoints"""
    endpoints = [
        "/public/company-info",
        "/public/categories",
        "/public/products",
        "/public/services",
        "/public/solutions",
        "/public/customers"
    ]
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ {endpoint} - {len(data) if isinstance(data, list) else 'OK'}")
            else:
                print(f"❌ {endpoint} - Status: {response.status_code}")
        except Exception as e:
            print(f"❌ {endpoint} - Error: {e}")

def test_admin_login():
    """Test admin login"""
    try:
        login_data = {
            "username": "admin",
            "password": "admin123"
        }
        response = requests.post(f"{BASE_URL}/auth/login-json", json=login_data)
        
        if response.status_code == 200:
            token_data = response.json()
            print("✅ Admin login successful")
            return token_data.get("access_token")
        else:
            print(f"❌ Admin login failed: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Admin login error: {e}")
        return None

def test_admin_endpoints(token):
    """Test admin endpoints with authentication"""
    if not token:
        print("❌ No token available for admin tests")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    endpoints = [
        "/admin/categories",
        "/admin/products",
        "/admin/services",
        "/admin/solutions",
        "/admin/customers",
        "/admin/company-info"
    ]
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", headers=headers)
            if response.status_code == 200:
                data = response.json()
                count = len(data) if isinstance(data, list) else "OK"
                print(f"✅ {endpoint} - {count}")
            else:
                print(f"❌ {endpoint} - Status: {response.status_code}")
        except Exception as e:
            print(f"❌ {endpoint} - Error: {e}")

def main():
    """Main test function"""
    print("🧪 Testing SNS Backend API...")
    print("=" * 50)
    
    # Test basic connectivity
    if not test_health():
        print("\n❌ Server is not running. Please start the backend first:")
        print("   python run.py")
        sys.exit(1)
    
    print("\n📖 Testing public endpoints...")
    test_public_endpoints()
    
    print("\n🔐 Testing admin authentication...")
    token = test_admin_login()
    
    print("\n🛡️  Testing admin endpoints...")
    test_admin_endpoints(token)
    
    print("\n" + "=" * 50)
    print("🎉 API testing completed!")
    print("\n📚 Access API documentation at: http://localhost:8000/docs")

if __name__ == "__main__":
    main()