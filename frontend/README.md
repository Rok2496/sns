# SNS Frontend

A modern, responsive Next.js frontend application for Star Network Solutions (SNS) that perfectly replicates the original website design with dynamic content from the backend API.

## Features

- **Exact Design Replication**: Pixel-perfect recreation of the original SNS website
- **Dynamic Content**: All content is fetched from the FastAPI backend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Performance Optimized**: Image optimization, lazy loading, and caching
- **SEO Friendly**: Proper meta tags and structured data

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image component

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── about-us/          # About us page
│   ├── contact-us/        # Contact page
│   ├── customers/         # Customers page
│   ├── products/          # Products page
│   ├── services/          # Services page
│   ├── solutions/         # Solutions page
│   ├── privacy-policy/    # Privacy policy page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   ├── HeroSection.tsx    # Hero section
│   ├── ProductsServicesSection.tsx
│   ├── AllianceSection.tsx
│   ├── ServicesSection.tsx
│   └── TestimonialSection.tsx
├── lib/                   # Utilities and API
│   └── api.ts            # API client and types
├── public/               # Static assets
│   └── images/           # Downloaded website images
│       ├── logos/        # Company logos
│       ├── alliance/     # Partner logos
│       ├── customers/    # Customer logos
│       └── web/         # Website images
└── package.json          # Dependencies
```

## Pages Overview

### Home Page (`/`)
- Hero section with company stats
- Products, Solutions & Services overview
- Alliance partners carousel
- Services grid
- Testimonial section

### About Us (`/about-us`)
- Company information and history
- Team strengths
- Mission and vision
- What we do
- IT consultancy details
- Why choose us

### Products (`/products`)
- Dynamic product categories
- Product filtering by category
- Alliance product showcase
- Software development services

### Solutions (`/solutions`)
- IT Security solutions
- Networking solutions
- Backup & Storage
- Server & Virtualization
- RPA solutions

### Services (`/services`)
- IT Consultancy process
- IT Management services
- Migration services
- Installation & Configuration
- IT Audit services

### Customers (`/customers`)
- Customer logos grid
- Company statistics
- Customer testimonials
- Call to action

### Contact Us (`/contact-us`)
- Contact form
- Company contact information
- FAQ section
- Interactive elements

### Privacy Policy (`/privacy-policy`)
- Complete privacy policy
- Data collection information
- User rights
- Contact information

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000` and fetches:

- Company information
- Product categories and products
- Services with features
- Solutions with descriptions
- Customer data

## Design Features

### Visual Elements
- **Color Scheme**: Blue gradient hero sections, clean white backgrounds
- **Typography**: Inter font family for modern readability
- **Layout**: Grid-based responsive design
- **Images**: Optimized images with lazy loading
- **Icons**: Heroicons for consistent iconography

### Interactive Elements
- **Hover Effects**: Card hover animations
- **Smooth Scrolling**: CSS scroll-behavior
- **Loading States**: Spinner animations
- **Form Validation**: Client-side validation
- **Mobile Menu**: Responsive navigation

### Performance Features
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: API response caching
- **Lazy Loading**: Component and image lazy loading

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

4. **Open browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

- `API_BASE_URL`: Backend API URL (server-side)
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL (client-side)

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- **Image Optimization**: WebP format, responsive images
- **Code Splitting**: Route-based and component-based
- **Lazy Loading**: Images and components
- **Caching**: API responses and static assets
- **Minification**: CSS and JavaScript
- **Compression**: Gzip compression

## Deployment

The application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Star Network Solutions.

## Support

For technical support, contact: info@snsbd.com