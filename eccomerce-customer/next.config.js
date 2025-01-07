/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['alanluo-next-ecommerce.s3.amazonaws.com'],
  },
  output: 'standalone',
  reactStrictMode: true,
}

module.exports = nextConfig