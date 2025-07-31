/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ['www.snsbd.com', 'localhost', 'sns-38a5.onrender.com', 'picsum.photos'],
    unoptimized: true
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://sns-38a5.onrender.com'
  }
}

module.exports = nextConfig