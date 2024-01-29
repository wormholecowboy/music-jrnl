/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  swcMinify: true,
  images: {
  },
};

module.exports = nextConfig;
