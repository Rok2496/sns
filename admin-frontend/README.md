# SNS Admin Frontend

A comprehensive admin panel for managing Star Network Solutions (SNS) website content. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Complete CRUD Operations**: Manage all website content
- **Secure Authentication**: JWT-based admin authentication
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live data synchronization with backend
- **Modern UI**: Clean, professional admin interface
- **Form Validation**: Client-side validation with error handling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Authentication**: JWT with cookies
- **Icons**: Heroicons

## Admin Features

### Dashboard
- **Overview Statistics**: Total counts for all content types
- **Quick Actions**: Direct links to manage content
- **System Information**: Real-time data summary

### Content Management
- **Categories**: Create, edit, delete, and toggle status
- **Products**: Full product management with category assignment
- **Services**: Service management with features (JSON format)
- **Solutions**: IT solutions with detailed feature lists
- **Customers**: Customer portfolio with logo management
- **Company Info**: Update company details and statistics

### Authentication
- **Secure Login**: JWT-based authentication
- **Session Management**: Automatic token handling
- **Protected Routes**: All admin pages require authentication
- **Auto Logout**: Automatic logout on token expiration

## Project Structure

```
admin-frontend/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── categories/        # Category management
│   ├── products/          # Product management
│   ├── services/          # Service management
│   ├── solutions/         # Solution management
│   ├── customers/         # Customer management
│   ├── company-info/      # Company information
│   ├── login/            # Login page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx         # Home redirect
├── components/           # Reusable components
│   ├── Layout.tsx        # Admin layout with sidebar
│   └── ProtectedRoute.tsx # Route protection
├── lib/                  # Utilities and API
│   ├── api.ts           # API client and endpoints
│   └── auth.ts          # Authentication utilities
└── package.json         # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running on port 8000

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # .env.local
   API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open admin panel:**
   Navigate to `http://localhost:3001`

### Default Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

## Admin Panel Pages

### 🏠 Dashboard (`/dashboard`)
- System overview and statistics
- Quick action buttons
- Real-time data summary

### 🏷️ Categories (`/categories`)
- **View**: List all categories with status
- **Create**: Add new categories
- **Edit**: Update category details
- **Delete**: Remove categories
- **Toggle**: Activate/deactivate categories

### 📦 Products (`/products`)
- **View**: Product list with category info
- **Create**: Add products with category assignment
- **Edit**: Update product details and images
- **Delete**: Remove products
- **Status**: Toggle active/inactive status

### 🔧 Services (`/services`)
- **View**: Service list with feature counts
- **Create**: Add services with JSON features
- **Edit**: Update service details
- **Delete**: Remove services
- **Features**: Manage service features as JSON arrays

### 💡 Solutions (`/solutions`)
- **View**: Solution list with descriptions
- **Create**: Add IT solutions
- **Edit**: Update solution details
- **Delete**: Remove solutions
- **Features**: Detailed feature management

### 👥 Customers (`/customers`)
- **View**: Customer grid with logos
- **Create**: Add customer entries
- **Edit**: Update customer information
- **Delete**: Remove customers
- **Logos**: Manage customer logo URLs

### 🏢 Company Info (`/company-info`)
- **Basic Info**: Company name, contact details
- **Address**: Full address management
- **Description**: About us, mission, vision
- **Statistics**: Client counts, service metrics

## API Integration

The admin panel connects to the FastAPI backend with full CRUD operations:

### Authentication Endpoints
- `POST /auth/login-json` - Admin login

### Admin Endpoints (Protected)
- **Categories**: `/admin/categories/*`
- **Products**: `/admin/products/*`
- **Services**: `/admin/services/*`
- **Solutions**: `/admin/solutions/*`
- **Customers**: `/admin/customers/*`
- **Company Info**: `/admin/company-info`

## Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Cookie Storage**: Secure token storage in HTTP-only cookies
- **Auto Refresh**: Automatic token validation
- **Route Protection**: All admin routes require authentication

### Authorization
- **Admin Only**: Only authenticated admins can access
- **Token Validation**: Server-side token verification
- **Session Management**: Automatic logout on token expiry

## UI/UX Features

### Design System
- **Consistent Colors**: Blue primary, gray secondary
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle shadow system

### Interactive Elements
- **Hover Effects**: Button and card hover states
- **Loading States**: Spinners for async operations
- **Form Validation**: Real-time validation feedback
- **Toast Notifications**: Success/error messages

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop**: Full-featured desktop experience
- **Sidebar**: Collapsible navigation on mobile

## Form Management

### React Hook Form
- **Validation**: Client-side form validation
- **Error Handling**: Field-level error messages
- **Type Safety**: TypeScript form types
- **Performance**: Optimized re-renders

### Data Formats
- **JSON Features**: Services and solutions use JSON arrays
- **URL Validation**: Image and website URL validation
- **Number Fields**: Proper number input handling
- **Text Areas**: Multi-line text support

## Development

### Code Organization
- **TypeScript**: Full type safety
- **Component Structure**: Reusable components
- **API Layer**: Centralized API management
- **Error Handling**: Comprehensive error handling

### Build Process
- **Next.js**: Optimized production builds
- **Tailwind**: CSS purging and optimization
- **TypeScript**: Type checking and compilation

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
- Set `API_BASE_URL` to production backend URL
- Configure proper CORS settings
- Use HTTPS in production

## Troubleshooting

### Common Issues
1. **Login Failed**: Check backend API is running
2. **CORS Errors**: Verify backend CORS configuration
3. **Token Expired**: Login again to refresh token
4. **Form Errors**: Check required field validation

### Debug Mode
- Check browser console for errors
- Verify network requests in DevTools
- Check backend logs for API errors

## Support

For technical support and questions:
- **Email**: info@snsbd.com
- **Backend API**: Ensure it's running on port 8000
- **Frontend**: Runs on port 3001

## License

This project is proprietary to Star Network Solutions.