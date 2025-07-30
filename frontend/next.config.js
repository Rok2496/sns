/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ['www.snsbd.com', 'localhost', 'sns-38a5.onrender.com'],
    unoptimized: true
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://sns-38a5.onrender.com'
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    }
    return config
  }
}

module.exports = nextConfig