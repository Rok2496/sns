/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ['www.snsbd.com', 'localhost', 'sns-backend.onrender.com', 'picsum.photos'],
    unoptimized: true
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://sns-backend.onrender.com'
  }
}

module.exports = nextConfig