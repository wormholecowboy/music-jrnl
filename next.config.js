/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
